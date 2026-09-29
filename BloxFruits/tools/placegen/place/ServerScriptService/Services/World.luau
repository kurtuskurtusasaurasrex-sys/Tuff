-- World setup: the sea, NPCs placed at anchor parts, enemy zones and teams.
--
-- Everything here is driven by parts you can move in Studio:
--   Workspace.Islands.<Island>.NPCs.<Anchor>  attributes Role = "QuestGiver" (GiverId) or "Shop" (ShopId)
--   Workspace.Islands.<Island>.EnemyZones.<Zone>  attributes EnemyType, Count
--   Workspace.SeaPreview  shows where the water goes; replaced by Terrain water at runtime.
-- Set the Workspace attribute GenerateSea to false once you paint your own Terrain water.

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Teams = game:GetService("Teams")

local QuestData = require(ReplicatedStorage.Shared.Data.Quests)
local Shops = require(ReplicatedStorage.Shared.Data.Shops)
local Enemy = require(script.Parent.Enemy)
local PlayerData = require(script.Parent.PlayerData)
local Progression = require(script.Parent.Progression)
local Quest = require(script.Parent.Quest)
local Shop = require(script.Parent.Shop)

local Net = ReplicatedStorage.Shared.Net

local World = {}

local TEAM_NAMES = { Pirates = true, Marines = true }

local function generateSea()
	local preview = workspace:FindFirstChild("SeaPreview")
	local size = if preview and preview:IsA("BasePart") then preview.Size else Vector3.new(1600, 24, 1600)
	local center = if preview and preview:IsA("BasePart") then preview.Position else Vector3.new(0, -12, 0)
	if preview then
		preview:Destroy()
	end
	if workspace:GetAttribute("GenerateSea") == false then
		return
	end
	local terrain = workspace.Terrain
	terrain:FillBlock(CFrame.new(center), size, Enum.Material.Water)
	terrain:FillBlock(
		CFrame.new(center - Vector3.new(0, size.Y / 2 + 4, 0)),
		Vector3.new(size.X, 8, size.Z),
		Enum.Material.Sand
	)
end

type Look = { Skin: Color3, Shirt: Color3, Pants: Color3, Title: string, TitleColor: Color3 }

local LOOKS: { [string]: Look } = {
	QuestGiver = {
		Skin = Color3.fromRGB(241, 194, 150),
		Shirt = Color3.fromRGB(60, 110, 190),
		Pants = Color3.fromRGB(45, 45, 60),
		Title = "QUEST",
		TitleColor = Color3.fromRGB(255, 215, 60),
	},
	Shop = {
		Skin = Color3.fromRGB(205, 150, 110),
		Shirt = Color3.fromRGB(40, 40, 40),
		Pants = Color3.fromRGB(90, 70, 50),
		Title = "SHOP",
		TitleColor = Color3.fromRGB(120, 220, 255),
	},
}

