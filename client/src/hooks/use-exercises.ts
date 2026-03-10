import { useQuery, useMutation } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import type { EvaluateTranslationRequest, EvaluationResponse, Exercise } from "@shared/schema";
import { z } from "zod";

// Helper to log Zod parsing issues, useful during rapid development
function parseWithLogging<T>(schema: z.ZodSchema<T>, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[Zod Error] ${label}:`, result.error.format());
    // Fallback to raw data cast if custom schemas (like z.custom) fail over JSON
    return data as T; 
  }
  return result.data;
}

export function useExercises(level?: string) {
  return useQuery({
    queryKey: [api.exercises.list.path, level],
    queryFn: async () => {
      const url = new URL(api.exercises.list.path, window.location.origin);
      if (level) {
        url.searchParams.append("level", level);
      }
      
      const res = await fetch(url.toString(), { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch exercises");
      
      const data = await res.json();
      return parseWithLogging(api.exercises.list.responses[200], data, "exercises.list") as Exercise[];
    },
    enabled: true,
  });
}

export function useExercise(id: number) {
  return useQuery({
    queryKey: [api.exercises.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.exercises.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch exercise");
      
      const data = await res.json();
      return parseWithLogging(api.exercises.get.responses[200], data, "exercises.get") as Exercise;
    },
    enabled: !!id && !isNaN(id),
  });
}

export function useEvaluateTranslation() {
  return useMutation({
    mutationFn: async (payload: EvaluateTranslationRequest) => {
      // Validate payload before sending
      const validated = api.evaluations.create.input.parse(payload);
      
      const res = await fetch(api.evaluations.create.path, {
        method: api.evaluations.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to evaluate translation");
      }
      
      const data = await res.json();
      return parseWithLogging(api.evaluations.create.responses[200], data, "evaluations.create") as EvaluationResponse;
    },
  });
}
