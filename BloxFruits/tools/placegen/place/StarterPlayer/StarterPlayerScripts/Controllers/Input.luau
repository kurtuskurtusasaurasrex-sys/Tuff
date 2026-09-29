-- Input for combat: M1 (click / tap / R2), Z-X-C-V-F moves, and dash (Q).
--
-- Keyboard and gamepad go through ContextActionService. On touch screens the same actions get
-- on-screen buttons next to the jump button. The moves bar shows each move of the equipped
-- weapon with its key and a cooldown overlay on every device.

local ContextActionService = game:GetService("ContextActionService")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")
local Workspace = game:GetService("Workspace")

local Formulas = require(ReplicatedStorage.Shared.Formulas)
local Weapons = require(ReplicatedStorage.Shared.Data.Weapons)
local UI = require(script.Parent.UI)

local Net = ReplicatedStorage.Shared:WaitForChild("Net")

local player = Players.LocalPlayer
local Theme = UI.Theme

local Input = {}

local MOVE_KEYS = { "Z", "X", "C", "V", "F" }
local GAMEPAD = {
	Z = Enum.KeyCode.ButtonX,
	X = Enum.KeyCode.ButtonY,
	C = Enum.KeyCode.ButtonB,
	V = Enum.KeyCode.DPadLeft,
	F = Enum.KeyCode.DPadRight,
}

local equipped: Tool? = nil
local cooldownUntil: { [string]: number } = {}
local m1Ready = 0
local m1Combo = 0
local m1Last = 0
local holdingM1 = false
local dashReady = 0

local gui: ScreenGui
local movesBar: Frame
local moveSlots: { [string]: { frame: Frame, overlay: Frame, cooldown: number } } = {}

local function character(): (Model?, BasePart?, Humanoid?)
	local char = player.Character
	local root = char and char:FindFirstChild("HumanoidRootPart") :: BasePart?
	local humanoid = char and char:FindFirstChildOfClass("Humanoid")
	if not char or not root or not humanoid or humanoid.Health <= 0 then
		return nil, nil, nil
	end
	return char, root, humanoid
end

-- Where the player is aiming: the mouse on PC, otherwise the way the character faces.
local function aim(root: BasePart): Vector3
	if not UI.IsTouch then
		local mouse = player:GetMouse()
		local hit = mouse.Hit.Position
		local flat = Vector3.new(hit.X - root.Position.X, 0, hit.Z - root.Position.Z)
		if flat.Magnitude > 2 then
			return flat.Unit
		end
	end
	return root.CFrame.LookVector
end

-- Turns the character to face the aim direction so attacks go where the player expects.
local function face(root: BasePart, direction: Vector3)
	root.CFrame = CFrame.lookAt(root.Position, root.Position + direction)
end

local function weaponKey(): string?
	return if equipped then equipped:GetAttribute("Weapon") :: string? else nil
end

local function attackM1()
	local key = weaponKey()
	local weapon = key and Weapons[key]
	local _, root = character()
	if not weapon or not root then
		return
	end
	local now = os.clock()
	if now < m1Ready then
		return
	end
	local m1 = weapon.M1
	if now - m1Last > 1 then
		m1Combo = 0
	end
	m1Combo += 1
	m1Last = now
	if m1Combo >= m1.ComboLength then
		m1Combo = 0
		m1Ready = now + m1.ComboEndCooldown
	else
		m1Ready = now + m1.Cooldown
	end
	local direction = aim(root)
	face(root, direction)
	Net.Combat:FireServer(key, "M1", root.Position, direction)
end

local function holdM1()
	if holdingM1 then
		return
	end
	holdingM1 = true
	task.spawn(function()
		while holdingM1 and equipped do
			attackM1()
			task.wait(0.05)
		end
		holdingM1 = false
	end)
end

-- Tweens the character forward, stopping short of walls.
local function dashForward(root: BasePart, direction: Vector3, distance: number)
	local params = RaycastParams.new()
	params.FilterType = Enum.RaycastFilterType.Exclude
	params.FilterDescendantsInstances = { player.Character :: Model }
	local hit = Workspace:Raycast(root.Position, direction * distance, params)
	local travel = if hit then math.max(0, hit.Distance - 2) else distance
	local target = CFrame.lookAt(root.Position + direction * travel, root.Position + direction * (travel + 1))
	TweenService:Create(root, TweenInfo.new(0.16, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), { CFrame = target }):Play()
end

local function useMove(moveKey: string)
	local key = weaponKey()
	local weapon = key and Weapons[key]
	local move = weapon and weapon.Moves and weapon.Moves[moveKey]
	local _, root = character()
	if not move or not root then
		return
	end
	local id = key .. ":" .. moveKey
	if os.clock() < (cooldownUntil[id] or 0) then
		return
	end
	if (player:GetAttribute("Energy") or 0) < move.Energy then
		return
	end
	local direction = aim(root)
	face(root, direction)
	local origin = root.Position
	Net.Combat:FireServer(key, moveKey, origin, direction)
	-- Mark the move busy right away; the server's MoveUsed reply sets the real cooldown.
	cooldownUntil[id] = os.clock() + 0.5
	if move.Shape == "Dash" then
		dashForward(root, direction, move.Dash)
	end
