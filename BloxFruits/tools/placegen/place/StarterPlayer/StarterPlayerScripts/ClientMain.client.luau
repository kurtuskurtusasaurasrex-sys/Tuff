-- Client entry point. Waits for the server to load this player's profile, then starts the
-- controllers in StarterPlayerScripts.Controllers.

local Players = game:GetService("Players")
local StarterGui = game:GetService("StarterGui")

local Controllers = script.Parent:WaitForChild("Controllers")
local HUD = require(Controllers.HUD)
local Input = require(Controllers.Input)
local Menus = require(Controllers.Menus)
local VFX = require(Controllers.VFX)

local player = Players.LocalPlayer

-- Our HUD draws Health; hide the default one.
pcall(function()
	StarterGui:SetCoreGuiEnabled(Enum.CoreGuiType.Health, false)
end)

VFX.Init()

if not player:GetAttribute("DataLoaded") then
	player:GetAttributeChangedSignal("DataLoaded"):Wait()
end

HUD.Init({ OpenStats = Menus.OpenStats })
Menus.Init()
Input.Init()
