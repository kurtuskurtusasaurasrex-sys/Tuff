-- Client-side visuals: damage numbers, hit sparks, shockwaves, dash streaks, level-up rings,
-- procedural swing animations for players and enemies, and a simple walk cycle for enemies.
--
-- Swings are procedural (Motor6D.Transform overrides) so the slice needs no uploaded animation
-- assets. Replace them with real Animation assets when the art pass happens.

local CollectionService = game:GetService("CollectionService")
local Debris = game:GetService("Debris")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")

local Net = ReplicatedStorage.Shared:WaitForChild("Net")

local VFX = {}

local SOUNDS = {
	Slash = "rbxasset://sounds/swordslash.wav",
	Punch = "rbxasset://sounds/swordlunge.wav",
	LevelUp = "rbxasset://sounds/electronicpingshort.wav",
}

local effectsFolder = Instance.new("Folder")
effectsFolder.Name = "ClientEffects"
effectsFolder.Parent = workspace

local function effectPart(props: { [string]: any }): Part
	local part = Instance.new("Part")
	part.Anchored = true
	part.CanCollide = false
	part.CanQuery = false
	part.CanTouch = false
	part.CastShadow = false
	part.Material = Enum.Material.Neon
	for key, value in props do
		(part :: any)[key] = value
	end
	part.Parent = effectsFolder
	return part
end

local function playSound(id: string, position: Vector3, volume: number?, speed: number?)
	local holder = effectPart({ Transparency = 1, Size = Vector3.one, Position = position })
	local sound = Instance.new("Sound")
	sound.SoundId = id
	sound.Volume = volume or 0.5
	sound.PlaybackSpeed = speed or 1
	sound.RollOffMaxDistance = 120
	sound.Parent = holder
	sound:Play()
	Debris:AddItem(holder, 3)
end

function VFX.DamageNumber(position: Vector3, amount: number, taken: boolean?)
	local anchor = effectPart({
		Transparency = 1,
		Size = Vector3.one,
		Position = position + Vector3.new((math.random() - 0.5) * 2, 2, (math.random() - 0.5) * 2),
	})
	local gui = Instance.new("BillboardGui")
	gui.Size = UDim2.fromScale(3, 1.4)
	gui.AlwaysOnTop = true
	gui.MaxDistance = 150
	gui.Parent = anchor
	local label = Instance.new("TextLabel")
	label.BackgroundTransparency = 1
	label.Size = UDim2.fromScale(1, 1)
	label.Font = Enum.Font.GothamBlack
	label.TextScaled = true
	label.Text = tostring(amount)
	label.TextColor3 = if taken then Color3.fromRGB(255, 70, 70) else Color3.fromRGB(255, 225, 90)
	label.TextStrokeTransparency = 0
	label.Parent = gui
	local info = TweenInfo.new(0.8, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)
	TweenService:Create(gui, info, { StudsOffset = Vector3.new(0, 2.5, 0) }):Play()
	TweenService:Create(label, TweenInfo.new(0.8, Enum.EasingStyle.Quad, Enum.EasingDirection.In), {
		TextTransparency = 1,
		TextStrokeTransparency = 1,
	}):Play()
	Debris:AddItem(anchor, 0.9)
end

local function hit(position: Vector3, color: Color3?)
	local spark = effectPart({
		Shape = Enum.PartType.Ball,
		Size = Vector3.one * 0.8,
		Position = position,
		Color = color or Color3.fromRGB(255, 240, 200),
		Transparency = 0.1,
	})
	TweenService:Create(spark, TweenInfo.new(0.25), { Size = Vector3.one * 3.2, Transparency = 1 }):Play()
	Debris:AddItem(spark, 0.3)
end

