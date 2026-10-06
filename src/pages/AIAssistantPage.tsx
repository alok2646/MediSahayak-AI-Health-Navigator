import { useState, type FormEvent } from 'react';
import { ArrowRight, Bot, LoaderCircle, Send, ShieldAlert, Sparkles, UserRound } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DemoBadge from '../components/DemoBadge';
import { sendAssistantMessage, type AssistantMessage } from '../services/aiAssistantService';

const SAFETY_NOTICE = 'This AI assistant provides informational and navigation support and does not provide a definitive diagnosis, prescribe medication independently, or replace a qualified healthcare professional.';
const urgentPattern = /\b(chest pain|chest pressure|can't breathe|cannot breathe|difficulty breathing|trouble breathing|severe bleeding|unconscious|passed out|stroke|face drooping|seizure|severe allergic reaction|anaphylaxis|suicid(?:al|e)|overdose)\b/i;
const assistantRoutes = new Set([
  '/reports',
  '/medical-records',
  '/doctors',
  '/hospitals',
  '/appointments',
  '/opd',
  '/emergency',
  '/home-visit',
  '/affordable-care',
  '/referrals',
]);
const navigationActions = [
  ['Understand a report', '/reports'],
  ['Find care', '/doctors'],
  ['Book appointment', '/appointments'],
  ['Emergency assistance', '/emergency'],
];

function renderAssistantContent(content: string) {
  const contentPattern = /\[([^\]]+)\]\((\/[a-z-]+)\)|\*\*([^*]+)\*\*/g;
  const parts = [];
  let position = 0;

  for (const match of content.matchAll(contentPattern)) {
    const [markdown, label, route, boldText] = match;
    const index = match.index ?? 0;
    if (route && !assistantRoutes.has(route)) continue;
    if (index > position) parts.push(content.slice(position, index));
    parts.push(route
      ? <Link key={`link-${index}`} to={route} className="font-semibold text-sky-700 underline decoration-sky-300 underline-offset-2 hover:text-sky-900">{label}</Link>
      : <strong key={`bold-${index}`} className="font-semibold text-slate-900">{boldText}</strong>);
    position = index + markdown.length;
  }
  if (position < content.length) parts.push(content.slice(position));
  return parts;
}

