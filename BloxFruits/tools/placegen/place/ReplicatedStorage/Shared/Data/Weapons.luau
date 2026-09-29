-- Weapon definitions. Adding a weapon should be a data-only change where possible.
--
-- M1: the basic click combo. Moves: Z/X/C/V/F skills.
-- Move shapes:
--   "Box"    hit everything in a box in front of the user (Range long, Width wide)
--   "Radius" hit everything within Radius of the user
--   "Dash"   dash forward Dash studs and hit everything along the path
-- Mastery is the mastery needed to unlock the move (mastery gains arrive in Phase 2).

return {
	Combat = {
		DisplayName = "Combat",
		Category = "Fighting Style",
		Stat = "Melee",
		Order = 1,
		Swing = "Punch",
		M1 = {
			Damage = 11,
			Range = 6,
			Width = 6,
			Cooldown = 0.3,
			ComboLength = 4,
			ComboEndCooldown = 0.7,
			FinisherMultiplier = 1.6,
			Knockback = 35,
		},
		Moves = {
			Z = {
				Name = "Heavy Punch",
				Shape = "Box",
				Damage = 35,
				Range = 8,
				Width = 7,
				Cooldown = 6,
				Energy = 15,
				Mastery = 0,
				Knockback = 70,
				Effect = "Shockwave",
				Color = Color3.fromRGB(255, 230, 170),
			},
			X = {
				Name = "Ground Slam",
				Shape = "Radius",
				Damage = 28,
				Radius = 12,
				Cooldown = 10,
				Energy = 25,
				Mastery = 0,
				Knockback = 50,
				Effect = "Shockwave",
				Color = Color3.fromRGB(255, 200, 120),
			},
		},
	},

	Katana = {
		DisplayName = "Katana",
		Category = "Sword",
		Stat = "Sword",
		Order = 3,
		Swing = "Slash",
		Price = 1000, -- (ref) Starter Sword Dealer
		M1 = {
			Damage = 15,
			Range = 8,
			Width = 7,
			Cooldown = 0.36,
			ComboLength = 4,
			ComboEndCooldown = 0.8,
			FinisherMultiplier = 1.5,
			Knockback = 30,
		},
		Moves = {
			Z = {
				Name = "Flash Cut",
				Shape = "Dash",
				Damage = 45,
				Dash = 24,
				Width = 7,
				Cooldown = 7,
				Energy = 20,
				Mastery = 0,
				Knockback = 40,
				Effect = "Streak",
				Color = Color3.fromRGB(200, 230, 255),
			},
			X = {
				Name = "Whirlwind",
				Shape = "Radius",
				Damage = 40,
				Radius = 13,
				Cooldown = 11,
				Energy = 30,
				Mastery = 0,
				Knockback = 55,
				Effect = "Shockwave",
				Color = Color3.fromRGB(180, 220, 255),
			},
		},
	},
}
