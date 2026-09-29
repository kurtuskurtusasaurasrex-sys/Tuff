-- Menus: team select, the Stats menu, the quest dialog and the shop dialog.
-- One menu is open at a time. Menus sit on the left/centre so they never cover the move buttons.

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Formulas = require(ReplicatedStorage.Shared.Formulas)
local QuestData = require(ReplicatedStorage.Shared.Data.Quests)
local Shops = require(ReplicatedStorage.Shared.Data.Shops)
local Weapons = require(ReplicatedStorage.Shared.Data.Weapons)
local UI = require(script.Parent.UI)

local Net = ReplicatedStorage.Shared:WaitForChild("Net")

local player = Players.LocalPlayer
local Theme = UI.Theme

local Menus = {}

local gui: ScreenGui
local current: Frame? = nil
local refreshCurrent: (() -> ())? = nil
local npcOrigin: Vector3? = nil -- where the player stood when an NPC dialog opened

function Menus.Close()
	if current then
		current:Destroy()
	end
	current = nil
	refreshCurrent = nil
	npcOrigin = nil
end

local function rootPart(): BasePart?
	local character = player.Character
	return character and character:FindFirstChild("HumanoidRootPart") :: BasePart?
end

local function rememberNpcOrigin()
	local root = rootPart()
	npcOrigin = root and root.Position
end

-- A centred panel with a title and a close button. Returns the panel and its body frame.
local function panel(title: string, aspect: number, closable: boolean?): (Frame, Frame)
	Menus.Close()
	local frame = UI.new("Frame", {
		Name = "Menu",
		AnchorPoint = Vector2.new(0.5, 0.5),
		Position = UDim2.fromScale(0.42, 0.5),
		Size = UDim2.fromScale(0.5, 0.7),
		BackgroundColor3 = Theme.Panel,
		BackgroundTransparency = 0.05,
		Parent = gui,
	}, {
		UI.corner(0.04),
		UI.stroke(2),
		UI.aspect(aspect),
		UI.new("UISizeConstraint", { MaxSize = Vector2.new(560, 560) }),
	})
	UI.label({
		Position = UDim2.fromScale(0.05, 0.02),
		Size = UDim2.fromScale(0.75, 0.1),
		Text = title,
		TextXAlignment = Enum.TextXAlignment.Left,
		TextColor3 = Theme.Accent,
		Font = Enum.Font.GothamBlack,
		Parent = frame,
	}, 30)
	if closable ~= false then
		local close = UI.button({
			AnchorPoint = Vector2.new(1, 0),
			Position = UDim2.fromScale(0.97, 0.025),
			Size = UDim2.fromScale(0.1, 0.1),
			BackgroundColor3 = Theme.Bad,
			Text = "X",
			Parent = frame,
		}, 22)
		UI.aspect(1).Parent = close
		close.Activated:Connect(Menus.Close)
	end
	local body = UI.new("Frame", {
		Name = "Body",
		BackgroundTransparency = 1,
		Position = UDim2.fromScale(0.05, 0.15),
		Size = UDim2.fromScale(0.9, 0.8),
		Parent = frame,
	})
	current = frame
	return frame, body
end

local function list(body: Frame, padding: number?): UIListLayout
	return UI.new("UIListLayout", {
		Padding = UDim.new(padding or 0.02, 0),
		SortOrder = Enum.SortOrder.LayoutOrder,
		Parent = body,
	})
end

---------------------------------------------------------------------------------------------
-- Team select (first join only)

function Menus.OpenTeamSelect()
	local frame, body = panel("Choose your side", 1.4, false)
	frame.Position = UDim2.fromScale(0.5, 0.5)
	local options = {
		{ "Pirates", Color3.fromRGB(190, 50, 50), "Sail free and fight for yourself." },
		{ "Marines", Color3.fromRGB(50, 110, 200), "Keep the seas in order." },
	}
	for i, option in options do
		local button = UI.button({
			Position = UDim2.fromScale(if i == 1 then 0 else 0.52, 0.05),
			Size = UDim2.fromScale(0.48, 0.8),
			BackgroundColor3 = option[2],
			Text = "",
			Parent = body,
		})
		UI.label({
			Position = UDim2.fromScale(0.05, 0.12),
			Size = UDim2.fromScale(0.9, 0.3),
			Text = option[1],
			Font = Enum.Font.GothamBlack,
			Parent = button,
		}, 34)
		UI.label({
			Position = UDim2.fromScale(0.08, 0.5),
			Size = UDim2.fromScale(0.84, 0.35),
			Text = option[3],
			Font = Enum.Font.Gotham,
			TextWrapped = true,
			Parent = button,
		}, 18)
		button.Activated:Connect(function()
			Net.ChooseTeam:FireServer(option[1])
			Menus.Close()
		end)
	end
