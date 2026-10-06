export type AssistantMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

type ChatResponse = { reply?: unknown; error?: unknown };

const SERVICE_UNAVAILABLE = 'AI service is temporarily unavailable. You can continue using the healthcare navigation features.';

export async function sendAssistantMessage(message: string): Promise<string> {
  let response: Response;
  try {
    response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
  } catch {
    throw new Error(SERVICE_UNAVAILABLE);
  }

  let payload: ChatResponse;
  try {
    payload = await response.json() as ChatResponse;
  } catch {
    throw new Error(SERVICE_UNAVAILABLE);
  }
  if (!response.ok) {
    throw new Error(typeof payload.error === 'string' ? payload.error : SERVICE_UNAVAILABLE);
  }
  if (typeof payload.reply !== 'string' || !payload.reply.trim()) {
    throw new Error(SERVICE_UNAVAILABLE);
  }
  return payload.reply;
}
