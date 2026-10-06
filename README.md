# MediSahayak

MediSahayak is an AI Health Navigator prototype that helps people understand medical reports, organize health information, discover care options, and move from a health question to an appropriate next step.

This repository contains a React frontend and a small server-side AI chat endpoint designed for local demonstration and hackathon presentation. The care-coordination workflows use in-memory mock services. All provider data, availability, fees, appointments, inventory, and report analysis are fictional demo data.

## Problem statement

Healthcare information is often fragmented and difficult to understand. People may have a laboratory report but not know what it means, which kind of provider to consult, where to find care nearby, or how to keep their records and appointments organized.

## Solution

MediSahayak combines plain-language report explanation, care navigation, provider comparison, appointment booking, medical record organization, and a health timeline in one guided experience.

The main demo journey is:

`Upload report → Understand → Find care → Compare → Book → Store`

## Key features

- AI-assisted medical report explanation using a local mock analysis service
- Important findings, parameter explanations, and questions to ask a doctor
- Suggested care category and report-to-care navigation
- Doctor finder with search, specialty, distance, fee, availability, video, and home-visit filters
- Sorting by nearest provider, lowest fee, and earliest availability
- Hospital finder with emergency, government, affordable, and availability filters
- Doctor comparison for up to three providers
- Home-visit provider discovery and request flow
- Affordable healthcare information sections
- Secure medical record vault presentation with search and category filters
- Clickable health timeline
- Appointment tabs for upcoming, completed, and cancelled visits
- Multi-step appointment booking for clinic, video, and home-visit modes
- Appointment confirmation screen with appointment ID and booking details
- Privacy, consent, AI safety, and emergency-care messaging
- Patient navigation assistant with explicit per-session consent before a message is sent to Google Gemini
- Digital OPD registration slip, printable for demonstration
- Emergency information preparation that does not notify a hospital or ambulance
- Demo invoice and payment simulation, with no real transaction
- Fictional blood-bank inventory and request workflow
- Patient-consented referral preparation and a simulated hospital referral queue
- Provider-facing hospital ERP dashboard covering demo patients, OPD, appointments, referrals, capacity, records, billing, blood bank, reports, and notifications
- Responsive desktop, tablet, and mobile layouts

## AI features

Medical report analysis remains a local mock service in `src/services/aiService.ts`. It returns a deterministic `ReportAnalysis` object containing:

- Report summary
- Important parameters and reference ranges
- Plain-language explanations
- Questions for a qualified doctor
- Suggested care category
- Safety messaging

The service is intentionally isolated so it can later be replaced by a real, privacy-reviewed AI/API integration.

The optional MediSahayak Assistant sends only the message a user chooses to submit to Google Gemini through the server-side `api/ai/chat.ts` endpoint. It does not automatically attach stored reports, appointments, or other app state. Users must provide explicit consent once per browser session and are warned not to include identifying information. The Gemini API key is read only on the server; do not expose it with a `VITE_` prefix. Without a key, the assistant reports that the service is unavailable while other modules continue to work.

The AI assistant is informational and navigation-oriented. A client-side urgent-symptom safeguard directs users to local emergency services; it is not a clinical triage system.

## Healthcare safety limitations

MediSahayak is an informational and navigation assistant. It does not:

- Provide a definitive diagnosis
- Independently prescribe medication
- Replace a qualified healthcare professional
- Replace emergency medical services
- Verify provider credentials, availability, pricing, or medical claims in this demo

Urgent or emergency symptoms should be assessed immediately by a qualified healthcare professional or local emergency service.

## Technology stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Lucide React icons
- Recharts
- Node.js server-side API support
- Google Gen AI SDK (optional assistant responses)
- Vercel serverless functions
- Oxlint

## System architecture

```text
React UI
  ├── React Router route screens
  ├── Shared layout, navigation, safety banner, and toast components
  ├── AppContext for demo appointments, timeline events, and notifications
  ├── Local mock data for doctors, hospitals, reports, and appointments
  └── Mock AI report analysis service
```

```text
React UI / React Router
  ├── Existing report, provider discovery, booking, records, and timeline modules
  ├── CareWorkflowContext for in-memory OPD, emergency, billing, blood, and referral demo state
  └── Assistant chat client (/api/ai/chat)
        ├── Vite development middleware (local development)
        └── Vercel serverless function (deployment)
              └── Gemini API (optional; GEMINI_API_KEY remains server-side)
```

