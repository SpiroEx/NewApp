import { ChatGPT } from "@/classes/templates/ChatGPT";

export async function POST(request: Request) {
  const { text } = (await request.json()) as { text: string };

  const response = await ChatGPT.tts(text);

  return new Response(response, {
    headers: { "Content-Type": "audio/mpeg" },
  });
}
