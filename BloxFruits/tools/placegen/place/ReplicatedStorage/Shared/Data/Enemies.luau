-- Enemy definitions. The enemy AI (ServerScriptService.Services.Enemy) reads these.

return {
	Bandit = {
		DisplayName = "Bandit",
		Level = 5,
		Health = 110, -- (tune)
		Damage = 9, -- per hit (tune)
		AttackRange = 5,
		AttackCooldown = 1.6,
		WalkSpeed = 14,
		AggroRadius = 40,
		LeashRadius = 90, -- gives up the chase this far from its spawn
		Exp = 20, -- per kill (tune); quests give most EXP
		Beli = 15, -- per kill (tune)
		RespawnTime = 8,
		-- Look
		SkinColor = Color3.fromRGB(234, 184, 146),
		ShirtColor = Color3.fromRGB(120, 72, 40),
		PantsColor = Color3.fromRGB(60, 50, 45),
		BandanaColor = Color3.fromRGB(170, 30, 30),
	},
}
