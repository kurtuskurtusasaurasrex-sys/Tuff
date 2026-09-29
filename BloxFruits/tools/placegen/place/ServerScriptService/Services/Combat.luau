-- Server-authoritative combat. The client only says "I used M1/Z/X with this weapon, from here,
-- facing there"; the server checks ownership, the equipped tool, cooldowns, Energy and range,
-- then runs the hitbox and applies damage. The client never sends damage numbers.

local CollectionService = game:GetService("CollectionService")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Formulas = require(ReplicatedStorage.Shared.Formulas)
local Weapons = require(ReplicatedStorage.Shared.Data.Weapons)
local Enemy = require(script.Parent.Enemy)
local PlayerData = require(script.Parent.PlayerData)
local Progression = require(script.Parent.Progression)

local Net = ReplicatedStorage.Shared.Net

local Combat = {}

local MAX_ORIGIN_DRIFT = 14 -- how far the client's reported origin may be from the server's view
local COMBO_RESET = 1.0 -- seconds without an M1 before the combo starts over
local MOVE_KEYS = { Z = true, X = true, C = true, V = true, F = true }

type PlayerState = {
	combo: number,
	lastM1: number,
	m1Ready: number,
	cooldowns: { [string]: number },
	dashReady: number,
}

local states: { [Player]: PlayerState } = {}

local function stateOf(player: Player): PlayerState
	local state = states[player]
	if not state then
		state = { combo = 0, lastM1 = 0, m1Ready = 0, cooldowns = {}, dashReady = 0 }
		states[player] = state
	end
	return state
end

-- Returns the character parts needed to act, or nil if the player can't act right now.
local function actor(player: Player): (Model?, BasePart?)
	local character = player.Character
	local humanoid = character and character:FindFirstChildOfClass("Humanoid")
	local root = character and character:FindFirstChild("HumanoidRootPart") :: BasePart?
	if not character or not humanoid or not root or humanoid.Health <= 0 then
		return nil, nil
	end
	return character, root
end

-- Turns the client's reported origin and direction into a trusted CFrame.
local function aimFrame(root: BasePart, origin: any, direction: any): CFrame
	local position = root.Position
	if typeof(origin) == "Vector3" and (origin - position).Magnitude <= MAX_ORIGIN_DRIFT then
		position = origin
	end
	local look = root.CFrame.LookVector
	if typeof(direction) == "Vector3" then
		local flat = Vector3.new(direction.X, 0, direction.Z)
		if flat.Magnitude > 0.01 and flat.Magnitude == flat.Magnitude then
			look = flat.Unit
		end
	end
	return CFrame.lookAt(position, position + look)
end

local function collectEnemies(parts: { BasePart }): { Model }
	local seen = {}
	local list = {}
	for _, part in parts do
		local model = part:FindFirstAncestorOfClass("Model")
		if model and not seen[model] and CollectionService:HasTag(model, "Enemy") and Enemy.IsEnemy(model) then
			seen[model] = true
			table.insert(list, model)
		end
	end
	return list
end

local function overlapParams(character: Model): OverlapParams
	local params = OverlapParams.new()
	params.FilterType = Enum.RaycastFilterType.Exclude
	params.FilterDescendantsInstances = { character }
	return params
end

local function hitBox(character: Model, frame: CFrame, range: number, width: number): { Model }
	local center = frame * CFrame.new(0, 0, -range / 2)
	local parts = workspace:GetPartBoundsInBox(center, Vector3.new(width, 7, range + 2), overlapParams(character))
	return collectEnemies(parts)
end

local function hitRadius(character: Model, position: Vector3, radius: number): { Model }
	return collectEnemies(workspace:GetPartBoundsInRadius(position, radius, overlapParams(character)))
end

local function statPoints(player: Player, weapon: any): number
	local data = PlayerData.Get(player)
	return if data then data.Stats[weapon.Stat] or 0 else 0
end

local function swing(character: Model, weapon: any, index: number)
	local tool = character:FindFirstChildOfClass("Tool")
	Net.Effect:FireAllClients("Swing", character, weapon.Swing, index, tool)
end

