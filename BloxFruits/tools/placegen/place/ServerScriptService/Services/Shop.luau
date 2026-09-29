-- Dealers. Buying checks the dealer sells the item, the player is standing near the dealer,
-- doesn't own it yet, and has the Beli.

local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Shops = require(ReplicatedStorage.Shared.Data.Shops)
local Weapons = require(ReplicatedStorage.Shared.Data.Weapons)
local Loadout = require(script.Parent.Loadout)
local PlayerData = require(script.Parent.PlayerData)
local Progression = require(script.Parent.Progression)

local Net = ReplicatedStorage.Shared.Net

local Shop = {}

local TALK_DISTANCE = 20

local dealers: { [string]: Model } = {}

function Shop.RegisterDealer(shopId: string, model: Model)
	dealers[shopId] = model
end

local function buy(player: Player, shopId: string, itemId: string)
	local data = PlayerData.Get(player)
	local shop = Shops[shopId]
	local item = Weapons[itemId]
	if not data or not shop or not item or not item.Price or not table.find(shop.Items, itemId) then
		return
	end
	local character = player.Character
	local root = character and character:FindFirstChild("HumanoidRootPart") :: BasePart?
	local dealer = dealers[shopId]
	if not root or not dealer or (root.Position - dealer:GetPivot().Position).Magnitude > TALK_DISTANCE then
		return
	end
	if data.Owned[itemId] then
		Progression.Notify(player, "You already own " .. item.DisplayName .. ".", "Error")
		return
	end
	if data.Beli < item.Price then
		Progression.Notify(player, string.format("You need $%d for %s.", item.Price, item.DisplayName), "Error")
		return
	end
	data.Beli -= item.Price
	data.Owned[itemId] = true
	Progression.Sync(player)
	Loadout.Give(player)
	Progression.Notify(player, "Bought " .. item.DisplayName .. "! Find it in your hotbar.", "Success")
end

function Shop.Init()
	Net.ShopAction.OnServerEvent:Connect(function(player, action, shopId, itemId)
		if action == "Buy" and type(shopId) == "string" and type(itemId) == "string" then
			buy(player, shopId, itemId)
		end
	end)
end

return Shop
