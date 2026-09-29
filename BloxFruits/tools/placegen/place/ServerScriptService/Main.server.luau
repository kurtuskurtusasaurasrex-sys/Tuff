-- Server entry point. Services live in ServerScriptService.Services; each has an Init().
-- PlayerData.Start() runs last so every service is listening before the first profile loads.

local Services = script.Parent:WaitForChild("Services")

local PlayerData = require(Services.PlayerData)
local Progression = require(Services.Progression)
local Loadout = require(Services.Loadout)
local Quest = require(Services.Quest)
local Shop = require(Services.Shop)
local Enemy = require(Services.Enemy)
local Combat = require(Services.Combat)
local World = require(Services.World)

Progression.Init()
Loadout.Init()
Quest.Init()
Shop.Init()
Enemy.Init()
Combat.Init()
World.Init()
PlayerData.Start()
