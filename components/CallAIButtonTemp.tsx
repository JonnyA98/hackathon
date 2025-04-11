"use client";

import { useState } from "react";
import { callMistralChat } from "@/lib/api/call-mistral";
import { ReloadIcon } from "@radix-ui/react-icons"; // Radix spinner icon

export default function CallAIButtonTemp() {
  const [loading, setLoading] = useState(false);

  const callMe = async () => {
    setLoading(true);
    const reply = await callMistralChat("What's the best hackathon idea?");
    setLoading(false);

    if (reply) {
      console.log("Chat:", reply);
    } else {
      console.error("Chat response is undefined or malformed.");
    }
  };

  return (
    <button
      onClick={callMe}
      disabled={loading}
      className="inline-flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-700 text-white rounded-md text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Thinking...
        </>
      ) : (
        "Call AI"
      )}
    </button>
  );
}
