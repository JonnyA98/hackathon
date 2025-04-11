"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ProjectSuggestion, DreamResponse } from "@/types/interfaces";

interface SavedProject {
  id: string;
  suggestion: ProjectSuggestion;
  responses: DreamResponse;
}

export default function SavedProjects() {
  const [projects, setProjects] = useState<SavedProject[]>([]);

  useEffect(() => {
    const foundProjects: SavedProject[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith("suggestion-")) continue;

      try {
        const raw = localStorage.getItem(key);
        if (!raw) continue;

        const parsed = JSON.parse(raw);
        if (parsed.suggestion && parsed.responses) {
          foundProjects.push({
            id: key.replace("suggestion-", ""),
            suggestion: parsed.suggestion,
            responses: parsed.responses,
          });
        }
      } catch (error) {
        console.error(`Failed to parse ${key}:`, error);
      }
    }

    setProjects(foundProjects);
  }, []);

  if (projects.length === 0) {
    return <p className="text-white mt-6">No saved projects found.</p>;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-white mb-4">Saved Projects</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            href={`/project/${project.id}`}
            key={project.id}
            className="block bg-white/5 border border-white/10 p-4 rounded-lg hover:bg-white/10 transition"
          >
            <h3 className="text-xl font-semibold text-purple-300 mb-2">
              {project.suggestion.title}
            </h3>
            <p className="text-sm text-white/80 line-clamp-3">
              {project.suggestion.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
