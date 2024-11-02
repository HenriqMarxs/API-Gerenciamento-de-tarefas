import { relations } from "drizzle-orm/relations";
import { goals, goalCompletions } from "./schema";

export const goalCompletionsRelations = relations(goalCompletions, ({one}) => ({
	goal: one(goals, {
		fields: [goalCompletions.goalId],
		references: [goals.id]
	}),
}));

export const goalsRelations = relations(goals, ({many}) => ({
	goalCompletions: many(goalCompletions),
}));