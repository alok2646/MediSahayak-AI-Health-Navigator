import { ApiError, GoogleGenAI } from '@google/genai';

const MAX_MESSAGE_LENGTH = 4000;
const MODEL = 'gemini-3.5-flash-lite';
const SYSTEM_INSTRUCTIONS = `You are MediSahayak, a patient-facing healthcare navigation assistant. Help users understand user-provided report text, terminology, and MediSahayak's care-navigation workflows. Do not act as a clinician.

For each message, identify the main intent (report understanding, doctor search, hospital search, appointment, emergency, OPD registration, referral, medical terminology, or general health information) and tailor a concise, empathetic response. Do not show an intent label unless useful to the user.

For substantive non-emergency health or report questions, use these short headings:
**What I understand**
**In simple terms**
**Discuss with a healthcare professional**
**Suggested next step in MediSahayak**
Adapt or omit headings for greetings and simple navigation requests. Explain only details the user actually provided; never invent report values, reference ranges, findings, history, doctors, hospitals, fees, availability, or appointments. Explain that a report term or flagged result is not, by itself, a diagnosis. If the user has not supplied report information, invite them to share only the relevant text if they choose, or upload the report at [Medical Reports](/reports). Do not solicit names, contact details, patient IDs, or identifying information. Never automatically request or attach records, profile data, appointments, or other app state.

Provide informational and navigation support only. Never diagnose, prescribe medicines or dosages, or make autonomous clinical decisions. Do not claim to replace a qualified healthcare professional. When a care category can reasonably be suggested from the user's stated need, frame it as an optional navigation suggestion, not a clinical decision, and recommend confirming with a clinician.

If a message may describe an emergency, do not analyze, diagnose, or continue routine Q&A. Start by clearly advising immediate care: contact local emergency services or go to the nearest emergency department now. Keep this brief and link [Emergency Assistance](/emergency) only as an optional way to prepare information; it must not delay seeking care. Never imply that MediSahayak has contacted a hospital or ambulance.

Use clickable MediSahayak links when relevant: [Medical Reports](/reports), [Medical Records](/medical-records), [Find a Doctor](/doctors), [Find a Hospital](/hospitals), [Appointments](/appointments), [Digital OPD](/opd), [Emergency Assistance](/emergency), [Home Visits](/home-visit), [Affordable Care](/affordable-care), and [Referrals](/referrals). Listings and workflow data are demo-only and must be verified; never present demo providers, prices, slots, or services as real.`;

export class AssistantServiceError extends Error {
  readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'AssistantServiceError';
  }
}

export function validateAssistantMessage(value: unknown): string {
  if (typeof value !== 'string' || !value.trim()) {
    throw new AssistantServiceError('Enter a message to continue.', 400);
  }
  const message = value.trim();
  if (message.length > MAX_MESSAGE_LENGTH) {
    throw new AssistantServiceError('Keep your message under 4,000 characters.', 413);
  }
  return message;
}

export async function generateAssistantReply(message: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new AssistantServiceError(
      'AI service is temporarily unavailable. You can continue using the healthcare navigation features.',
      503,
    );
  }

  try {
    const client = new GoogleGenAI({ apiKey, httpOptions: { timeout: 20_000 } });
    const response = await client.models.generateContent({
      model: MODEL,
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTIONS,
        maxOutputTokens: 650,
        temperature: 0.2,
      },
    });
    const reply = response.text?.trim();
    if (!reply) {
      throw new AssistantServiceError(
        'AI service is temporarily unavailable. You can continue using the healthcare navigation features.',
        502,
      );
    }
    return reply;
  } catch (error) {
    if (error instanceof AssistantServiceError) throw error;
    if (error instanceof ApiError && error.status === 429) {
      console.error('MediSahayak Gemini request was rate limited.');
      throw new AssistantServiceError(
        'The AI assistant is temporarily busy. Please wait a moment and try again.',
        429,
      );
    }
    if (error instanceof ApiError && error.status === 401) {
      console.error('MediSahayak Gemini rejected its server-side credentials (HTTP 401).');
    } else if (error instanceof ApiError && error.status === 403) {
      console.error('MediSahayak Gemini access is denied for the configured project (HTTP 403).');
    } else if (error instanceof ApiError) {
      console.error(`MediSahayak Gemini request failed with status ${error.status}.`);
    } else {
      console.error(`MediSahayak Gemini request failed (${error instanceof Error ? error.name : 'unknown error'}).`);
    }
    throw new AssistantServiceError(
      'AI service is temporarily unavailable. You can continue using the healthcare navigation features.',
      503,
    );
  }
}

const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT = 12;
const requestWindows = new Map<string, { count: number; startedAt: number }>();

export function consumeAssistantQuota(clientId: string, now = Date.now()): boolean {
  const current = requestWindows.get(clientId);
  if (!current || now - current.startedAt >= RATE_WINDOW_MS) {
    requestWindows.set(clientId, { count: 1, startedAt: now });
    return true;
  }
  if (current.count >= RATE_LIMIT) return false;
  current.count += 1;
  return true;
}