local function shockwave(position: Vector3, radius: number, color: Color3?)
	local ring = effectPart({
		Shape = Enum.PartType.Cylinder,
		Size = Vector3.new(0.4, 2, 2),
		CFrame = CFrame.new(position - Vector3.new(0, 2.5, 0)) * CFrame.Angles(0, 0, math.rad(90)),
		Color = color or Color3.new(1, 1, 1),
		Transparency = 0.2,
	})
	TweenService:Create(ring, TweenInfo.new(0.35, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {
		Size = Vector3.new(0.4, radius * 2, radius * 2),
		Transparency = 1,
	}):Play()
	Debris:AddItem(ring, 0.4)
end

local function streak(from: Vector3, to: Vector3, color: Color3?)
	local length = (to - from).Magnitude
	if length < 0.1 then
		return
	end
	local line = effectPart({
		Size = Vector3.new(0.6, 0.6, length),
		CFrame = CFrame.lookAt((from + to) / 2, to),
		Color = color or Color3.new(1, 1, 1),
		Transparency = 0.15,
	})
	TweenService:Create(line, TweenInfo.new(0.3), { Size = Vector3.new(0.05, 0.05, length), Transparency = 1 }):Play()
	Debris:AddItem(line, 0.35)
end

local function levelUp(character: Model)
	local root = character:FindFirstChild("HumanoidRootPart") :: BasePart?
	if not root then
		return
	end
	local ring = effectPart({
		Shape = Enum.PartType.Cylinder,
		Size = Vector3.new(0.3, 7, 7),
		CFrame = CFrame.new(root.Position - Vector3.new(0, 2.8, 0)) * CFrame.Angles(0, 0, math.rad(90)),
		Color = Color3.fromRGB(255, 210, 60),
		Transparency = 0.2,
	})
	TweenService:Create(ring, TweenInfo.new(1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {
		CFrame = ring.CFrame + Vector3.new(0, 6, 0),
		Size = Vector3.new(0.3, 3, 3),
		Transparency = 1,
	}):Play()
	Debris:AddItem(ring, 1.1)
	playSound(SOUNDS.LevelUp, root.Position, 0.7)
end

---------------------------------------------------------------------------------------------
-- Procedural animation

type Swing = { model: Model, style: string, index: number, started: number, duration: number }
local swings: { Swing } = {}

local function motor(model: Model, partName: string, jointName: string): Motor6D?
	local part = model:FindFirstChild(partName)
	local joint = part and part:FindFirstChild(jointName)
	return if joint and joint:IsA("Motor6D") then joint else nil
end

local function swing(model: Model, style: string, index: number)
	if not model or not model.Parent then
		return
	end
	table.insert(swings, {
		model = model,
		style = style,
		index = index or 1,
		started = os.clock(),
		duration = if style == "Slash" then 0.26 else 0.2,
	})
	local root = model:FindFirstChild("HumanoidRootPart") :: BasePart?
	if root and SOUNDS[style] then
		playSound(SOUNDS[style], root.Position, 0.35, if style == "Punch" then 1.3 else 0.9 + math.random() * 0.2)
	end
end

local function applySwing(entry: Swing, t: number)
	local model = entry.model
	if entry.style == "Slash" then
		local shoulder = motor(model, "RightUpperArm", "RightShoulder")
		if shoulder then
			local eased = 1 - (1 - t) ^ 3
			local pitch = math.rad(160 - 130 * eased)
			local roll = math.rad(if entry.index % 2 == 0 then 35 else -25)
			shoulder.Transform = CFrame.Angles(pitch, 0, roll)
		end
	else
		local right = entry.index % 2 == 1
		local shoulder = if right
			then motor(model, "RightUpperArm", "RightShoulder")
			else motor(model, "LeftUpperArm", "LeftShoulder")
		local elbow = if right
			then motor(model, "RightLowerArm", "RightElbow")
			else motor(model, "LeftLowerArm", "LeftElbow")
		local reach = math.sin(math.pi * t)
		if shoulder then
			shoulder.Transform = CFrame.Angles(math.rad(95) * reach, 0, 0)
		end
		if elbow then
			elbow.Transform = CFrame.Angles(math.rad(40) * (1 - reach), 0, 0)
		end
	end
end

local function resetArms(model: Model)
	for _, pair in { { "RightUpperArm", "RightShoulder" }, { "LeftUpperArm", "LeftShoulder" }, { "RightLowerArm", "RightElbow" }, { "LeftLowerArm", "LeftElbow" } } do
		local joint = motor(model, pair[1], pair[2])
		if joint then
			joint.Transform = CFrame.identity
		end
	end
end

-- Enemies have no Animate script, so give them a simple walk cycle.
local walkPhase: { [Model]: number } = {}
local function animateEnemies(dt: number)
	for _, model in CollectionService:GetTagged("Enemy") do
		if model:IsA("Model") and model.Parent then
			local root = model:FindFirstChild("HumanoidRootPart") :: BasePart?
			if root then
				local velocity = root.AssemblyLinearVelocity
				local speed = Vector3.new(velocity.X, 0, velocity.Z).Magnitude
				local phase = (walkPhase[model] or 0) + dt * speed * 0.55
				walkPhase[model] = phase
				local amount = math.clamp(speed / 14, 0, 1)
				local swingAngle = math.sin(phase) * 0.8 * amount
				local leftHip = motor(model, "LeftUpperLeg", "LeftHip")
				local rightHip = motor(model, "RightUpperLeg", "RightHip")
				local leftShoulder = motor(model, "LeftUpperArm", "LeftShoulder")
				local rightShoulder = motor(model, "RightUpperArm", "RightShoulder")
				if leftHip then
					leftHip.Transform = CFrame.Angles(swingAngle, 0, 0)
				end
				if rightHip then
					rightHip.Transform = CFrame.Angles(-swingAngle, 0, 0)
				end
				if leftShoulder then
					leftShoulder.Transform = CFrame.Angles(-swingAngle * 0.7, 0, 0)
				end
				if rightShoulder then
					rightShoulder.Transform = CFrame.Angles(swingAngle * 0.7, 0, 0)
				end
			end
		end
	end
	for model in walkPhase do
		if not model.Parent then
			walkPhase[model] = nil
		end
	end
end

local function onStepped(_, dt: number)
	animateEnemies(dt)
	local now = os.clock()
	for i = #swings, 1, -1 do
		local entry = swings[i]
		local t = (now - entry.started) / entry.duration
		if t >= 1 or not entry.model.Parent then
			table.remove(swings, i)
			if entry.model.Parent then
				resetArms(entry.model)
			end
		else
			applySwing(entry, t)
		end
	end
end

function VFX.Init()
	Net.DamageNumber.OnClientEvent:Connect(VFX.DamageNumber)
	Net.Effect.OnClientEvent:Connect(function(kind, a, b, c, _d)
		if kind == "Swing" then
			swing(a, b, c)
		elseif kind == "Hit" then
			hit(a, b)
		elseif kind == "Shockwave" then
			shockwave(a, b, c)
		elseif kind == "Streak" then
			streak(a, b, c)
		elseif kind == "LevelUp" then
			levelUp(a)
		end
	end)
	-- Stepped runs after the Animator writes joint transforms, so these overrides win.
	RunService.Stepped:Connect(onStepped)
end

return VFX