local function doM1(player: Player, character: Model, root: BasePart, weapon: any, origin: any, direction: any)
	local state = stateOf(player)
	local now = os.clock()
	if now < state.m1Ready then
		return
	end
	local m1 = weapon.M1
	if now - state.lastM1 > COMBO_RESET then
		state.combo = 0
	end
	state.combo += 1
	state.lastM1 = now
	local finisher = state.combo >= m1.ComboLength
	-- A little slack for network jitter so clicks at the exact cadence aren't dropped.
	state.m1Ready = now + (if finisher then m1.ComboEndCooldown else m1.Cooldown) * 0.85
	local index = state.combo
	if finisher then
		state.combo = 0
	end

	swing(character, weapon, index)
	local frame = aimFrame(root, origin, direction)
	local damage = Formulas.Damage(m1.Damage * (if finisher then m1.FinisherMultiplier else 1), statPoints(player, weapon))
	for _, model in hitBox(character, frame, m1.Range, m1.Width) do
		Enemy.Damage(model, damage, player, frame.LookVector, if finisher then m1.Knockback else 4)
	end
end

local function doMove(player: Player, character: Model, root: BasePart, key: string, moveKey: string, weapon: any, origin: any, direction: any)
	local move = weapon.Moves and weapon.Moves[moveKey]
	if not move then
		return
	end
	local data = PlayerData.Get(player)
	if (data.Mastery[key] or 0) < move.Mastery then
		return
	end
	local state = stateOf(player)
	local now = os.clock()
	local cooldownKey = key .. ":" .. moveKey
	if now < (state.cooldowns[cooldownKey] or 0) then
		return
	end
	if not Progression.UseEnergy(player, move.Energy) then
		Progression.Notify(player, "Not enough Energy!", "Error")
		return
	end
	state.cooldowns[cooldownKey] = now + move.Cooldown * 0.95

	local frame = aimFrame(root, origin, direction)
	local damage = Formulas.Damage(move.Damage, statPoints(player, weapon))
	local targets
	if move.Shape == "Radius" then
		targets = hitRadius(character, frame.Position, move.Radius)
		Net.Effect:FireAllClients("Shockwave", frame.Position, move.Radius, move.Color)
	elseif move.Shape == "Dash" then
		targets = hitBox(character, frame, move.Dash + 3, move.Width)
		Net.Effect:FireAllClients("Streak", frame.Position, frame.Position + frame.LookVector * move.Dash, move.Color)
	else
		targets = hitBox(character, frame, move.Range, move.Width)
		Net.Effect:FireAllClients("Shockwave", (frame * CFrame.new(0, 0, -move.Range / 2)).Position, move.Width, move.Color)
	end
	swing(character, weapon, 4)
	for _, model in targets do
		local push = if move.Shape == "Radius"
			then (model:GetPivot().Position - frame.Position)
			else frame.LookVector
		Enemy.Damage(model, damage, player, push, move.Knockback)
	end
	Net.MoveUsed:FireClient(player, key, moveKey, move.Cooldown)
end

local function onCombat(player: Player, key: any, action: any, origin: any, direction: any)
	if type(key) ~= "string" or type(action) ~= "string" then
		return
	end
	local weapon = Weapons[key]
	local data = PlayerData.Get(player)
	if not weapon or not data or not data.Owned[key] then
		return
	end
	local character, root = actor(player)
	if not character or not root then
		return
	end
	local tool = character:FindFirstChildOfClass("Tool")
	if not tool or tool.Name ~= key then
		return
	end
	if action == "M1" then
		doM1(player, character, root, weapon, origin, direction)
	elseif MOVE_KEYS[action] then
		doMove(player, character, root, key, action, weapon, origin, direction)
	end
end

-- Dashing is client-side movement; the server only charges Energy and enforces the cooldown.
local function onDash(player: Player)
	local _, root = actor(player)
	if not root then
		return
	end
	local state = stateOf(player)
	local now = os.clock()
	if now < state.dashReady then
		return
	end
	if Progression.UseEnergy(player, Formulas.DASH_COST) then
		state.dashReady = now + Formulas.DASH_COOLDOWN * 0.9
	end
end

function Combat.Init()
	Net.Combat.OnServerEvent:Connect(onCombat)
	Net.Dash.OnServerEvent:Connect(onDash)
	Players.PlayerRemoving:Connect(function(player)
		states[player] = nil
	end)
end

return Combat