end

local function dash()
	local _, root, humanoid = character()
	if not root or not humanoid then
		return
	end
	local now = os.clock()
	if now < dashReady or (player:GetAttribute("Energy") or 0) < Formulas.DASH_COST then
		return
	end
	dashReady = now + Formulas.DASH_COOLDOWN
	local direction = humanoid.MoveDirection
	if direction.Magnitude < 0.1 then
		direction = root.CFrame.LookVector
	end
	direction = Vector3.new(direction.X, 0, direction.Z).Unit
	Net.Dash:FireServer()
	dashForward(root, direction, Formulas.DASH_DISTANCE)
end

---------------------------------------------------------------------------------------------
-- Moves bar and touch buttons

local function clearMovesBar()
	for _, slot in moveSlots do
		slot.frame:Destroy()
	end
	table.clear(moveSlots)
end

local function buildMovesBar()
	clearMovesBar()
	local key = weaponKey()
	local weapon = key and Weapons[key]
	if not weapon or not weapon.Moves then
		return
	end
	for order, moveKey in MOVE_KEYS do
		local move = weapon.Moves[moveKey]
		if move then
			local slot = UI.button({
				Name = moveKey,
				LayoutOrder = order,
				Size = UDim2.fromScale(1, 1),
				BackgroundColor3 = Theme.PanelLight,
				Text = "",
				Parent = movesBar,
			})
			UI.aspect(1).Parent = slot
			UI.label({
				Position = UDim2.fromScale(0.08, 0.04),
				Size = UDim2.fromScale(0.4, 0.4),
				Text = moveKey,
				TextXAlignment = Enum.TextXAlignment.Left,
				TextColor3 = Theme.Accent,
				Parent = slot,
			}, 22)
			UI.label({
				Position = UDim2.fromScale(0.05, 0.5),
				Size = UDim2.fromScale(0.9, 0.42),
				Text = move.Name,
				TextWrapped = true,
				Font = Enum.Font.Gotham,
				Parent = slot,
			}, 14)
			local overlay = UI.new("Frame", {
				Name = "Cooldown",
				AnchorPoint = Vector2.new(0, 1),
				Position = UDim2.fromScale(0, 1),
				Size = UDim2.fromScale(1, 0),
				BackgroundColor3 = Color3.new(0, 0, 0),
				BackgroundTransparency = 0.45,
				ZIndex = 4,
				Parent = slot,
			}, { UI.corner(0.25) })
			slot.Activated:Connect(function()
				useMove(moveKey)
			end)
			moveSlots[key .. ":" .. moveKey] = { frame = slot, overlay = overlay, cooldown = move.Cooldown }
		end
	end
end

