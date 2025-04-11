"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Rocket, Users, Clock, Brain } from "lucide-react";
import { DreamResponse, ProjectSuggestion } from "@/types/interfaces";

interface SuggestionCardProps {
  suggestion: ProjectSuggestion;
  responses: DreamResponse;
}

export function SuggestionCard({ suggestion, responses }: SuggestionCardProps) {
  return (
    <Card className="bg-white/10 backdrop-blur-lg border-none text-white mb-8">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Rocket className="text-yellow-400" />
          {suggestion.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-6">{suggestion.description}</p>

        <div className="grid gap-6">
          <div className="flex items-center gap-2 text-blue-200">
            <Users /> Team Size: {responses.teamSize} members
          </div>
          <div className="flex items-center gap-2 text-blue-200">
            <Clock /> Duration: {responses.timeframe}
          </div>
          <div className="flex items-center gap-2 text-blue-200">
            <Brain /> Tech Stack: {responses.experience.join(", ")}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
