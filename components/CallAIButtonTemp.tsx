import { callMistralChat } from "@/lib/api/call-mistral";
import { TrashIcon } from "lucide-react";
import React from "react";

export default function CallAIButtonTemp() {
  const callMe = async () => {
    const reply = await callMistralChat("What's the best hackathon idea?");

    if (reply) {
      console.log("Chat:", reply);
    } else {
      console.error("Chat response is undefined or malformed.");
    }
  };

  return (
    <button
      onClick={callMe}
      className="inline-flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-700 text-white rounded-md text-sm font-medium transition cursor-pointer"
    >
      Call AI
    </button>
  );
}
