--!strict
-- Progression formulas shared by server and client.
-- Values marked (ref) come from the design doc's references; (tune) are our own starting values.

local Formulas = {}

Formulas.LEVEL_CAP = 700 -- MVP cap, end of First Sea (ref: live game is 2800)
Formulas.POINTS_PER_LEVEL = 3 -- (ref)
Formulas.STAT_NAMES = { "Melee", "Defense", "Sword", "Gun", "Fruit" }
Formulas.STAT_LABELS = {
	Melee = "Melee",
	Defense = "Defense",
	Sword = "Sword",
	Gun = "Gun",
	Fruit = "Blox Fruit",
}
Formulas.STAT_HINTS = {
	Melee = "Fighting style damage and max Energy",
	Defense = "Max Health",
	Sword = "Sword damage",
	Gun = "Gun damage",
	Fruit = "Blox Fruit damage",
}

Formulas.DASH_COST = 10 -- Energy per dash (tune)
Formulas.DASH_COOLDOWN = 1.2 -- seconds (tune)
Formulas.DASH_DISTANCE = 22 -- studs (tune)

-- EXP needed to go from `level` to `level + 1` (ref).
function Formulas.ExpToNext(level: number): number
	return math.floor(2 * level ^ 2.3 + 84)
end

function Formulas.MaxHealth(level: number, defense: number): number
	return 100 + 20 * level + 25 * defense -- (tune)
end

function Formulas.MaxEnergy(level: number, melee: number): number
	return 100 + 20 * level + 25 * melee -- (tune)
end

function Formulas.Damage(base: number, statPoints: number): number
	return base * (1 + statPoints / 100) -- (tune), mastery bonus arrives in Phase 2
end

return Formulas