local function buildTouchButtons()
	-- The jump button sits bottom-right; its size depends on the screen (Roblox's own rule).
	local camera = Workspace.CurrentCamera
	local small = math.min(camera.ViewportSize.X, camera.ViewportSize.Y) <= 500
	local jumpSize = if small then 70 else 120
	local buttonSize = if small then 56 else 84

	local row = UI.new("Frame", {
		Name = "TouchActions",
		BackgroundTransparency = 1,
		AnchorPoint = Vector2.new(1, 1),
		Position = UDim2.new(1, -(jumpSize + (if small then 40 else 60)), 1, -(if small then 20 else 50)),
		Size = UDim2.fromOffset(buttonSize * 2 + 10, buttonSize),
		Parent = gui,
	}, {
		UI.new("UIListLayout", {
			FillDirection = Enum.FillDirection.Horizontal,
			HorizontalAlignment = Enum.HorizontalAlignment.Right,
			VerticalAlignment = Enum.VerticalAlignment.Bottom,
			Padding = UDim.new(0, 10),
			SortOrder = Enum.SortOrder.LayoutOrder,
		}),
	})
	local dashButton = UI.button({
		LayoutOrder = 1,
		Size = UDim2.fromOffset(buttonSize, buttonSize),
		BackgroundColor3 = Theme.PanelLight,
		BackgroundTransparency = 0.2,
		Text = "Dash",
		Parent = row,
	}, 20)
	dashButton.Activated:Connect(dash)
	local attackButton = UI.button({
		LayoutOrder = 2,
		Size = UDim2.fromOffset(buttonSize, buttonSize),
		BackgroundColor3 = Theme.Bad,
		BackgroundTransparency = 0.1,
		Text = "Attack",
		Parent = row,
	}, 20)
	attackButton.InputBegan:Connect(function(input)
		if input.UserInputType == Enum.UserInputType.Touch or input.UserInputType == Enum.UserInputType.MouseButton1 then
			holdM1()
		end
	end)
	attackButton.InputEnded:Connect(function(input)
		if input.UserInputType == Enum.UserInputType.Touch or input.UserInputType == Enum.UserInputType.MouseButton1 then
			holdingM1 = false
		end
	end)
	for _, button in { dashButton, attackButton } do
		(button:FindFirstChildOfClass("UICorner") :: UICorner).CornerRadius = UDim.new(0.5, 0)
	end

	-- On touch the moves bar stacks above the Attack/Dash row.
	movesBar.AnchorPoint = Vector2.new(1, 1)
	movesBar.Position = UDim2.new(1, -(jumpSize + (if small then 40 else 60)), 1, -(buttonSize + (if small then 30 else 64)))
	movesBar.Size = UDim2.fromOffset(buttonSize * 3 + 20, buttonSize)
end

---------------------------------------------------------------------------------------------

local function bindActions()
	for _, moveKey in MOVE_KEYS do
		ContextActionService:BindAction("Move" .. moveKey, function(_, state)
			if state == Enum.UserInputState.Begin then
				useMove(moveKey)
			end
			return Enum.ContextActionResult.Sink
		end, false, Enum.KeyCode[moveKey], GAMEPAD[moveKey])
	end
end

local function unbindActions()
	for _, moveKey in MOVE_KEYS do
		ContextActionService:UnbindAction("Move" .. moveKey)
	end
end

local function onEquipped(tool: Tool)
	equipped = tool
	buildMovesBar()
	bindActions()
end

local function onUnequipped(tool: Tool)
	if equipped == tool then
		equipped = nil
		holdingM1 = false
		clearMovesBar()
		unbindActions()
	end
end

local function watchTool(tool: Instance)
	if not tool:IsA("Tool") or tool:GetAttribute("Watched") then
		return
	end
	tool:SetAttribute("Watched", true)
	tool.Equipped:Connect(function()
		onEquipped(tool)
	end)
	tool.Unequipped:Connect(function()
		onUnequipped(tool)
	end)
	tool.Activated:Connect(holdM1)
	tool.Deactivated:Connect(function()
		holdingM1 = false
	end)
	if tool.Parent == player.Character then
		onEquipped(tool)
	end
end

local function watchCharacter(char: Model)
	equipped = nil
	holdingM1 = false
	clearMovesBar()
	char.ChildAdded:Connect(watchTool)
	for _, child in char:GetChildren() do
		watchTool(child)
	end
	local backpack = player:WaitForChild("Backpack")
	backpack.ChildAdded:Connect(watchTool)
	for _, child in backpack:GetChildren() do
		watchTool(child)
	end
end

function Input.Init()
	gui = UI.new("ScreenGui", {
		Name = "Combat",
		ResetOnSpawn = false,
		ScreenInsets = Enum.ScreenInsets.DeviceSafeInsets,
		Parent = player:WaitForChild("PlayerGui"),
	})
	movesBar = UI.new("Frame", {
		Name = "MovesBar",
		BackgroundTransparency = 1,
		AnchorPoint = Vector2.new(0.5, 1),
		Position = UDim2.new(0.5, 0, 1, -70), -- above the default hotbar
		Size = UDim2.fromOffset(300, 64),
		Parent = gui,
	}, {
		UI.new("UIListLayout", {
			FillDirection = Enum.FillDirection.Horizontal,
			HorizontalAlignment = Enum.HorizontalAlignment.Center,
			VerticalAlignment = Enum.VerticalAlignment.Bottom,
			Padding = UDim.new(0, 8),
			SortOrder = Enum.SortOrder.LayoutOrder,
		}),
	})
	if UI.IsTouch then
		buildTouchButtons()
	end

	-- Dash is always available, not only with a weapon out.
	ContextActionService:BindAction("Dash", function(_, state)
		if state == Enum.UserInputState.Begin then
			dash()
		end
		return Enum.ContextActionResult.Sink
	end, false, Enum.KeyCode.Q, Enum.KeyCode.ButtonL1)

	player.CharacterAdded:Connect(watchCharacter)
	if player.Character then
		watchCharacter(player.Character)
	end

	Net.MoveUsed.OnClientEvent:Connect(function(key, moveKey, cooldown)
		cooldownUntil[key .. ":" .. moveKey] = os.clock() + cooldown
	end)

	RunService.RenderStepped:Connect(function()
		local now = os.clock()
		for id, slot in moveSlots do
			local remaining = (cooldownUntil[id] or 0) - now
			local ratio = if remaining > 0 then math.clamp(remaining / slot.cooldown, 0, 1) else 0
			slot.overlay.Size = UDim2.fromScale(1, ratio)
		end
	end)
end

return Input
