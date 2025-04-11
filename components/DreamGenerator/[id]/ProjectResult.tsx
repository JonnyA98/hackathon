"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { SuggestionCard } from "../SuggestionCard";
import { SuggestionTaskCard } from "../SuggestionTaskCard";
import { DreamResponse, ProjectSuggestion } from "@/types/interfaces";

export default function ProjectResult() {
  const { id } = useParams();
  const [suggestion, setSuggestion] = useState<ProjectSuggestion | null>(null);
  const [responses, setResponses] = useState<DreamResponse | null>(null);

  useEffect(() => {
    if (!id || typeof id !== "string") return;
    const data = localStorage.getItem(`suggestion-${id}`);
    if (data) {
      const parsed = JSON.parse(data);
      setSuggestion(parsed.suggestion);
      setResponses(parsed.responses);
    }
  }, [id]);

  if (!suggestion || !responses) {
    return <div className="text-white">Loading project suggestion...</div>;
  }

  return (
    <>
      <SuggestionCard suggestion={suggestion} responses={responses} />
      <div className="grid gap-6 md:grid-cols-3">
        {suggestion.tasks.map((role, index) => (
          <SuggestionTaskCard key={index} role={role} />
        ))}
      </div>
    </>
  );
}
