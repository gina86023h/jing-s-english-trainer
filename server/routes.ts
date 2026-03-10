import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import OpenAI from "openai";
import { evaluateTranslationSchema } from "@shared/schema";
import { db } from "./db";
import { progress, errorBook, exercises } from "@shared/schema";
import { eq } from "drizzle-orm";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

async function seedDatabase() {
  const existingItems = await storage.getExercises();
  if (existingItems.length === 0) {
    await storage.createExercise({
      level: "KET",
      chineseText: "你好，我叫李华。很高兴见到你。",
      referenceEnglish: "Hello, my name is Li Hua. Nice to meet you.",
      hints: "Use 'Nice to meet you' for the greeting.",
    });
    await storage.createExercise({
      level: "PET",
      chineseText: "虽然今天下雨，但我们还是决定去公园散步。",
      referenceEnglish: "Although it was raining today, we still decided to go for a walk in the park.",
      hints: "Consider using 'Although' or 'Even though'.",
    });
    await storage.createExercise({
      level: "FCE",
      chineseText: "由于交通拥堵，我错过了早上的第一班火车，这让我感到非常沮丧。",
      referenceEnglish: "Due to traffic congestion, I missed the first train in the morning, which made me feel very frustrated.",
      hints: "Try using 'Due to' or 'Because of' for the reason.",
    });
    await storage.createExercise({
      level: "CAE",
      chineseText: "不可否认的是，人工智能的发展不仅改变了我们的工作方式，也深刻地影响了我们的生活方式。",
      referenceEnglish: "It is undeniable that the development of artificial intelligence has not only changed the way we work but also profoundly influenced our way of life.",
      hints: "Use 'not only... but also' structure.",
    });
    await storage.createExercise({
      level: "CPE",
      chineseText: "无论结果如何，我们都必须坚持不懈地追求卓越，因为在这个竞争激烈的时代，停滞不前就等于倒退。",
      referenceEnglish: "Regardless of the outcome, we must persistently pursue excellence, for in this fiercely competitive era, stagnation is tantamount to regression.",
      hints: "Consider advanced vocabulary like 'persistently', 'stagnation', 'tantamount'.",
    });
    await storage.createExercise({
      level: "IELTS",
      chineseText: "许多人认为政府应该在环境保护方面发挥更大的作用，而另一些人则认为个人责任更为重要。",
      referenceEnglish: "Many people believe that the government should play a larger role in environmental protection, while others argue that individual responsibility is more important.",
      hints: "This is a common Task 2 essay prompt style.",
    });
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  seedDatabase().catch(console.error);

  app.get(api.exercises.list.path, async (req, res) => {
    try {
      const level = req.query.level as string | undefined;
      const exercisesList = await storage.getExercises(level);
      res.json(exercisesList);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(api.exercises.get.path, async (req, res) => {
    try {
      const exercise = await storage.getExercise(Number(req.params.id));
      if (!exercise) {
        return res.status(404).json({ message: "Exercise not found" });
      }
      res.json(exercise);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(api.evaluations.create.path, async (req, res) => {
    try {
      const input = evaluateTranslationSchema.parse(req.body);
      const exercise = await storage.getExercise(input.exerciseId);
      
      if (!exercise) {
        return res.status(404).json({ message: "Exercise not found" });
      }

      const prompt = `
      You are an expert English teacher evaluating a translation exercise.
      Level: ${exercise.level}
      Original Chinese: ${exercise.chineseText}
      Reference English: ${exercise.referenceEnglish}
      Student's Translation: ${input.userTranslation}
      
      Evaluate the student's translation. Return ONLY a valid JSON object with the following structure:
      {
        "score": number between 0 and 100 representing the quality,
        "feedback": "A short, encouraging paragraph of feedback (in Chinese)",
        "improvements": ["specific improvement 1", "specific improvement 2"] (in Chinese)
      }
      Make sure your response is purely the JSON object without markdown wrappers or anything else.
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are a helpful JSON-only output assistant." },
          { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" }
      });

      const resultContent = response.choices[0].message.content || "{}";
      const evaluation = JSON.parse(resultContent);
      
      // Save to progress table
      await db.insert(progress).values({
        exerciseId: input.exerciseId,
        score: evaluation.score,
        userTranslation: input.userTranslation,
      });
      
      // Save to error book if score is low
      if (evaluation.score < 70) {
        await db.insert(errorBook).values({
          exerciseId: input.exerciseId,
          chineseText: exercise.chineseText,
          userTranslation: input.userTranslation,
          correctTranslation: exercise.referenceEnglish,
          score: evaluation.score,
          feedback: evaluation.feedback,
        });
      }
      
      res.json(evaluation);

    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: error.errors[0].message,
          field: error.errors[0].path.join('.'),
        });
      }
      console.error("Evaluation error:", error);
      res.status(500).json({ message: "Internal server error during evaluation" });
    }
  });

  // Get progress
  app.get("/api/progress", async (req, res) => {
    try {
      const allProgress = await db.select().from(progress).orderBy(progress.completedAt);
      res.json(allProgress);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch progress" });
    }
  });

  // Get error book
  app.get("/api/error-book", async (req, res) => {
    try {
      const errors = await db.select().from(errorBook).orderBy(errorBook.savedAt);
      res.json(errors);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch error book" });
    }
  });

  // Delete error book entry
  app.delete("/api/error-book/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      await db.delete(errorBook).where(eq(errorBook.id, id));
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to delete entry" });
    }
  });

  return httpServer;
}
