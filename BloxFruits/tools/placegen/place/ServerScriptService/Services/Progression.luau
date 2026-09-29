-- Level, EXP, Beli, stat points, Health and Energy.
--
-- The profile lives in PlayerData; this service mirrors the parts the client shows onto
-- player attributes (Level, Exp, ExpToNext, Beli, Points, Stat_<name>, Energy, MaxEnergy,
-- QuestId, QuestProgress, Team) and onto leaderstats.

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Formulas = require(ReplicatedStorage.Shared.Formulas)
local PlayerData = require(script.Parent.PlayerData)

local Net = ReplicatedStorage.Shared.Net

local Progression = {}

local ENERGY_REGEN_DELAY = 1.5 -- seconds after spending Energy before it regenerates
local ENERGY_REGEN_RATE = 0.12 -- fraction of max per second

local energy: { [Player]: number } = {}
local lastEnergyUse: { [Player]: number } = {}

function Progression.Notify(player: Player, text: string, kind: string?)
	Net.Notify:FireClient(player, text, kind or "Info")
end

local function maxHealthOf(data): number
	return Formulas.MaxHealth(data.Level, data.Stats.Defense)
end

local function maxEnergyOf(data): number
	return Formulas.MaxEnergy(data.Level, data.Stats.Melee)
end

-- Pushes the profile to attributes and leaderstats.
function Progression.Sync(player: Player)
	local data = PlayerData.Get(player)
	if not data then
		return
	end
	player:SetAttribute("Level", data.Level)
	player:SetAttribute("Exp", data.Exp)
	player:SetAttribute("ExpToNext", Formulas.ExpToNext(data.Level))
	player:SetAttribute("Beli", data.Beli)
	player:SetAttribute("Points", data.Points)
	for _, stat in Formulas.STAT_NAMES do
		player:SetAttribute("Stat_" .. stat, data.Stats[stat])
	end
	player:SetAttribute("MaxEnergy", maxEnergyOf(data))
	player:SetAttribute("Team", data.Team)
	player:SetAttribute("QuestId", if data.Quest then data.Quest.Id else "")
	player:SetAttribute("QuestProgress", if data.Quest then data.Quest.Progress else 0)

	local leaderstats = player:FindFirstChild("leaderstats")
	if leaderstats then
		(leaderstats :: any).Level.Value = data.Level;
		(leaderstats :: any).Beli.Value = data.Beli
	end
end

-- Sets the character's max Health (and optionally heals to full) and clamps Energy.
function Progression.ApplyVitals(player: Player, fullHeal: boolean?)
	local data = PlayerData.Get(player)
	if not data then
		return
	end
	local maxEnergy = maxEnergyOf(data)
	energy[player] = math.min(energy[player] or maxEnergy, maxEnergy)
	if fullHeal then
		energy[player] = maxEnergy
	end
	player:SetAttribute("Energy", math.floor(energy[player]))

	local character = player.Character
	local humanoid = character and character:FindFirstChildOfClass("Humanoid")
	if humanoid and humanoid.Health > 0 then
		local maxHealth = maxHealthOf(data)
		humanoid.MaxHealth = maxHealth
		humanoid.Health = if fullHeal then maxHealth else math.min(humanoid.Health, maxHealth)
	end
end

function Progression.AddExp(player: Player, amount: number)
	local data = PlayerData.Get(player)
	if not data or amount <= 0 then
		return
	end
	data.Exp += amount
	local gained = 0
	while data.Level < Formulas.LEVEL_CAP and data.Exp >= Formulas.ExpToNext(data.Level) do
		data.Exp -= Formulas.ExpToNext(data.Level)
		data.Level += 1
		data.Points += Formulas.POINTS_PER_LEVEL
		gained += 1
	end
	if data.Level >= Formulas.LEVEL_CAP then
		data.Exp = 0
	end
	Progression.Sync(player)
	if gained > 0 then
		Progression.ApplyVitals(player, true)
		Progression.Notify(
			player,
			string.format("Level up! You are now level %d (+%d stat points)", data.Level, gained * Formulas.POINTS_PER_LEVEL),
			"LevelUp"
		)
		if player.Character then
			Net.Effect:FireAllClients("LevelUp", player.Character)
		end
	end
end

function Progression.AddBeli(player: Player, amount: number)
	local data = PlayerData.Get(player)
	if not data then
		return
	end
	data.Beli = math.max(0, data.Beli + amount)
	Progression.Sync(player)
end

-- Spends Energy if the player has enough. Returns whether it was spent.
function Progression.UseEnergy(player: Player, cost: number): boolean
	local current = energy[player]
	if not current or current < cost then
		return false
	end
	energy[player] = current - cost
	lastEnergyUse[player] = os.clock()
	player:SetAttribute("Energy", math.floor(energy[player]))
	return true
end

local function spendStat(player: Player, stat: any, amount: any)
	local data = PlayerData.Get(player)
	if not data or type(stat) ~= "string" or data.Stats[stat] == nil then
		return
	end
	if amount ~= 1 and amount ~= 10 and amount ~= 100 then
		return
	end
	local room = Formulas.LEVEL_CAP - data.Stats[stat]
	local spend = math.min(amount, data.Points, room)
	if spend <= 0 then
		return
	end
	data.Points -= spend
	data.Stats[stat] += spend
	Progression.Sync(player)
	Progression.ApplyVitals(player, false)
end

-- Free stat reset while the MVP is being tested (design doc section 2).
local function resetStats(player: Player)
	local data = PlayerData.Get(player)
	if not data then
		return
	end
	for _, stat in Formulas.STAT_NAMES do
		data.Points += data.Stats[stat]
		data.Stats[stat] = 0
	end
	Progression.Sync(player)
	Progression.ApplyVitals(player, false)
	Progression.Notify(player, "Stats reset. All points refunded.")
end

local function makeLeaderstats(player: Player)
	local folder = Instance.new("Folder")
	folder.Name = "leaderstats"
	local level = Instance.new("IntValue")
	level.Name = "Level"
	level.Parent = folder
	local beli = Instance.new("IntValue")
	beli.Name = "Beli"
	beli.Parent = folder
	folder.Parent = player
end

local function onCharacterAdded(player: Player, character: Model)
	local humanoid = character:WaitForChild("Humanoid", 10) :: Humanoid?
	if not humanoid then
		return
	end
	Progression.ApplyVitals(player, true)
end

function Progression.Init()
	PlayerData.Loaded:Connect(function(player: Player)
		makeLeaderstats(player)
		Progression.Sync(player)
		Progression.ApplyVitals(player, true)
		player.CharacterAdded:Connect(function(character)
			onCharacterAdded(player, character)
		end)
		if player.Character then
			task.spawn(onCharacterAdded, player, player.Character)
		end
	end)

	Players.PlayerRemoving:Connect(function(player)
		energy[player] = nil
		lastEnergyUse[player] = nil
	end)

	Net.SpendStat.OnServerEvent:Connect(spendStat)
	Net.ResetStats.OnServerEvent:Connect(resetStats)

	-- Energy regeneration
	task.spawn(function()
		local STEP = 0.25
		while true do
			task.wait(STEP)
			local now = os.clock()
			for player, current in energy do
				local data = PlayerData.Get(player)
				if data and now - (lastEnergyUse[player] or 0) >= ENERGY_REGEN_DELAY then
					local maxEnergy = maxEnergyOf(data)
					if current < maxEnergy then
						energy[player] = math.min(maxEnergy, current + maxEnergy * ENERGY_REGEN_RATE * STEP)
						player:SetAttribute("Energy", math.floor(energy[player]))
					end
				end
			end
		end
	end)
end

return Progression
