-- Enemy mobs: spawning inside zone parts, a shared Idle/Chase/Attack/Return state machine,
-- damage, kill rewards and respawns.
--
-- A zone is any part tagged by its attributes: EnemyType (key in Data.Enemies) and Count.
-- Enemy models are tagged "Enemy" with CollectionService so hitboxes and client VFX find them.

local CollectionService = game:GetService("CollectionService")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Enemies = require(ReplicatedStorage.Shared.Data.Enemies)
local Progression = require(script.Parent.Progression)
local Quest = require(script.Parent.Quest)

local Net = ReplicatedStorage.Shared.Net

local Enemy = {}

local TICK = 0.2
local STUN_TIME = 0.35

type State = {
	model: Model,
	humanoid: Humanoid,
	root: BasePart,
	def: any,
	key: string,
	zone: BasePart,
	home: Vector3,
	target: Player?,
	returning: boolean,
	lastAttack: number,
	stunnedUntil: number,
	nextWander: number,
	lastHitter: Player?,
	healthBar: Frame,
}

local active: { [Model]: State } = {}

local folder = Instance.new("Folder")
folder.Name = "Enemies"
folder.Parent = workspace

local function randomPointIn(zone: BasePart): Vector3
	local size = zone.Size
	local offset = Vector3.new((math.random() - 0.5) * size.X, size.Y / 2, (math.random() - 0.5) * size.Z)
	local top = zone.CFrame:PointToWorldSpace(offset)
	local params = RaycastParams.new()
	params.FilterType = Enum.RaycastFilterType.Exclude
	params.FilterDescendantsInstances = { folder, zone }
	local hit = workspace:Raycast(top + Vector3.new(0, 30, 0), Vector3.new(0, -120, 0), params)
	return if hit then hit.Position else top
end

local function makeBillboard(model: Model, def: any, head: BasePart): Frame
	local gui = Instance.new("BillboardGui")
	gui.Name = "Nameplate"
	gui.Size = UDim2.fromScale(5, 1.3)
	gui.StudsOffset = Vector3.new(0, 2.4, 0)
	gui.MaxDistance = 120
	gui.AlwaysOnTop = false
	gui.Adornee = head

	local label = Instance.new("TextLabel")
	label.BackgroundTransparency = 1
	label.Size = UDim2.fromScale(1, 0.6)
	label.Font = Enum.Font.GothamBold
	label.TextScaled = true
	label.TextColor3 = Color3.fromRGB(255, 90, 90)
	label.TextStrokeTransparency = 0.3
	label.Text = string.format("%s [Lv. %d]", def.DisplayName, def.Level)
	label.Parent = gui

	local back = Instance.new("Frame")
	back.BackgroundColor3 = Color3.fromRGB(30, 30, 30)
	back.BorderSizePixel = 0
	back.Position = UDim2.fromScale(0.1, 0.68)
	back.Size = UDim2.fromScale(0.8, 0.22)
	back.Parent = gui

	local fill = Instance.new("Frame")
	fill.Name = "Fill"
	fill.BackgroundColor3 = Color3.fromRGB(90, 220, 90)
	fill.BorderSizePixel = 0
	fill.Size = UDim2.fromScale(1, 1)
	fill.Parent = back

	gui.Parent = model
	return fill
end

local function dressUp(model: Model, def: any)
	local head = model:FindFirstChild("Head") :: BasePart?
	if not head then
		return
	end
	local bandana = Instance.new("Part")
	bandana.Name = "Bandana"
	bandana.Shape = Enum.PartType.Cylinder
	bandana.Size = Vector3.new(0.45, 1.35, 1.35)
	bandana.Color = def.BandanaColor
	bandana.Material = Enum.Material.Fabric
	bandana.CanCollide = false
	bandana.CanQuery = false
	bandana.CanTouch = false
	bandana.Massless = true
	bandana.CFrame = head.CFrame * CFrame.new(0, 0.35, 0) * CFrame.Angles(0, 0, math.rad(90))
	local weld = Instance.new("WeldConstraint")
	weld.Part0 = head
	weld.Part1 = bandana
	weld.Parent = bandana
	bandana.Parent = model
