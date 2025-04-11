"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Stars, Rocket, Users, Brain, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

interface DreamResponse {
  passion: string;
  challenge: string;
  impact: string;
  teamSize: number;
  timeframe: string;
  experience: string[];
}

interface ProjectSuggestion {
  title: string;
  description: string;
  tasks: {
    role: string;
    tasks: string[];
  }[];
}

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

  const questions = [
    {
      question: "What activities or topics make you lose track of time?",
      description: "Think about what naturally draws your attention and excitement. It could be anything from gaming to solving puzzles to helping others.",
      type: "text",
      key: "passion",
    },
    {
      question: "What's a problem or challenge you've personally experienced or observed?",
      description: "This could be something that frustrates you, a difficulty you've faced, or an issue you see others struggling with.",
      type: "text",
      key: "challenge",
    },
    {
      question: "If you could create something to make the world better, what would it be?",
      description: "Don't worry about feasibility - dream big! What kind of positive change would you like to see?",
      type: "text",
      key: "impact",
    },
    {
      question: "How many people are in your hackathon team?",
      description: "This helps us divide tasks appropriately for your team size.",
      type: "number",
      key: "teamSize",
    },
    {
      question: "What's your hackathon timeframe?",
      description: "We'll scope the project to fit your available time.",
      type: "select",
      options: ["24 hours", "48 hours", "72 hours"],
      key: "timeframe",
    },
    {
      question: "What technologies is your team comfortable with?",
      description: "Select all that apply - this helps us suggest appropriate technical solutions.",
      type: "multiselect",
      options: ["React", "Node.js", "Python", "Machine Learning", "Mobile Dev", "UI/UX", "AR/VR", "Data Science"],
      key: "experience",
    },
  ];

  const generateSuggestion = () => {
    // Generate a project based on the user's responses
    const suggestion: ProjectSuggestion = {
      title: "ImpactHub",
      description: `A platform that combines ${responses.passion} with solutions for ${responses.challenge}, 
                   aiming to ${responses.impact}. This project will leverage ${responses.experience.join(", ")} 
                   to create meaningful impact while being achievable within ${responses.timeframe}.`,
      tasks: [
        {
          role: "Frontend Developer",
          tasks: [
            "Create responsive user interface",
            "Implement interactive features",
            "Design user dashboard",
            "Integrate real-time updates"
          ]
        },
        {
          role: "Backend Developer",
          tasks: [
            "Set up API architecture",
            "Implement data models",
            "Create authentication system",
            "Optimize performance"
          ]
        },
        {
          role: responses.teamSize > 2 ? "UI/UX Designer" : "Full Stack Developer",
          tasks: responses.teamSize > 2 ? [
            "Design user flows",
            "Create wireframes",
            "Develop brand identity",
            "Conduct user testing"
          ] : [
            "Handle deployment",
            "Implement remaining features",
            "Fix bugs",
            "Write documentation"
          ]
        }
      ]
    };
    setSuggestion(suggestion);
  };

  const handleNext = () => {
    if (step === questions.length - 1) {
      generateSuggestion();
    }
    setStep(step + 1);
  };

  const updateResponse = (key: keyof DreamResponse, value: any) => {
    setResponses(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleExperience = (value: string) => {
    setResponses(prev => ({
      ...prev,
      experience: prev.experience.includes(value)
        ? prev.experience.filter(item => item !== value)
        : [...prev.experience, value]
    }));
  };

  const renderQuestionInput = () => {
    const question = questions[step];
    
    switch (question.type) {
      case "text":
        return (
          <div className="space-y-2">
            <Label htmlFor={question.key} className="text-white">Your Answer</Label>
            <Textarea
              id={question.key}
              value={responses[question.key as keyof DreamResponse] as string}
              onChange={(e) => updateResponse(question.key as keyof DreamResponse, e.target.value)}
              className="bg-white/20 border-white/20 text-white placeholder:text-white/50 min-h-[100px]"
              placeholder="Share your thoughts here..."
            />
            <p className="text-sm text-blue-200 mt-2">{question.description}</p>
          </div>
        );
      
      case "number":
        return (
          <div className="space-y-2">
            <Label htmlFor={question.key} className="text-white">Team Size</Label>
            <Input
              id={question.key}
              type="number"
              min="1"
              max="10"
              value={responses[question.key as keyof DreamResponse] as number}
              onChange={(e) => updateResponse(question.key as keyof DreamResponse, parseInt(e.target.value))}
              className="bg-white/20 border-white/20 text-white placeholder:text-white/50"
            />
            <p className="text-sm text-blue-200 mt-2">{question.description}</p>
          </div>
        );
      
      case "select":
        return (
          <div className="space-y-2">
            <Label className="text-white">Select Duration</Label>
            <Select
              value={responses.timeframe}
              onValueChange={(value) => updateResponse("timeframe", value)}
            >
              <SelectTrigger className="bg-white/20 border-white/20 text-white">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                {question.options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-blue-200 mt-2">{question.description}</p>
          </div>
        );
      
      case "multiselect":
        return (
          <div className="space-y-4">
            <Label className="text-white">Select Technologies</Label>
            <div className="grid grid-cols-2 gap-4">
              {question.options.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={option}
                    checked={responses.experience.includes(option)}
                    onCheckedChange={() => toggleExperience(option)}
                    className="border-white/50 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                  />
                  <Label
                    htmlFor={option}
                    className="text-white cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
            <p className="text-sm text-blue-200 mt-2">{question.description}</p>
          </div>
        );
    }
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
            <p className="text-lg text-blue-200">Turn your passions into impactful projects</p>
          </div>

          {step < questions.length && (
            <Card className="bg-white/10 backdrop-blur-lg border-none text-white">
              <CardHeader>
                <CardTitle className="text-2xl">{questions[step].question}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {renderQuestionInput()}
                <Button 
                  onClick={handleNext}
                  className="w-full mt-6 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                >
                  Continue
                </Button>
              </CardContent>
            </Card>
          )}

          {step >= questions.length && suggestion && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
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

              <div className="grid gap-6 md:grid-cols-3">
                {suggestion.tasks.map((role, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-lg border-none text-white">
                    <CardHeader>
                      <CardTitle className="text-xl">{role.role}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-4 space-y-2">
                        {role.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="text-blue-200">{task}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}