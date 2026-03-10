import { db } from "./db";
import { exercises } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getExercises(level?: string): Promise<typeof exercises.$inferSelect[]>;
  getExercise(id: number): Promise<typeof exercises.$inferSelect | undefined>;
  createExercise(exercise: typeof exercises.$inferInsert): Promise<typeof exercises.$inferSelect>;
}

export class DatabaseStorage implements IStorage {
  async getExercises(level?: string): Promise<typeof exercises.$inferSelect[]> {
    if (level) {
      return await db.select().from(exercises).where(eq(exercises.level, level));
    }
    return await db.select().from(exercises);
  }

  async getExercise(id: number): Promise<typeof exercises.$inferSelect | undefined> {
    const [exercise] = await db.select().from(exercises).where(eq(exercises.id, id));
    return exercise;
  }

  async createExercise(exercise: typeof exercises.$inferInsert): Promise<typeof exercises.$inferSelect> {
    const [created] = await db.insert(exercises).values(exercise).returning();
    return created;
  }
}

export const storage = new DatabaseStorage();
