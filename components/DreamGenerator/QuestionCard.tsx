"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuestionInput } from "./QuestionInput";
import { DreamResponse } from "@/types/interfaces";

interface Props {
  question: any;
  step: number;
  responses: DreamResponse;
  updateResponse: (key: keyof DreamResponse, value: any) => void;
  toggleExperience: (value: string) => void;
  handleNext: () => void;
}

export function QuestionCard({
  question,
  responses,
  updateResponse,
  toggleExperience,
  handleNext,
}: Props) {
  return (
    <Card className="bg-white/10 backdrop-blur-lg border-none text-white">
      <CardHeader>
        <CardTitle className="text-2xl">{question.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <QuestionInput
          question={question}
          responses={responses}
          updateResponse={updateResponse}
          toggleExperience={toggleExperience}
        />
        <Button
          onClick={handleNext}
          className="w-full mt-6 bg-linear-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
        >
          Continue
        </Button>
      </CardContent>
    </Card>
  );
}
