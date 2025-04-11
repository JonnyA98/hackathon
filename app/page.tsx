"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Stars } from "lucide-react";

import { DreamResponse, ProjectSuggestion } from "@/types/interfaces";
import { QuestionCard } from "@/components/DreamGenerator/QuestionCard";
import { SuggestionCard } from "@/components/DreamGenerator/SuggestionCard";
import { SuggestionTaskCard } from "@/components/DreamGenerator/SuggestionTaskCard";
import { questions } from "@/lib/static/questions";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import SavedProjects from "@/components/DreamGenerator/SavedProjects";
import CallAIButtonTemp from "@/components/CallAIButtonTemp";

export default function Home() {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState<DreamResponse>({
    passion: "",
    challenge: "",
    impact: "",
    teamSize: 0,
    timeframe: "",
    experience: [],
  });
  const [suggestion, setSuggestion] = useState<ProjectSuggestion | null>(null);

  const router = useRouter();

  const updateResponse = (key: keyof DreamResponse, value: any) => {
    setResponses((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleExperience = (value: string) => {
    setResponses((prev) => ({
      ...prev,
      experience: prev.experience.includes(value)
        ? prev.experience.filter((item) => item !== value)
        : [...prev.experience, value],
    }));
  };

  const generateSuggestion = () => {
    const id = uuidv4(); // or generate a slug if you prefer

    const suggestion: ProjectSuggestion = {
      title: "ImpactHub",
      description: `A platform that combines ${
        responses.passion
      } with solutions for ${responses.challenge}, aiming to ${
        responses.impact
      }. This project will leverage ${responses.experience.join(
        ", "
      )} to create meaningful impact while being achievable within ${
        responses.timeframe
      }.`,
      tasks: [
        {
          role: "Frontend Developer",
          tasks: [
            "Create responsive user interface",
            "Implement interactive features",
            "Design user dashboard",
            "Integrate real-time updates",
          ],
        },
        {
          role: "Backend Developer",
          tasks: [
            "Set up API architecture",
            "Implement data models",
            "Create authentication system",
            "Optimize performance",
          ],
        },
        {
          role:
            responses.teamSize > 2 ? "UI/UX Designer" : "Full Stack Developer",
          tasks:
            responses.teamSize > 2
              ? [
                  "Design user flows",
                  "Create wireframes",
                  "Develop brand identity",
                  "Conduct user testing",
                ]
              : [
                  "Handle deployment",
                  "Implement remaining features",
                  "Fix bugs",
                  "Write documentation",
                ],
        },
      ],
    };

    localStorage.setItem(
      `suggestion-${id}`,
      JSON.stringify({ suggestion, responses })
    );
    router.push(`/project/${id}`);
  };

  const handleNext = () => {
    if (step === questions.length - 1) {
      generateSuggestion();
    }
    setStep(step + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-2">
              <Sparkles className="text-yellow-400" />
              Dream Hackathon Generator
              <Stars className="text-yellow-400" />
            </h1>
            <CallAIButtonTemp />
            <p className="text-lg text-blue-200">
              Turn your passions into impactful projects
            </p>
          </div>

          {step < questions.length && (
            <QuestionCard
              question={questions[step]}
              step={step}
              responses={responses}
              updateResponse={updateResponse}
              toggleExperience={toggleExperience}
              handleNext={handleNext}
            />
          )}

          {step >= questions.length && suggestion && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <SuggestionCard suggestion={suggestion} responses={responses} />
              </motion.div>

              <div className="grid gap-6 md:grid-cols-3">
                {suggestion.tasks.map((role, index) => (
                  <SuggestionTaskCard key={index} role={role} />
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
      <SavedProjects />
    </div>
  );
}
