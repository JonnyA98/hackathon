"use client";
import { DreamResponse, ProjectSuggestion } from "@/types/interfaces";

export function getStoredProject(id: string | undefined | null): {
  suggestion: ProjectSuggestion | null;
  responses: DreamResponse | null;
} | null {
  if (!id) return null;

  try {
    const stored = localStorage.getItem(`suggestion-${id}`);
    if (!stored) return null;

    const parsed = JSON.parse(stored);
    return {
      suggestion: parsed.suggestion ?? null,
      responses: parsed.responses ?? null,
    };
  } catch (error) {
    console.log("Failed to parse stored project from localStorage:", error);
    return null;
  }
}
