-- Builds weapon Tools and keeps each player's Backpack in sync with the weapons they own.
-- Tools are named by their key in Data.Weapons; the Combat service checks that name.

local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Weapons = require(ReplicatedStorage.Shared.Data.Weapons)
local PlayerData = require(script.Parent.PlayerData)

local Loadout = {}

local function part(props: { [string]: any }): Part
	local p = Instance.new("Part")
	p.CanCollide = false
	p.CanTouch = false
	p.CanQuery = false
	p.Massless = true
	p.TopSurface = Enum.SurfaceType.Smooth
	p.BottomSurface = Enum.SurfaceType.Smooth
	for key, value in props do
		(p :: any)[key] = value
	end
	return p
end

-- Welds `child` to `handle` at `offset` (in the handle's space).
local function attach(handle: BasePart, child: BasePart, offset: CFrame)
	child.CFrame = handle.CFrame * offset
	local weld = Instance.new("WeldConstraint")
	weld.Part0 = handle
	weld.Part1 = child
	weld.Parent = child
	child.Parent = handle.Parent
end

local builders = {}

function builders.Combat(): Tool
	local tool = Instance.new("Tool")
	tool.RequiresHandle = false
	tool.CanBeDropped = false
	tool.ToolTip = "Fighting style"
	return tool
end

function builders.Katana(): Tool
	local tool = Instance.new("Tool")
	tool.CanBeDropped = false
	tool.ToolTip = "Sword"
	-- The hand holds the hilt; the blade points along the handle's -Z (forward).
	local handle = part({
		Name = "Handle",
		Size = Vector3.new(0.3, 0.3, 1.2),
		Color = Color3.fromRGB(35, 30, 45),
		Material = Enum.Material.Fabric,
	})
	handle.Parent = tool
	attach(handle, part({
		Name = "Guard",
		Size = Vector3.new(0.75, 0.75, 0.15),
		Color = Color3.fromRGB(200, 170, 70),
		Material = Enum.Material.Metal,
	}), CFrame.new(0, 0, -0.65))
	attach(handle, part({
		Name = "Blade",
		Size = Vector3.new(0.1, 0.32, 4),
		Color = Color3.fromRGB(215, 222, 230),
		Material = Enum.Material.Metal,
		Reflectance = 0.2,
	}), CFrame.new(0, 0, -2.72))
	attach(handle, part({
		Name = "Edge",
		Size = Vector3.new(0.05, 0.08, 3.9),
		Color = Color3.fromRGB(255, 255, 255),
		Material = Enum.Material.Neon,
	}), CFrame.new(0, 0.14, -2.72))
	tool.Grip = CFrame.new(0, 0, 0.25)
	return tool
end

function Loadout.Build(key: string): Tool?
	local builder = builders[key]
	if not builder then
		warn("[Loadout] No tool builder for", key)
		return nil
	end
	local tool = builder()
	tool.Name = key
	tool:SetAttribute("Weapon", key)
	return tool
end

-- Makes sure the player has every owned weapon, in hotbar order. Tools go into StarterGear too,
-- so Roblox hands them back on every respawn.
function Loadout.Give(player: Player)
	local data = PlayerData.Get(player)
	local gear = player:FindFirstChild("StarterGear")
	if not data or not gear then
		return
	end
	local keys = {}
	for key in data.Owned do
		if Weapons[key] then
			table.insert(keys, key)
		end
	end
	table.sort(keys, function(a, b)
		return Weapons[a].Order < Weapons[b].Order
	end)
	local backpack = player:FindFirstChildOfClass("Backpack")
	for _, key in keys do
		if not gear:FindFirstChild(key) then
			local tool = Loadout.Build(key)
			if tool then
				tool.Parent = gear
				local inHand = player.Character and player.Character:FindFirstChild(key)
				if backpack and not backpack:FindFirstChild(key) and not inHand then
					tool:Clone().Parent = backpack
				end
			end
		end
	end
end

function Loadout.Init()
	PlayerData.Loaded:Connect(function(player: Player)
		player:WaitForChild("StarterGear", 10)
		Loadout.Give(player)
	end)
end

return Loadout
