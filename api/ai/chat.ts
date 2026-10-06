import type { IncomingMessage, ServerResponse } from 'node:http';
import {
  AssistantServiceError,
  consumeAssistantQuota,
  generateAssistantReply,
  validateAssistantMessage,
} from '../../src/server/aiAssistant';

type ChatRequest = IncomingMessage & { body?: unknown; query?: Record<string, string | string[]> };

function respond(response: ServerResponse, status: number, payload: Record<string, string>) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  });
  response.end(JSON.stringify(payload));
}

export default async function handler(request: ChatRequest, response: ServerResponse) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    respond(response, 405, { error: 'Only POST requests are supported.' });
    return;
  }

  const forwardedFor = request.headers['x-forwarded-for'];
  const clientId = typeof forwardedFor === 'string'
    ? forwardedFor.split(',')[0].trim()
    : request.socket.remoteAddress ?? 'unknown';
  if (!consumeAssistantQuota(clientId)) {
    respond(response, 429, { error: 'Too many messages. Please wait a few minutes and try again.' });
    return;
  }

  try {
    const body = request.body && typeof request.body === 'object'
      ? request.body as { message?: unknown }
      : {};
    const message = validateAssistantMessage(body.message);
    const reply = await generateAssistantReply(message);
    respond(response, 200, { reply });
  } catch (error) {
    const failure = error instanceof AssistantServiceError
      ? error
      : new AssistantServiceError(
        'AI service is temporarily unavailable. You can continue using the healthcare navigation features.',
        503,
      );
    respond(response, failure.statusCode, { error: failure.message });
  }
}
