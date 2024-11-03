import { pgTable, text, integer, timestamp, foreignKey } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"




export const goals = pgTable("goals", {
	id: text("id").primaryKey().notNull(),
	title: text("title").notNull(),
	desiredWeeklyFrequency: integer("desired_weekly_frequency").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const goalCompletions = pgTable("goal_completions", {
	id: text("id").primaryKey().notNull(),
	goalId: text("goal_id").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		goalCompletionsGoalIdGoalsIdFk: foreignKey({
			columns: [table.goalId],
			foreignColumns: [goals.id],
			name: "goal_completions_goal_id_goals_id_fk"
		}),
	}
});