end

local spawnOne: (zone: BasePart, key: string) -> ()

local function onDied(state: State)
	active[state.model] = nil
	local killer = state.lastHitter
	if killer and killer.Parent then
		Progression.AddExp(killer, state.def.Exp)
		Progression.AddBeli(killer, state.def.Beli)
		Quest.OnKill(killer, state.key)
	end
	task.delay(3, function()
		state.model:Destroy()
	end)
	task.delay(state.def.RespawnTime, spawnOne, state.zone, state.key)
end

spawnOne = function(zone: BasePart, key: string)
	if not zone.Parent then
		return
	end
	local def = Enemies[key]
	local description = Instance.new("HumanoidDescription")
	description.HeadColor = def.SkinColor
	description.LeftArmColor = def.SkinColor
	description.RightArmColor = def.SkinColor
	description.TorsoColor = def.ShirtColor
	description.LeftLegColor = def.PantsColor
	description.RightLegColor = def.PantsColor

	local ok, model = pcall(function()
		return Players:CreateHumanoidModelFromDescription(description, Enum.HumanoidRigType.R15)
	end)
	if not ok or not model then
		warn("[Enemy] Could not build a rig for", key, model)
		task.delay(10, spawnOne, zone, key)
		return
	end

	local humanoid = model:FindFirstChildOfClass("Humanoid") :: Humanoid
	local root = model:FindFirstChild("HumanoidRootPart") :: BasePart
	local head = model:FindFirstChild("Head") :: BasePart
	model.Name = def.DisplayName
	humanoid.DisplayDistanceType = Enum.HumanoidDisplayDistanceType.None
	humanoid.MaxHealth = def.Health
	humanoid.Health = def.Health
	humanoid.WalkSpeed = def.WalkSpeed
	model:SetAttribute("EnemyType", key)
	model:SetAttribute("Level", def.Level)
	dressUp(model, def)
	local fill = makeBillboard(model, def, head)

	local home = randomPointIn(zone)
	model:PivotTo(CFrame.new(home + Vector3.new(0, 3, 0)) * CFrame.Angles(0, math.random() * math.pi * 2, 0))
	CollectionService:AddTag(model, "Enemy")
	model.Parent = folder
	pcall(function()
		root:SetNetworkOwner(nil)
	end)

	local state: State = {
		model = model,
		humanoid = humanoid,
		root = root,
		def = def,
		key = key,
		zone = zone,
		home = home,
		target = nil,
		returning = false,
		lastAttack = 0,
		stunnedUntil = 0,
		nextWander = os.clock() + math.random() * 4,
		lastHitter = nil,
		healthBar = fill,
	}
	active[model] = state

	humanoid.HealthChanged:Connect(function(health)
		fill.Size = UDim2.fromScale(math.clamp(health / humanoid.MaxHealth, 0, 1), 1)
	end)
	humanoid.Died:Once(function()
		onDied(state)
	end)
end

local function characterOf(player: Player): (Humanoid?, BasePart?)
	local character = player.Character
	if not character then
		return nil, nil
	end
	local humanoid = character:FindFirstChildOfClass("Humanoid")
	local root = character:FindFirstChild("HumanoidRootPart") :: BasePart?
	if humanoid and root and humanoid.Health > 0 then
		return humanoid, root
	end
	return nil, nil
end

local function findTarget(state: State): Player?
	local best, bestDistance = nil, state.def.AggroRadius
	for _, player in Players:GetPlayers() do
		local _, root = characterOf(player)
		if root then
			local distance = (root.Position - state.root.Position).Magnitude
			if distance < bestDistance and (root.Position - state.home).Magnitude < state.def.LeashRadius then
				best, bestDistance = player, distance
			end
		end
	end
	return best
end