export default function AIAssistantPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 'assistant-welcome',
      role: 'assistant',
      content: 'Hello. I can help you navigate MediSahayak, understand general health terminology, prepare questions for a clinician, and find the right product module. What would you like help with?',
    },
  ]);
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(() => sessionStorage.getItem('medisahayak-ai-consent') === 'yes');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const content = message.trim();
    if (!content || sending) return;

    setError('');
    const userMessage: AssistantMessage = { id: crypto.randomUUID(), role: 'user', content };

    if (urgentPattern.test(content)) {
      setMessage('');
      setMessages((current) => [...current, userMessage, {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Your message may describe an urgent situation that needs professional assessment. I cannot assess or diagnose it here. If this is happening now, contact your local emergency services or go to the nearest emergency department immediately. If it will not delay care, [open Emergency Assistance](/emergency) to prepare information; this does not notify a hospital or ambulance.',
      }]);
      return;
    }

    if (!consent) {
      setError('Please review and accept the data-sharing notice before sending a message.');
      return;
    }

    setMessage('');
    setMessages((current) => [...current, userMessage]);
    setSending(true);
    try {
      const reply = await sendAssistantMessage(content);
      setMessages((current) => [...current, { id: crypto.randomUUID(), role: 'assistant', content: reply }]);
    } catch (requestError) {
      const safeMessage = requestError instanceof Error
        ? requestError.message
        : 'AI service is temporarily unavailable. You can continue using the healthcare navigation features.';
      setMessages((current) => [...current, { id: crypto.randomUUID(), role: 'assistant', content: safeMessage }]);
    } finally {
      setSending(false);
    }
  };

  const grantConsent = (checked: boolean) => {
    setConsent(checked);
    if (checked) {
      sessionStorage.setItem('medisahayak-ai-consent', 'yes');
      setError('');
    } else {
      sessionStorage.removeItem('medisahayak-ai-consent');
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-700"><Bot size={23} /></div>
            <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-sky-700">Patient navigation assistant</p><h1 className="mt-2 text-3xl font-black text-slate-900">Ask MediSahayak</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Get help understanding terminology and finding the right part of MediSahayak. The assistant uses only the message you choose to send, not your stored records.</p></div>
          </div>
          <DemoBadge>AI-generated information</DemoBadge>
        </div>
        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-slate-700"><ShieldAlert className="mr-2 inline text-amber-700" size={17} />{SAFETY_NOTICE}</div>
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><div className="flex items-center gap-2 text-sm font-bold text-slate-900"><Sparkles size={17} className="text-sky-600" /> MediSahayak Assistant</div><span className="text-xs text-slate-500">Informational support</span></div>
        <div className="max-h-[440px] min-h-72 space-y-4 overflow-y-auto bg-slate-50/70 p-4 sm:p-6" aria-live="polite">
          {messages.map((item) => <div key={item.id} className={`flex gap-3 ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {item.role === 'assistant' && <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700"><Bot size={16} /></div>}
            <div className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 ${item.role === 'user' ? 'bg-[#0f2a43] text-white' : 'border border-slate-200 bg-white text-slate-700'}`}>{item.role === 'assistant' ? renderAssistantContent(item.content) : item.content}</div>
            {item.role === 'user' && <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-200 text-slate-600"><UserRound size={16} /></div>}
          </div>)}
          {sending && <div className="flex items-center gap-2 text-sm text-slate-500"><LoaderCircle size={16} className="animate-spin" />Preparing an informational response…</div>}
        </div>
        <div className="border-t border-slate-100 p-4 sm:p-5">
          {!consent && <label className="mb-4 flex cursor-pointer items-start gap-3 rounded-xl border border-sky-100 bg-sky-50 p-3 text-xs leading-5 text-slate-700"><input type="checkbox" checked={consent} onChange={(event) => grantConsent(event.target.checked)} className="mt-1 accent-sky-700" /><span><strong className="text-slate-900">One-time session consent:</strong> When you send a message, its text is sent to Google Gemini through MediSahayak's server to generate a reply. Do not include your name, contact details, patient ID, or other identifying information. You can withdraw consent by unchecking this box later in this session.</span></label>}
          {consent && <label className="mb-3 flex cursor-pointer items-center gap-2 text-xs text-slate-500"><input type="checkbox" checked={consent} onChange={(event) => grantConsent(event.target.checked)} className="accent-sky-700" /> Gemini message sharing consent is active for this session.</label>}
          {error && <p role="alert" className="mb-3 text-sm font-medium text-red-700">{error}</p>}
          <form onSubmit={sendMessage} className="flex gap-2">
            <input value={message} onChange={(event) => setMessage(event.target.value)} maxLength={4000} aria-label="Message the MediSahayak assistant" placeholder="Ask about MediSahayak or general health terminology…" className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-300" />
            <button type="submit" disabled={sending || !message.trim()} aria-label="Send message" className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-3 text-sm font-bold text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"><Send size={16} /><span className="hidden sm:inline">Send</span></button>
          </form>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {navigationActions.map(([label, route]) => <button key={route} onClick={() => navigate(route)} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 text-left text-sm font-bold text-slate-800 shadow-sm hover:border-sky-200 hover:text-sky-700"><span>{label}</span><ArrowRight size={16} /></button>)}
        {location.pathname !== '/assistant' && <div className="text-xs text-slate-400">Current area: {location.pathname}</div>}
      </section>
      <p className="text-center text-xs text-slate-500">Demo listings may be fictional. Verify availability and fees directly with providers.</p>
    </div>
  );
}
