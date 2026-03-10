import { pgTable, serial, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { sql } from "drizzle-orm";

export const exercises = pgTable("exercises", {
  id: serial("id").primaryKey(),
  level: varchar("level", { length: 50 }).notNull(),
  chineseText: text("chinese_text").notNull(),
  referenceEnglish: text("reference_english").notNull(),
  hints: text("hints"),
});

export const progress = pgTable("progress", {
  id: serial("id").primaryKey(),
  exerciseId: integer("exercise_id").notNull().references(() => exercises.id),
  score: integer("score").notNull(),
  userTranslation: text("user_translation").notNull(),
  completedAt: timestamp("completed_at").default(sql`CURRENT_TIMESTAMP`),
});

export const errorBook = pgTable("error_book", {
  id: serial("id").primaryKey(),
  exerciseId: integer("exercise_id").notNull().references(() => exercises.id),
  chineseText: text("chinese_text").notNull(),
  userTranslation: text("user_translation").notNull(),
  correctTranslation: text("correct_translation").notNull(),
  score: integer("score").notNull(),
  feedback: text("feedback").notNull(),
  savedAt: timestamp("saved_at").default(sql`CURRENT_TIMESTAMP`),
});

export const insertExerciseSchema = createInsertSchema(exercises).omit({ id: true });
export type Exercise = typeof exercises.$inferSelect;
export type InsertExercise = z.infer<typeof insertExerciseSchema>;

export type Progress = typeof progress.$inferSelect;
export type ErrorBookEntry = typeof errorBook.$inferSelect;

export const evaluateTranslationSchema = z.object({
  exerciseId: z.number(),
  userTranslation: z.string().min(1, "Please enter your translation"),
});

export type EvaluateTranslationRequest = z.infer<typeof evaluateTranslationSchema>;

export const evaluationResponseSchema = z.object({
  score: z.number(),
  feedback: z.string(),
  improvements: z.array(z.string()),
});

export type EvaluationResponse = z.infer<typeof evaluationResponseSchema>;
