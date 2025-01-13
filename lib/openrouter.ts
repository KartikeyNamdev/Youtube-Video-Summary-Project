import { Type } from "lucide-react";
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
  transcript: string,
  url: string
): Promise<string> {
  // Call n8n webhook instead of direct OpenRouter API

  // const response = await fetch(process.env.N8N_WEBHOOK_URL!, {
  //   method: "POST",
  //   headers: {
  //     Authorization:
  //       "Bearer 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",
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     transcript,
  //     video_title,
  //     model: "anthropic/claude-2",
  //     max_tokens: 1000,
  //   }),
  // });
  const options = {
    method: "POST",
    headers: {
      "apy-token":
        "APY0M6t7skTFJBmi5EqMMn1bhwBxL3nAKXWafSG6tticRQRQvpNQOx1SwPMxErFsh9",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  };

  const response = await fetch(
    "https://api.apyhub.com/ai/summarize-url",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((err) => console.error(err));
  // if (!response.ok) {
  return response.data;
  // }
}