end

---------------------------------------------------------------------------------------------
-- Stats

function Menus.OpenStats()
	local _, body = panel("Stats", 1.05)
	list(body, 0.015)

	local pointsLabel = UI.label({
		LayoutOrder = 0,
		Size = UDim2.fromScale(1, 0.1),
		TextXAlignment = Enum.TextXAlignment.Left,
		Parent = body,
	}, 22)

	local valueLabels = {}
	for i, stat in Formulas.STAT_NAMES do
		local row = UI.new("Frame", {
			LayoutOrder = i,
			Size = UDim2.fromScale(1, 0.145),
			BackgroundColor3 = Theme.PanelLight,
			Parent = body,
		}, { UI.corner(0.2) })
		UI.label({
			Position = UDim2.fromScale(0.03, 0.05),
			Size = UDim2.fromScale(0.42, 0.5),
			Text = Formulas.STAT_LABELS[stat],
			TextXAlignment = Enum.TextXAlignment.Left,
			Parent = row,
		}, 22)
		UI.label({
			Position = UDim2.fromScale(0.03, 0.55),
			Size = UDim2.fromScale(0.42, 0.38),
			Text = Formulas.STAT_HINTS[stat],
			TextXAlignment = Enum.TextXAlignment.Left,
			TextColor3 = Theme.SubText,
			Font = Enum.Font.Gotham,
			Parent = row,
		}, 13)
		valueLabels[stat] = UI.label({
			Position = UDim2.fromScale(0.45, 0.15),
			Size = UDim2.fromScale(0.13, 0.7),
			TextColor3 = Theme.Accent,
			Parent = row,
		}, 24)
		for j, amount in { 1, 10, 100 } do
			local button = UI.button({
				Position = UDim2.fromScale(0.59 + (j - 1) * 0.135, 0.15),
				Size = UDim2.fromScale(0.125, 0.7),
				BackgroundColor3 = Theme.Good,
				Text = "+" .. amount,
				Parent = row,
			}, 18)
			button.Activated:Connect(function()
				Net.SpendStat:FireServer(stat, amount)
			end)
		end
	end

	local reset = UI.button({
		LayoutOrder = 10,
		Size = UDim2.fromScale(0.4, 0.09),
		BackgroundColor3 = Theme.ButtonDisabled,
		Text = "Reset stats (free)",
		Parent = body,
	}, 18)
	reset.Activated:Connect(function()
		Net.ResetStats:FireServer()
	end)

	refreshCurrent = function()
		pointsLabel.Text = string.format("Points left: %d", player:GetAttribute("Points") or 0)
		for stat, label in valueLabels do
			label.Text = tostring(player:GetAttribute("Stat_" .. stat) or 0)
		end
	end
	refreshCurrent()
end

---------------------------------------------------------------------------------------------
-- Quest dialog

function Menus.OpenQuest(giverId: string)
	local giver = QuestData.Givers[giverId]
	if not giver then
		return
	end
	local _, body = panel(giver.DisplayName, 1.25)
	rememberNpcOrigin()
	list(body)
	UI.label({
		Size = UDim2.fromScale(1, 0.12),
		Text = "Ahoy! Help us deal with the trouble on this island.",
		TextXAlignment = Enum.TextXAlignment.Left,
		Font = Enum.Font.Gotham,
		TextWrapped = true,
		Parent = body,
	}, 18)

	local rows = {}
	for i, questId in giver.Quests do
		local quest = QuestData.Quests[questId]
		local row = UI.new("Frame", {
			LayoutOrder = i,
			Size = UDim2.fromScale(1, 0.26),
			BackgroundColor3 = Theme.PanelLight,
			Parent = body,
		}, { UI.corner(0.15) })
		UI.label({
			Position = UDim2.fromScale(0.04, 0.08),
			Size = UDim2.fromScale(0.62, 0.34),
			Text = quest.Title,
			TextXAlignment = Enum.TextXAlignment.Left,
			Parent = row,
		}, 22)
		UI.label({
			Position = UDim2.fromScale(0.04, 0.46),
			Size = UDim2.fromScale(0.62, 0.22),
			Text = string.format("Level %d+", quest.MinLevel),
			TextXAlignment = Enum.TextXAlignment.Left,
			TextColor3 = Theme.SubText,
			Parent = row,
		}, 16)
		UI.label({
			Position = UDim2.fromScale(0.04, 0.7),
			Size = UDim2.fromScale(0.62, 0.22),
			Text = string.format("Reward: %s EXP, $%s", UI.formatNumber(quest.Exp), UI.formatNumber(quest.Beli)),
			TextXAlignment = Enum.TextXAlignment.Left,
			TextColor3 = Theme.Beli,
			Parent = row,
		}, 16)
		local accept = UI.button({
			AnchorPoint = Vector2.new(1, 0.5),
			Position = UDim2.fromScale(0.96, 0.5),
			Size = UDim2.fromScale(0.28, 0.5),
			Text = "Accept",
			Parent = row,
		}, 20)
		accept.Activated:Connect(function()
			Net.QuestAction:FireServer("Accept", giverId, questId)
			Menus.Close()
		end)
		rows[questId] = { quest = quest, button = accept }
	end

	refreshCurrent = function()
		local level = player:GetAttribute("Level") or 1
		local active = player:GetAttribute("QuestId")
		for questId, row in rows do
			local ok = level >= row.quest.MinLevel
			row.button.Active = ok
			row.button.AutoButtonColor = ok
			row.button.BackgroundColor3 = if ok then Theme.Button else Theme.ButtonDisabled
			row.button.Text = if active == questId then "Restart" elseif ok then "Accept" else "Locked"
		end
	end
	refreshCurrent()