There is no database, authentication service, or real hospital/payment/ambulance/blood-bank integration. Demo workflow state resets when the browser page is reloaded. The serverless in-memory request quota is best-effort and is not a substitute for production rate limiting.

## Project structure

```text
.
├── public/                  # Static SVG icons and favicon
├── src/
│   ├── components/          # Reusable UI components
│   ├── context/             # Shared app state and care-workflow demo state
│   ├── data/                # Fictional demo doctors, hospitals, reports, and workflows
│   ├── layouts/             # Main authenticated-style application shell
│   ├── pages/               # Route-level screens
│   ├── services/            # Mock analysis, chat client, and demo service adapters
│   ├── server/              # Server-only AI assistant helper
│   ├── types/               # Shared TypeScript domain types
│   ├── App.tsx              # Router and route definitions
│   ├── index.css            # Global styles and Tailwind layers
│   └── main.tsx             # React entry point
├── .env.example             # Environment placeholder documentation
├── api/ai/chat.ts           # Vercel serverless assistant endpoint
├── .gitignore
├── package.json
├── package-lock.json
├── tailwind.config.js
├── tsconfig*.json
└── vite.config.ts
```

## Installation

### Prerequisites

- Node.js 20 or newer recommended
- npm 10 or newer recommended

### Clone and install

```bash
git clone https://github.com/<your-username>/MediSahayak.git
cd MediSahayak
npm install
```

The non-AI demo workflows do not require credentials. The optional AI Assistant requires a Gemini API key for generated responses.

## Environment variables

`GEMINI_API_KEY` is optional and is used only by the server-side assistant endpoint. It is not needed to run the rest of the demo.

For local AI assistant use:

1. Copy `.env.example` to `.env.local`.
2. Replace the placeholder with a Gemini API key in `.env.local`.
3. Restart the Vite development server. The Vite server middleware loads this key on the server.
4. Never prefix the key with `VITE_`; that would expose it to browser code.
5. Keep `.env.local`, `.env`, API keys, passwords, tokens, private credentials, and database connection strings out of Git.

For Vercel, add `GEMINI_API_KEY` to the project's private Environment Variables and redeploy. Do not place a real key in `.env.example` or source files.

## Run the frontend

Start the development server:

```bash
npm run dev
```

Open the URL shown by Vite, normally:

```text
http://localhost:5173
```

Useful commands:

```bash
npm run build    # Type-check and create a production build
npm run preview  # Preview the production build locally
npm run lint     # Run Oxlint
```

## Run the backend / AI endpoint

The Vercel serverless function at `api/ai/chat.ts` serves `POST /api/ai/chat`. When running `npm run dev`, the Vite configuration provides a local development middleware for the same endpoint. The key is optional; without it, the endpoint returns a safe service-unavailable message. There is no separate backend process to start.

All other workflows use local mock services and browser state. For production, add authentication, encrypted document storage, durable consent management, provider verification, appointment persistence, audit logs, and distributed rate limiting before connecting real healthcare services.

## Screenshots

Screenshots can be added to a future `docs/screenshots/` directory and linked here. The current application can be previewed locally with `npm run dev`.

Suggested screenshots:

- Dashboard and full demo CTA
- Report analysis and next care options
- Doctor finder and filters
- Provider comparison
- Appointment confirmation
- Medical record vault
- Health timeline

## Future scope

- Secure user authentication and consent management
- Encrypted document storage and audit trails
- Real provider verification and live availability
- Location services and maps
- Production AI gateway with redaction, monitoring, and clinical safety review
- Multilingual report explanations
- Accessibility and assistive-language improvements
- Notifications and appointment reminders
- Backend persistence and clinician workflows
- Integration with approved health-data standards and systems

## Disclaimer

This project is a hackathon/demo prototype. It is not medical advice, a diagnostic system, an emergency service, or a substitute for professional healthcare. All doctors, hospitals, prices, appointment slots, availability, and report results shown in demo mode are fictional and require verification before any real-world use.

## Author

**Alok**

MediSahayak was prepared as an AI-assisted healthcare navigation prototype for the Lenovo LEAP Hackathon 2026.
