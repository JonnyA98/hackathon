import { Mistral } from "@mistralai/mistralai";

const client = new Mistral({
  apiKey: process.env.NEXT_PUBLIC_MISTRAL_API_KEY!,
});
/**
 * Call Mistral AI with a single user message string.
 *
 * @param message - The user's prompt message.
 * @returns The AI response content as a string, or null on error.
 */
export async function callMistralChat(message: string): Promise<string | null> {
  try {
    const response = await client.chat.complete({
      model: "mistral-large-latest",
      messages: [{ role: "user", content: message }],
    });

    const reply = response.choices?.[0]?.message?.content;
    return typeof reply === "string" ? reply : null;
  } catch (error) {
    console.error("Mistral API error:", error);
    return null;
  }
}
