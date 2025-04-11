"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { SuggestionCard } from "@/components/DreamGenerator/SuggestionCard";
import { SuggestionTaskCard } from "@/components/DreamGenerator/SuggestionTaskCard";
import { DreamResponse, ProjectSuggestion } from "@/types/interfaces";

export default function ProjectPage() {
  const { id } = useParams();
  const [suggestion, setSuggestion] = useState<ProjectSuggestion | null>(null);
  const [responses, setResponses] = useState<DreamResponse | null>(null);
  const [status, setStatus] = useState<"loading" | "loaded" | "not_found">(
    "loading"
  );

  // Memoize localStorage access
  const storedProject = useMemo(() => {
    if (!id) return null;
    try {
      const stored = localStorage.getItem(`suggestion-${id}`);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;

    if (storedProject?.suggestion && storedProject?.responses) {
      setSuggestion(storedProject.suggestion);
      setResponses(storedProject.responses);
      setStatus("loaded");
    } else {
      setStatus("not_found");
    }
  }, [id, storedProject]);

  if (status === "loading") {
    return <div className="text-white p-6">Loading project...</div>;
  }

  if (status === "not_found" || !suggestion || !responses) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-blue-900 to-black text-white p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Project not found</h2>
          <p className="text-blue-200 mb-6">
            We couldn't find a project matching that ID.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-2 bg-purple-600 rounded-md hover:bg-purple-700 text-white"
          >
            Back to Generator
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-black text-white p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <SuggestionCard suggestion={suggestion} responses={responses} />
        <div className="grid gap-6 md:grid-cols-3">
          {suggestion.tasks.map((task, index) => (
            <SuggestionTaskCard key={index} role={task} />
          ))}
        </div>
      </div>
    </div>
  );
}
