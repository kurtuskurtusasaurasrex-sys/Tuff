-- The always-on HUD: Health, Energy, level and EXP, Beli, quest tracker, the Stats button,
-- notifications and the island name banner. It reads the attributes the server keeps on the
-- Player, so it never asks the server for data.

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local TweenService = game:GetService("TweenService")

local QuestData = require(ReplicatedStorage.Shared.Data.Quests)
local UI = require(script.Parent.UI)

local Net = ReplicatedStorage.Shared:WaitForChild("Net")

local player = Players.LocalPlayer
local Theme = UI.Theme

local HUD = {}

local gui: ScreenGui
local notifyList: Frame

local function attr(name: string, default: any): any
	local value = player:GetAttribute(name)
	if value == nil then
		return default
	end
	return value
end

local function setFill(fill: Frame, ratio: number)
	fill.Size = UDim2.fromScale(math.clamp(ratio, 0, 1), 1)
end

function HUD.Notify(text: string, kind: string?)
	local color = Theme.Panel
	if kind == "Error" then
		color = Theme.Bad
	elseif kind == "Success" then
		color = Theme.Good
	elseif kind == "LevelUp" then
		color = Color3.fromRGB(190, 140, 20)
	end
	local toast = UI.new("Frame", {
		BackgroundColor3 = color,
		BackgroundTransparency = 0.1,
		Size = UDim2.fromScale(1, 0.3),
		Parent = notifyList,
	}, { UI.corner(0.3), UI.stroke(1.5) })
	UI.label({
		Size = UDim2.fromScale(0.94, 0.8),
		Position = UDim2.fromScale(0.03, 0.1),
		Text = text,
		Parent = toast,
	}, 20)
	task.delay(3.5, function()
		local tween = TweenService:Create(toast, TweenInfo.new(0.4), { BackgroundTransparency = 1 })
		tween:Play()
		for _, child in toast:GetDescendants() do
			if child:IsA("TextLabel") then
				TweenService:Create(child, TweenInfo.new(0.4), { TextTransparency = 1, TextStrokeTransparency = 1 }):Play()
			elseif child:IsA("UIStroke") then
				TweenService:Create(child, TweenInfo.new(0.4), { Transparency = 1 }):Play()
			end
		end
		tween.Completed:Wait()
		toast:Destroy()
	end)
	-- Keep at most three toasts on screen.
	local toasts = {}
	for _, child in notifyList:GetChildren() do
		if child:IsA("Frame") then
			table.insert(toasts, child)
		end
	end
	if #toasts > 3 then
		toasts[1]:Destroy()
	end
end

local bannerLabel: TextLabel
local function showBanner(text: string)
	bannerLabel.Text = text
	bannerLabel.TextTransparency = 1
	bannerLabel.TextStrokeTransparency = 1
	TweenService:Create(bannerLabel, TweenInfo.new(0.6), { TextTransparency = 0, TextStrokeTransparency = 0.3 }):Play()
	task.delay(3, function()
		if bannerLabel.Text == text then
			TweenService:Create(bannerLabel, TweenInfo.new(0.8), { TextTransparency = 1, TextStrokeTransparency = 1 }):Play()
		end
	end)
end

-- Shows the island name when the player walks into an island's Region part.
local function watchIslands()
	local current = nil
	while true do
		task.wait(1)
		local character = player.Character
		local root = character and character:FindFirstChild("HumanoidRootPart") :: BasePart?
		local islands = workspace:FindFirstChild("Islands")
		if root and islands then
			local found = nil
			for _, island in islands:GetChildren() do
				local region = island:FindFirstChild("Region")
				if region and region:IsA("BasePart") then
					local p = region.CFrame:PointToObjectSpace(root.Position)
					local half = region.Size / 2
					if math.abs(p.X) <= half.X and math.abs(p.Y) <= half.Y and math.abs(p.Z) <= half.Z then
						found = island:GetAttribute("DisplayName") or island.Name
						break
					end
				end
			end
			if found and found ~= current then
				showBanner(found)
			end
			current = found
		end
	end
end

