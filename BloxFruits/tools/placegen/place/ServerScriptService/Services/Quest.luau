-- Quest Givers and quest progress. One active quest at a time; accepting another replaces it.

local ReplicatedStorage = game:GetService("ReplicatedStorage")

local QuestData = require(ReplicatedStorage.Shared.Data.Quests)
local PlayerData = require(script.Parent.PlayerData)
local Progression = require(script.Parent.Progression)

local Net = ReplicatedStorage.Shared.Net

local Quest = {}

local TALK_DISTANCE = 20

-- [giverId] = the NPC model, registered by the World service.
local givers: { [string]: Model } = {}

function Quest.RegisterGiver(giverId: string, model: Model)
	givers[giverId] = model
end

local function isNear(player: Player, model: Model?): boolean
	local character = player.Character
	local root = character and character:FindFirstChild("HumanoidRootPart") :: BasePart?
	if not root or not model then
		return false
	end
	return (root.Position - model:GetPivot().Position).Magnitude <= TALK_DISTANCE
end

local function accept(player: Player, giverId: string, questId: string)
	local data = PlayerData.Get(player)
	local giver = QuestData.Givers[giverId]
	local quest = QuestData.Quests[questId]
	if not data or not giver or not quest or not table.find(giver.Quests, questId) then
		return
	end
	if not isNear(player, givers[giverId]) then
		return
	end
	if data.Level < quest.MinLevel then
		Progression.Notify(player, string.format("You need to be level %d for this quest.", quest.MinLevel), "Error")
		return
	end
	data.Quest = { Id = questId, Progress = 0 }
	Progression.Sync(player)
	Progression.Notify(player, "Quest accepted: " .. quest.Title)
end

local function abandon(player: Player)
	local data = PlayerData.Get(player)
	if not data or not data.Quest then
		return
	end
	data.Quest = nil
	Progression.Sync(player)
	Progression.Notify(player, "Quest abandoned.")
end

-- Called by the Enemy service when `player` gets the kill on an enemy of type `enemyKey`.
function Quest.OnKill(player: Player, enemyKey: string)
	local data = PlayerData.Get(player)
	local active = data and data.Quest
	local quest = active and QuestData.Quests[active.Id]
	if not quest or quest.Target ~= enemyKey then
		return
	end
	active.Progress += 1
	if active.Progress >= quest.Count then
		data.Quest = nil
		Progression.Notify(
			player,
			string.format("Quest complete! +%d EXP, +$%d", quest.Exp, quest.Beli),
			"Success"
		)
		Progression.AddBeli(player, quest.Beli)
		Progression.AddExp(player, quest.Exp)
	end
	Progression.Sync(player)
end

function Quest.Init()
	Net.QuestAction.OnServerEvent:Connect(function(player, action, giverId, questId)
		if action == "Accept" and type(giverId) == "string" and type(questId) == "string" then
			accept(player, giverId, questId)
		elseif action == "Abandon" then
			abandon(player)
		end
	end)
end

return Quest