local function buildNpc(anchor: BasePart, role: string, displayName: string, onTalk: (Player) -> ()): Model?
	local look = LOOKS[role]
	local description = Instance.new("HumanoidDescription")
	description.HeadColor = look.Skin
	description.LeftArmColor = look.Skin
	description.RightArmColor = look.Skin
	description.TorsoColor = look.Shirt
	description.LeftLegColor = look.Pants
	description.RightLegColor = look.Pants

	local ok, model = pcall(function()
		return Players:CreateHumanoidModelFromDescription(description, Enum.HumanoidRigType.R15)
	end)
	if not ok or not model then
		warn("[World] Could not build NPC", displayName, model)
		return nil
	end
	model.Name = displayName
	local humanoid = model:FindFirstChildOfClass("Humanoid") :: Humanoid
	humanoid.DisplayDistanceType = Enum.HumanoidDisplayDistanceType.None
	local root = model:FindFirstChild("HumanoidRootPart") :: BasePart
	root.Anchored = true
	local groundY = anchor.Position.Y + anchor.Size.Y / 2
	model:PivotTo(CFrame.new(anchor.Position.X, groundY + humanoid.HipHeight + root.Size.Y / 2, anchor.Position.Z) * anchor.CFrame.Rotation)

	local gui = Instance.new("BillboardGui")
	gui.Name = "Nameplate"
	gui.Size = UDim2.fromScale(6, 1.6)
	gui.StudsOffset = Vector3.new(0, 3.2, 0)
	gui.MaxDistance = 150
	gui.Adornee = model:FindFirstChild("Head") :: BasePart
	local title = Instance.new("TextLabel")
	title.BackgroundTransparency = 1
	title.Size = UDim2.fromScale(1, 0.45)
	title.Font = Enum.Font.GothamBlack
	title.TextScaled = true
	title.TextColor3 = look.TitleColor
	title.TextStrokeTransparency = 0.2
	title.Text = look.Title
	title.Parent = gui
	local name = Instance.new("TextLabel")
	name.BackgroundTransparency = 1
	name.Position = UDim2.fromScale(0, 0.45)
	name.Size = UDim2.fromScale(1, 0.55)
	name.Font = Enum.Font.GothamBold
	name.TextScaled = true
	name.TextColor3 = Color3.new(1, 1, 1)
	name.TextStrokeTransparency = 0.2
	name.Text = displayName
	name.Parent = gui
	gui.Parent = model

	local prompt = Instance.new("ProximityPrompt")
	prompt.ActionText = "Talk"
	prompt.ObjectText = displayName
	prompt.HoldDuration = 0
	prompt.MaxActivationDistance = 12
	prompt.RequiresLineOfSight = false
	prompt.Triggered:Connect(onTalk)
	prompt.Parent = root

	model.Parent = anchor.Parent
	anchor.Transparency = 1
	anchor.CanCollide = false
	anchor.CanQuery = false
	return model
end

local function setupAnchor(anchor: BasePart)
	local role = anchor:GetAttribute("Role")
	if role == "QuestGiver" then
		local giverId = anchor:GetAttribute("GiverId")
		local giver = QuestData.Givers[giverId]
		if not giver then
			warn("[World] Unknown GiverId on", anchor:GetFullName())
			return
		end
		local model = buildNpc(anchor, role, giver.DisplayName, function(player)
			Net.OpenDialog:FireClient(player, "Quest", giverId)
		end)
		if model then
			Quest.RegisterGiver(giverId, model)
		end
	elseif role == "Shop" then
		local shopId = anchor:GetAttribute("ShopId")
		local shop = Shops[shopId]
		if not shop then
			warn("[World] Unknown ShopId on", anchor:GetFullName())
			return
		end
		local model = buildNpc(anchor, role, shop.DisplayName, function(player)
			Net.OpenDialog:FireClient(player, "Shop", shopId)
		end)
		if model then
			Shop.RegisterDealer(shopId, model)
		end
	end
end

local function applyTeam(player: Player)
	local data = PlayerData.Get(player)
	if data and TEAM_NAMES[data.Team] then
		player.Team = Teams:FindFirstChild(data.Team) :: Team?
	end
end

function World.Init()
	generateSea()

	local islands = workspace:FindFirstChild("Islands")
	if islands then
		for _, island in islands:GetChildren() do
			local npcs = island:FindFirstChild("NPCs")
			if npcs then
				for _, anchor in npcs:GetChildren() do
					if anchor:IsA("BasePart") then
						task.spawn(setupAnchor, anchor)
					end
				end
			end
			local zones = island:FindFirstChild("EnemyZones")
			if zones then
				for _, zone in zones:GetChildren() do
					if zone:IsA("BasePart") then
						zone.Transparency = 1
						Enemy.StartZone(zone)
					end
				end
			end
		end
	end

	PlayerData.Loaded:Connect(applyTeam)

	Net.ChooseTeam.OnServerEvent:Connect(function(player, team)
		local data = PlayerData.Get(player)
		if not data or data.Team ~= "" or type(team) ~= "string" or not TEAM_NAMES[team] then
			return
		end
		data.Team = team
		applyTeam(player)
		Progression.Sync(player)
		Progression.Notify(player, "You joined the " .. team .. "!", "Success")
	end)
end

return World
