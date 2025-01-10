import { env } from "process";
import { z } from "zod";
const openRouterResponseSchema = z.object({
  choices: z.array(
    z.object({
      message: z.object({
        content: z.string(),
      }),
    })
  ),
});

export async function generateSummaryWithOpenRouter(
  transcript: string
): Promise<string> {
  // Call n8n webhook instead of direct OpenRouter API
  const response = await fetch(process.env.N8N_WEBHOOK_URL!, {
    method: "POST",
    headers: {
      Authorization: "Bearer ",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      transcript,
      model: "anthropic/claude-2",
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate summary");
  }

  const data = await response.json();
  return data.summary;
}