function HUD.Init(callbacks: { OpenStats: () -> () })
	gui = UI.new("ScreenGui", {
		Name = "HUD",
		ResetOnSpawn = false,
		ZIndexBehavior = Enum.ZIndexBehavior.Sibling,
		ScreenInsets = Enum.ScreenInsets.DeviceSafeInsets,
		Parent = player:WaitForChild("PlayerGui"),
	})

	-- Vitals, top left
	local vitals = UI.new("Frame", {
		Name = "Vitals",
		BackgroundTransparency = 1,
		Position = UDim2.fromScale(0.01, 0.02),
		Size = UDim2.fromScale(0.3, 0.2),
		Parent = gui,
	}, {
		UI.aspect(2.6),
		UI.new("UISizeConstraint", { MaxSize = Vector2.new(400, 154) }),
	})
	local levelLabel = UI.label({
		Size = UDim2.fromScale(0.3, 0.2),
		Text = "Lv. 1",
		TextXAlignment = Enum.TextXAlignment.Left,
		TextColor3 = Theme.Accent,
		Parent = vitals,
	}, 26)
	local teamLabel = UI.label({
		Position = UDim2.fromScale(0.32, 0.03),
		Size = UDim2.fromScale(0.68, 0.15),
		Text = "",
		TextXAlignment = Enum.TextXAlignment.Left,
		TextColor3 = Theme.SubText,
		Parent = vitals,
	}, 18)
	local _, healthFill, healthText = UI.bar({
		Position = UDim2.fromScale(0, 0.22),
		Size = UDim2.fromScale(1, 0.2),
		Parent = vitals,
	}, Theme.Health)
	local _, energyFill, energyText = UI.bar({
		Position = UDim2.fromScale(0, 0.45),
		Size = UDim2.fromScale(0.85, 0.15),
		Parent = vitals,
	}, Theme.Energy)
	local _, expFill, expText = UI.bar({
		Position = UDim2.fromScale(0, 0.63),
		Size = UDim2.fromScale(0.85, 0.12),
		Parent = vitals,
	}, Theme.Exp)
	local beliLabel = UI.label({
		Position = UDim2.fromScale(0, 0.78),
		Size = UDim2.fromScale(0.6, 0.2),
		Text = "$0",
		TextXAlignment = Enum.TextXAlignment.Left,
		TextColor3 = Theme.Beli,
		Parent = vitals,
	}, 24)

	-- Left side: Stats button and quest tracker
	local side = UI.new("Frame", {
		Name = "Side",
		BackgroundTransparency = 1,
		AnchorPoint = Vector2.new(0, 0.5),
		Position = UDim2.fromScale(0.01, 0.48),
		Size = UDim2.fromScale(0.26, 0.26),
		Parent = gui,
	}, {
		UI.aspect(1.8),
		UI.new("UISizeConstraint", { MaxSize = Vector2.new(330, 184) }),
	})
	local statsButton = UI.button({
		Name = "StatsButton",
		Size = UDim2.fromScale(0.36, 0.28),
		Text = "Stats",
		Parent = side,
	}, 22)
	local pointsBadge = UI.label({
		AnchorPoint = Vector2.new(0.5, 0.5),
		Position = UDim2.fromScale(1, 0),
		Size = UDim2.fromScale(0.45, 0.6),
		BackgroundTransparency = 0,
		BackgroundColor3 = Theme.Bad,
		Text = "0",
		Visible = false,
		ZIndex = 2,
		Parent = statsButton,
	}, 16)
	UI.corner(0.5).Parent = pointsBadge
	statsButton.Activated:Connect(callbacks.OpenStats)

	local questPanel = UI.new("Frame", {
		Name = "Quest",
		BackgroundColor3 = Theme.Panel,
		BackgroundTransparency = 0.25,
		Position = UDim2.fromScale(0, 0.36),
		Size = UDim2.fromScale(1, 0.62),
		Visible = false,
		Parent = side,
	}, { UI.corner(0.12), UI.stroke(1.5) })
	UI.label({
		Position = UDim2.fromScale(0.05, 0.05),
		Size = UDim2.fromScale(0.7, 0.28),
		Text = "QUEST",
		TextXAlignment = Enum.TextXAlignment.Left,
		TextColor3 = Theme.Accent,
		Parent = questPanel,
	}, 18)
	local questTitle = UI.label({
		Position = UDim2.fromScale(0.05, 0.35),
		Size = UDim2.fromScale(0.9, 0.3),
		TextXAlignment = Enum.TextXAlignment.Left,
		Parent = questPanel,
	}, 20)
	local questProgress = UI.label({
		Position = UDim2.fromScale(0.05, 0.67),
		Size = UDim2.fromScale(0.6, 0.26),
		TextXAlignment = Enum.TextXAlignment.Left,
		TextColor3 = Theme.SubText,
		Parent = questPanel,
	}, 18)
	local abandon = UI.button({
		AnchorPoint = Vector2.new(1, 0),
		Position = UDim2.fromScale(0.97, 0.06),
		Size = UDim2.fromScale(0.14, 0.3),
		BackgroundColor3 = Theme.Bad,
		Text = "X",
		Parent = questPanel,
	}, 18)
	abandon.Activated:Connect(function()
		Net.QuestAction:FireServer("Abandon")
	end)

	-- Notifications, top centre
	notifyList = UI.new("Frame", {
		Name = "Notifications",
		BackgroundTransparency = 1,
		AnchorPoint = Vector2.new(0.5, 0),
		Position = UDim2.fromScale(0.5, 0.1),
		Size = UDim2.fromScale(0.4, 0.2),
		Parent = gui,
	}, {
		UI.new("UIListLayout", {
			Padding = UDim.new(0.03, 0),
			HorizontalAlignment = Enum.HorizontalAlignment.Center,
			SortOrder = Enum.SortOrder.LayoutOrder,
		}),
		UI.new("UISizeConstraint", { MaxSize = Vector2.new(520, 180) }),
	})

	bannerLabel = UI.label({
		Name = "IslandBanner",
		AnchorPoint = Vector2.new(0.5, 0.5),
		Position = UDim2.fromScale(0.5, 0.3),
		Size = UDim2.fromScale(0.6, 0.08),
		Font = Enum.Font.GothamBlack,
		TextTransparency = 1,
		TextStrokeTransparency = 1,
		Parent = gui,
	}, 48)

	local sessionWarning = UI.label({
		AnchorPoint = Vector2.new(0.5, 1),
		Position = UDim2.fromScale(0.5, 0.995),
		Size = UDim2.fromScale(0.6, 0.03),
		Text = "Progress isn't saving in this session: publish the place and enable Studio API access.",
		TextColor3 = Color3.fromRGB(255, 170, 90),
		Visible = false,
		Parent = gui,
	}, 14)

	local function refresh()
		local level = attr("Level", 1)
		levelLabel.Text = "Lv. " .. level
		local team = attr("Team", "")
		teamLabel.Text = if team ~= "" then team else ""
		local exp, need = attr("Exp", 0), attr("ExpToNext", 1)
		setFill(expFill, exp / need)
		expText.Text = string.format("EXP %s / %s", UI.formatNumber(exp), UI.formatNumber(need))
		beliLabel.Text = "$" .. UI.formatNumber(attr("Beli", 0))
		local points = attr("Points", 0)
		pointsBadge.Visible = points > 0
		pointsBadge.Text = tostring(points)
		local energy, maxEnergy = attr("Energy", 0), attr("MaxEnergy", 1)
		setFill(energyFill, energy / maxEnergy)
		energyText.Text = string.format("%d / %d", energy, maxEnergy)
		sessionWarning.Visible = attr("SessionOnly", false) == true

		local questId = attr("QuestId", "")
		local quest = QuestData.Quests[questId]
		questPanel.Visible = quest ~= nil
		if quest then
			questTitle.Text = quest.Title
			questProgress.Text = string.format("%d / %d", attr("QuestProgress", 0), quest.Count)
		end
	end

	player.AttributeChanged:Connect(refresh)
	refresh()

	local healthConnections: { RBXScriptConnection } = {}
	local function watchCharacter(character: Model)
		for _, connection in healthConnections do
			connection:Disconnect()
		end
		table.clear(healthConnections)
		local humanoid = character:WaitForChild("Humanoid") :: Humanoid
		local function update()
			setFill(healthFill, humanoid.Health / math.max(humanoid.MaxHealth, 1))
			healthText.Text = string.format("%d / %d", math.ceil(humanoid.Health), humanoid.MaxHealth)
		end
		table.insert(healthConnections, humanoid.HealthChanged:Connect(update))
		table.insert(healthConnections, humanoid:GetPropertyChangedSignal("MaxHealth"):Connect(update))
		update()
	end
	player.CharacterAdded:Connect(watchCharacter)
	if player.Character then
		task.spawn(watchCharacter, player.Character)
	end

	Net.Notify.OnClientEvent:Connect(HUD.Notify)
	task.spawn(watchIslands)
end

return HUD
