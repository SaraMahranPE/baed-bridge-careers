// Vercel Edge Function — keeps the OpenRouter/DeepSeek API key server-only.
// Never rename OPENROUTER_API_KEY with a VITE_ prefix; that would inline it
// into the client bundle and expose it publicly.
export const config = { runtime: "edge" };

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "deepseek/deepseek-chat";

function jsonResponse(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return jsonResponse({ error: { message: "Method not allowed" } }, 405);
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return jsonResponse(
      { error: { message: "Server misconfiguration: OPENROUTER_API_KEY is not set." } },
      500
    );
  }

  let prompt: string;
  try {
    const body = await req.json();
    prompt = body?.contents?.[0]?.parts?.[0]?.text;
    if (!prompt || typeof prompt !== "string") {
      return jsonResponse(
        { error: { message: "Invalid request body. Expected { contents: [{ parts: [{ text }] }] }." } },
        400
      );
    }
  } catch {
    return jsonResponse({ error: { message: "Request body must be valid JSON." } }, 400);
  }

  let upstream: Response;
  try {
    upstream = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://baedcontent.com",
        "X-Title": "Baed Connect - Career Match",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "user", content: prompt }],
      }),
    });
  } catch (err) {
    return jsonResponse(
      { error: { message: `Could not reach OpenRouter: ${(err as Error)?.message || "network error"}` } },
      502
    );
  }

  let data: any;
  try {
    data = await upstream.json();
  } catch {
    return jsonResponse({ error: { message: "OpenRouter returned an invalid response." } }, 502);
  }

  if (!upstream.ok) {
    return jsonResponse(
      { error: { message: data?.error?.message || `OpenRouter error: ${upstream.status}` } },
      upstream.status
    );
  }

  const text = data?.choices?.[0]?.message?.content;
  if (!text) {
    return jsonResponse({ error: { message: "No response content from DeepSeek." } }, 502);
  }

  // Wrap in the response shape CareerMatch.tsx already parses
  // (data.candidates[0].content.parts[0].text) so its logic stays unchanged.
  return jsonResponse({ candidates: [{ content: { parts: [{ text }] } }] }, 200);
}