end

---------------------------------------------------------------------------------------------
-- Shop dialog

function Menus.OpenShop(shopId: string)
	local shop = Shops[shopId]
	if not shop then
		return
	end
	local _, body = panel(shop.DisplayName, 1.25)
	rememberNpcOrigin()
	list(body)
	UI.label({
		Size = UDim2.fromScale(1, 0.12),
		Text = "Fine blades for new pirates. Pick one!",
		TextXAlignment = Enum.TextXAlignment.Left,
		Font = Enum.Font.Gotham,
		Parent = body,
	}, 18)

	local buttons = {}
	for i, itemId in shop.Items do
		local item = Weapons[itemId]
		local row = UI.new("Frame", {
			LayoutOrder = i,
			Size = UDim2.fromScale(1, 0.2),
			BackgroundColor3 = Theme.PanelLight,
			Parent = body,
		}, { UI.corner(0.15) })
		UI.label({
			Position = UDim2.fromScale(0.04, 0.1),
			Size = UDim2.fromScale(0.6, 0.45),
			Text = item.DisplayName,
			TextXAlignment = Enum.TextXAlignment.Left,
			Parent = row,
		}, 22)
		UI.label({
			Position = UDim2.fromScale(0.04, 0.58),
			Size = UDim2.fromScale(0.6, 0.32),
			Text = item.Category .. "  ·  $" .. UI.formatNumber(item.Price),
			TextXAlignment = Enum.TextXAlignment.Left,
			TextColor3 = Theme.Beli,
			Parent = row,
		}, 16)
		local buy = UI.button({
			AnchorPoint = Vector2.new(1, 0.5),
			Position = UDim2.fromScale(0.96, 0.5),
			Size = UDim2.fromScale(0.28, 0.6),
			Text = "Buy",
			Parent = row,
		}, 20)
		buy.Activated:Connect(function()
			Net.ShopAction:FireServer("Buy", shopId, itemId)
		end)
		buttons[itemId] = buy
	end

	refreshCurrent = function()
		local backpack = player:FindFirstChildOfClass("Backpack")
		for itemId, button in buttons do
			local owned = (backpack and backpack:FindFirstChild(itemId))
				or (player.Character and player.Character:FindFirstChild(itemId))
			button.Text = if owned then "Owned" else "Buy"
			button.BackgroundColor3 = if owned then Theme.ButtonDisabled else Theme.Button
		end
	end
	refreshCurrent()
	task.delay(0.5, function()
		if refreshCurrent then
			refreshCurrent()
		end
	end)
end

function Menus.Init()
	gui = UI.new("ScreenGui", {
		Name = "Menus",
		ResetOnSpawn = false,
		DisplayOrder = 5,
		ScreenInsets = Enum.ScreenInsets.DeviceSafeInsets,
		Parent = player:WaitForChild("PlayerGui"),
	})

	player.AttributeChanged:Connect(function()
		if refreshCurrent then
			refreshCurrent()
		end
	end)

	Net.OpenDialog.OnClientEvent:Connect(function(kind, id)
		if kind == "Quest" then
			Menus.OpenQuest(id)
		elseif kind == "Shop" then
			Menus.OpenShop(id)
		end
	end)

	-- Close an NPC dialog when the player walks away from the NPC.
	task.spawn(function()
		while true do
			task.wait(0.5)
			local root = rootPart()
			if npcOrigin and root and (root.Position - npcOrigin).Magnitude > 25 then
				Menus.Close()
			end
		end
	end)

	if (player:GetAttribute("Team") or "") == "" then
		Menus.OpenTeamSelect()
	end
end

return Menus
