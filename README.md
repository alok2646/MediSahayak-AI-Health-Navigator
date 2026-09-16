# MediSahayak

MediSahayak is an AI Health Navigator prototype that helps people understand medical reports, organize health information, discover care options, and move from a health question to an appropriate next step.

This repository contains a frontend-only demo application designed for local demonstration and hackathon presentation. All provider data, availability, fees, appointments, and report analysis are fictional demo data.

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
- Responsive desktop, tablet, and mobile layouts

## AI features

The current prototype uses `src/services/aiService.ts` as a mock AI service. It returns a deterministic `ReportAnalysis` object containing:

- Report summary
- Important parameters and reference ranges
- Plain-language explanations
- Questions for a qualified doctor
- Suggested care category
- Safety messaging

The service is intentionally isolated so it can later be replaced by a real, privacy-reviewed AI/API integration.

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

There is currently no backend, database, authentication service, or external AI provider in this repository. The application runs entirely in the browser with local mock state.

## Project structure

```text
.
├── public/                  # Static SVG icons and favicon
├── src/
│   ├── components/          # Reusable UI components
│   ├── context/             # Shared application state
│   ├── data/                # Fictional demo doctors, hospitals, reports, appointments
│   ├── layouts/             # Main authenticated-style application shell
│   ├── pages/               # Route-level screens
│   ├── services/            # Mock AI analysis service
│   ├── types/               # Shared TypeScript domain types
│   ├── App.tsx              # Router and route definitions
│   ├── index.css            # Global styles and Tailwind layers
│   └── main.tsx             # React entry point
├── .env.example             # Environment placeholder documentation
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

The current demo does not require any API keys or environment variables.

## Environment variables

No environment variables are required for the current demo mode.

If real APIs are added later:

1. Copy `.env.example` to `.env.local`.
2. Add local development values only.
3. Never commit `.env`, `.env.local`, API keys, passwords, tokens, private credentials, or database connection strings.
4. Only expose browser-safe Vite variables using the `VITE_` prefix.

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

## Run the backend

There is no backend in the current repository. The prototype uses local data and browser state so the complete demo can run without external services.

For a production version, a backend could provide authentication, encrypted document storage, consent management, provider verification, appointment persistence, audit logs, and a secure AI gateway.

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
