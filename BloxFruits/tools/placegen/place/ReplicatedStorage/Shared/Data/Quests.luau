-- Quest givers and quests. One active quest at a time; taking a new one replaces the old (ref).

return {
	Givers = {
		PirateStarter = {
			DisplayName = "Quest Giver",
			Quests = { "Bandits" },
		},
	},

	Quests = {
		Bandits = {
			Title = "Defeat 5 Bandits",
			Target = "Bandit", -- key in Data.Enemies
			Count = 5,
			MinLevel = 1,
			Exp = 350, -- (tune)
			Beli = 350, -- (tune)
		},
	},
}
