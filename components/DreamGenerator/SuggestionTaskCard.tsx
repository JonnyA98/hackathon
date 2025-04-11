"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Role {
  role: string;
  tasks: string[];
}

interface SuggestionTaskCardProps {
  role: Role;
}

export function SuggestionTaskCard({ role }: SuggestionTaskCardProps) {
  return (
    <Card className="bg-white/10 backdrop-blur-lg border-none text-white">
      <CardHeader>
        <CardTitle className="text-xl">{role.role}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-4 space-y-2">
          {role.tasks.map((task, taskIndex) => (
            <li key={taskIndex} className="text-blue-200">
              {task}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
