-- Player profiles: loads, session-locks, autosaves and releases one DataStore entry per player.
--
-- If the DataStore can't be reached in Studio (place not published, or "Enable Studio Access to
-- API Services" is off) the player gets a session-only profile and a warning on screen. In a live
-- server a failed load kicks the player instead, so a bad load can never overwrite real progress.

local DataStoreService = game:GetService("DataStoreService")
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")

local PlayerData = {}

local STORE_NAME = "BloxFruitsProfiles_v1"
local AUTOSAVE_INTERVAL = 60
local LOCK_TIMEOUT = 180 -- a lock older than this belongs to a dead server and can be taken
local LOAD_ATTEMPTS = 5

local profiles: { [Player]: any } = {}
local canSave: { [Player]: boolean } = {}
local loadedEvent = Instance.new("BindableEvent")

-- Fires (player, profile) once a player's profile is ready.
PlayerData.Loaded = loadedEvent.Event

local store: DataStore? = nil
do
	local ok, err = pcall(function()
		store = DataStoreService:GetDataStore(STORE_NAME)
	end)
	if not ok then
		warn("[PlayerData] DataStore unavailable, progress will not save:", err)
	end
end

local function defaultProfile()
	return {
		Version = 1,
		Level = 1,
		Exp = 0,
		Beli = 0,
		Points = 0,
		Stats = { Melee = 0, Defense = 0, Sword = 0, Gun = 0, Fruit = 0 },
		Owned = { Combat = true },
		Mastery = {}, -- [weaponKey] = mastery, used from Phase 2
		Fruit = "", -- eaten fruit key, used from Phase 2
		Team = "", -- "Pirates" or "Marines"
		Quest = nil :: any, -- { Id = questKey, Progress = n }
	}
end

-- Fills keys a stored profile is missing (for profiles saved by older versions).
local function reconcile(data: any)
	local template = defaultProfile()
	for key, value in template do
		if data[key] == nil then
			data[key] = value
		elseif type(value) == "table" and type(data[key]) == "table" then
			for subKey, subValue in value do
				if data[key][subKey] == nil then
					data[key][subKey] = subValue
				end
			end
		end
	end
	return data
end

local function keyFor(player: Player): string
	return "Player_" .. player.UserId
end

-- Loads the profile and takes the session lock. Returns (profile, persistent).
local function load(player: Player): (any?, boolean)
	if not store then
		return defaultProfile(), false
	end

	local lastErr = nil
	for attempt = 1, LOAD_ATTEMPTS do
		local lockedElsewhere = false
		local steal = attempt == LOAD_ATTEMPTS
		local result = nil
		local ok, err = pcall(function()
			(store :: DataStore):UpdateAsync(keyFor(player), function(old)
				lockedElsewhere = false
				local data = old or defaultProfile()
				local lock = data.SessionLock
				if
					not steal
					and lock
					and lock.JobId ~= game.JobId
					and os.time() - (lock.Time or 0) < LOCK_TIMEOUT
				then
					lockedElsewhere = true
					return nil -- leave it alone and retry
				end
				data.SessionLock = { JobId = game.JobId, Time = os.time() }
				result = data
				return data
			end)
		end)
		if ok and not lockedElsewhere and result then
			return reconcile(result), true
		end
		lastErr = if ok then "profile is open on another server" else err
		if not ok and RunService:IsStudio() then
			break -- usually "Studio API access is off"; don't make the tester wait
		end
		task.wait(if ok then 6 else attempt * 2)
		if not player.Parent then
			return nil, false
		end
	end

	warn("[PlayerData] Could not load", player.Name, lastErr)
	if RunService:IsStudio() then
		return defaultProfile(), false
	end
	return nil, false
end

local function snapshot(data: any)
	local copy = table.clone(data)
	copy.SessionLock = nil
	return copy
end

function PlayerData.Get(player: Player): any?
	return profiles[player]
end

function PlayerData.IsPersistent(player: Player): boolean
	return canSave[player] == true
end

-- Saves the profile. `release` drops the session lock so another server can load it at once.
function PlayerData.Save(player: Player, release: boolean?)
	local data = profiles[player]
	if not data or not canSave[player] or not store then
		return
	end
	local copy = snapshot(data)
	local ok, err = pcall(function()
		(store :: DataStore):UpdateAsync(keyFor(player), function(old)
			if old and old.SessionLock and old.SessionLock.JobId ~= game.JobId then
				return nil -- another server took over this profile; never overwrite it
			end
			copy.SessionLock = if release then nil else { JobId = game.JobId, Time = os.time() }
			return copy
		end)
	end)
	if not ok then
		warn("[PlayerData] Save failed for", player.Name, err)
	end
end

local function onPlayerAdded(player: Player)
	local data, persistent = load(player)
	if not player.Parent then
		if persistent then
			profiles[player] = data
			canSave[player] = true
			PlayerData.Save(player, true)
			profiles[player] = nil
			canSave[player] = nil
		end
		return
	end
	if not data then
		player:Kick("Your data couldn't be loaded. Please rejoin in a minute.")
		return
	end
	profiles[player] = data
	canSave[player] = persistent
	player:SetAttribute("SessionOnly", not persistent)
	loadedEvent:Fire(player, data)
	player:SetAttribute("DataLoaded", true)
end

local function onPlayerRemoving(player: Player)
	PlayerData.Save(player, true)
	profiles[player] = nil
	canSave[player] = nil
end

function PlayerData.Start()
	Players.PlayerAdded:Connect(onPlayerAdded)
	Players.PlayerRemoving:Connect(onPlayerRemoving)
	for _, player in Players:GetPlayers() do
		task.spawn(onPlayerAdded, player)
	end

	task.spawn(function()
		while true do
			task.wait(AUTOSAVE_INTERVAL)
			for player in profiles do
				task.spawn(PlayerData.Save, player, false)
			end
		end
	end)

	game:BindToClose(function()
		local pending = 0
		for player in profiles do
			pending += 1
			task.spawn(function()
				PlayerData.Save(player, true)
				pending -= 1
			end)
		end
		local deadline = os.clock() + 25
		while pending > 0 and os.clock() < deadline do
			task.wait(0.1)
		end
	end)
end

return PlayerData
