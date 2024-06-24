import { ChatGPT } from "@/classes/templates/ChatGPT";

export async function POST(request: Request) {
  const { prompt } = (await request.json()) as { prompt: string };

  const response = await ChatGPT.chat(prompt);

  return new Response(JSON.stringify({ response }), {
    headers: { "Content-Type": "application/json" },
  });
}
