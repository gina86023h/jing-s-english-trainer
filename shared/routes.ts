import { z } from "zod";
import { exercises, evaluateTranslationSchema, evaluationResponseSchema } from "./schema";

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  exercises: {
    list: {
      method: "GET" as const,
      path: "/api/exercises" as const,
      input: z.object({ level: z.string().optional() }).optional(),
      responses: {
        200: z.array(z.custom<typeof exercises.$inferSelect>()),
      },
    },
    get: {
      method: "GET" as const,
      path: "/api/exercises/:id" as const,
      responses: {
        200: z.custom<typeof exercises.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    }
  },
  evaluations: {
    create: {
      method: "POST" as const,
      path: "/api/evaluations" as const,
      input: evaluateTranslationSchema,
      responses: {
        200: evaluationResponseSchema,
        400: errorSchemas.validation,
        404: errorSchemas.notFound,
      },
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
