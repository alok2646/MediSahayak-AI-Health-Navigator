import react from '@vitejs/plugin-react'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { resolve } from 'node:path'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import {
  AssistantServiceError,
  consumeAssistantQuota,
  generateAssistantReply,
  validateAssistantMessage,
} from './src/server/aiAssistant.js'

async function readJsonBody(request: IncomingMessage): Promise<unknown> {
  const chunks: Uint8Array[] = [];
  let size = 0;
  for await (const chunk of request) {
    const bytes = typeof chunk === 'string' ? Buffer.from(chunk) : chunk;
    size += bytes.byteLength;
    if (size > 8192) throw new AssistantServiceError('Request body is too large.', 413);
    chunks.push(bytes);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    throw new AssistantServiceError('Send a valid JSON request.', 400);
  }
}

function localAssistantApi(): Plugin {
  return {
    name: 'medisahayak-local-assistant-api',
    configureServer(server) {
      server.middlewares.use('/api/ai/chat', async (request, response, next) => {
        if (request.method !== 'POST') {
          response.setHeader('Allow', 'POST');
          response.writeHead(405, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify({ error: 'Only POST requests are supported.' }));
          return;
        }

        const clientId = request.socket.remoteAddress ?? 'local';
        if (!consumeAssistantQuota(clientId)) {
          response.writeHead(429, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify({ error: 'Too many messages. Please wait a few minutes and try again.' }));
          return;
        }

        try {
          const body = await readJsonBody(request) as { message?: unknown };
          const message = validateAssistantMessage(body.message);
          const reply = await generateAssistantReply(message);
          sendJson(response, 200, { reply });
        } catch (error) {
          if (error instanceof AssistantServiceError) {
            sendJson(response, error.statusCode, { error: error.message });
            return;
          }
          next(error);
        }
      })
    },
  }
}

function sendJson(response: ServerResponse, status: number, payload: Record<string, string>) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  })
  response.end(JSON.stringify(payload))
}

export default defineConfig(({ mode }) => {
  const rootEnv = loadEnv(mode, process.cwd(), '')
  const sourceEnv = loadEnv(mode, resolve(process.cwd(), 'src'), '')
  const assistantApiKey = process.env.GEMINI_API_KEY ?? rootEnv.GEMINI_API_KEY ?? sourceEnv.GEMINI_API_KEY
  if (!process.env.GEMINI_API_KEY && assistantApiKey) {
    process.env.GEMINI_API_KEY = assistantApiKey
  }
  return {
    plugins: [react(), localAssistantApi()],
  }
})