local function attack(state: State, player: Player, targetHumanoid: Humanoid, targetRoot: BasePart)
	state.lastAttack = os.clock()
	Net.Effect:FireAllClients("Swing", state.model, "Punch", math.random(1, 2))
	targetHumanoid:TakeDamage(state.def.Damage)
	Net.Effect:FireAllClients("Hit", targetRoot.Position, Color3.fromRGB(255, 80, 80))
	Net.DamageNumber:FireClient(player, targetRoot.Position, state.def.Damage, true)
end

local function step(state: State, now: number)
	local humanoid, root, def = state.humanoid, state.root, state.def
	if humanoid.Health <= 0 then
		return
	end

	-- Drop targets that died, left, or dragged us too far from home.
	if state.target then
		local _, targetRoot = characterOf(state.target)
		if not targetRoot or (root.Position - state.home).Magnitude > def.LeashRadius then
			state.target = nil
			state.returning = true
		end
	end

	if state.returning then
		humanoid:MoveTo(state.home)
		if (root.Position - state.home).Magnitude < 6 then
			state.returning = false
			humanoid.Health = humanoid.MaxHealth
		end
		return
	end

	if not state.target then
		state.target = findTarget(state)
	end

	local target = state.target
	if target then
		local targetHumanoid, targetRoot = characterOf(target)
		if not targetHumanoid or not targetRoot then
			return
		end
		local offset = targetRoot.Position - root.Position
		local flat = Vector3.new(offset.X, 0, offset.Z)
		if flat.Magnitude > def.AttackRange then
			humanoid:MoveTo(targetRoot.Position - flat.Unit * (def.AttackRange - 1.5))
		else
			humanoid:MoveTo(root.Position)
			if flat.Magnitude > 0.1 then
				root.CFrame = CFrame.lookAt(root.Position, root.Position + flat)
			end
			if now >= state.stunnedUntil and now - state.lastAttack >= def.AttackCooldown then
				attack(state, target, targetHumanoid, targetRoot)
			end
		end
		return
	end

	-- Idle: wander around the zone now and then.
	if now >= state.nextWander then
		state.nextWander = now + 4 + math.random() * 5
		humanoid:MoveTo(randomPointIn(state.zone))
	end
end

-- Damages an enemy on behalf of a player. `direction` is the knockback direction.
function Enemy.Damage(model: Model, amount: number, player: Player, direction: Vector3?, knockback: number?)
	local state = active[model]
	if not state or state.humanoid.Health <= 0 then
		return
	end
	amount = math.floor(amount + 0.5)
	state.lastHitter = player
	state.stunnedUntil = os.clock() + STUN_TIME
	if not state.returning then
		state.target = player
	end
	state.humanoid:TakeDamage(amount)

	if direction and knockback and knockback > 0 and state.humanoid.Health > 0 then
		local flat = Vector3.new(direction.X, 0, direction.Z)
		if flat.Magnitude > 0.01 then
			local root = state.root
			root:ApplyImpulse((flat.Unit * knockback + Vector3.new(0, knockback * 0.35, 0)) * root.AssemblyMass)
		end
	end

	Net.DamageNumber:FireClient(player, state.root.Position, amount, false)
	Net.Effect:FireAllClients("Hit", state.root.Position, Color3.fromRGB(255, 240, 200))
end

function Enemy.IsEnemy(model: Instance): boolean
	return active[model :: Model] ~= nil
end

-- Starts spawning enemies in a zone part.
function Enemy.StartZone(zone: BasePart)
	local key = zone:GetAttribute("EnemyType")
	if type(key) ~= "string" or not Enemies[key] then
		warn("[Enemy] Zone", zone:GetFullName(), "has an unknown EnemyType", key)
		return
	end
	local count = zone:GetAttribute("Count") or 4
	for _ = 1, count do
		task.spawn(spawnOne, zone, key)
	end
end

function Enemy.Init()
	task.spawn(function()
		while true do
			task.wait(TICK)
			local now = os.clock()
			for _, state in active do
				local ok, err = pcall(step, state, now)
				if not ok then
					warn("[Enemy] AI error:", err)
				end
			end
		end
	end)
end

return Enemy
