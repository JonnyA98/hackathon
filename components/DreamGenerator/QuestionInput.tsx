"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { DreamResponse } from "@/types/interfaces";

interface QuestionInputProps {
  question: any;
  responses: DreamResponse;
  updateResponse: (key: keyof DreamResponse, value: any) => void;
  toggleExperience: (value: string) => void;
}

export function QuestionInput({
  question,
  responses,
  updateResponse,
  toggleExperience,
}: QuestionInputProps) {
  switch (question.type) {
    case "text":
      return (
        <div className="space-y-2">
          <Label htmlFor={question.key} className="text-white">
            Your Answer
          </Label>
          <Textarea
            id={question.key}
            value={responses[question.key as keyof DreamResponse] as string}
            onChange={(e) => updateResponse(question.key, e.target.value)}
            className="bg-white/20 border-white/20 text-white placeholder:text-white/50 min-h-[100px]"
            placeholder="Share your thoughts here..."
          />
          <p className="text-sm text-blue-200 mt-2">{question.description}</p>
        </div>
      );

    case "number":
      return (
        <div className="space-y-2">
          <Label htmlFor={question.key} className="text-white">
            Team Size
          </Label>
          <Input
            id={question.key}
            type="number"
            min="1"
            max="10"
            value={responses[question.key as keyof DreamResponse] as number}
            onChange={(e) =>
              updateResponse(question.key, parseInt(e.target.value))
            }
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
              {question.options?.map((option: string) => (
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
            {question.options?.map((option: string) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={option}
                  checked={responses.experience.includes(option)}
                  onCheckedChange={() => toggleExperience(option)}
                  className="border-white/50 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                />
                <Label htmlFor={option} className="text-white cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </div>
          <p className="text-sm text-blue-200 mt-2">{question.description}</p>
        </div>
      );

    default:
      return null;
  }
}
