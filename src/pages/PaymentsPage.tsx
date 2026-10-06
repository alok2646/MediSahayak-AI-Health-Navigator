import { useState } from 'react';
import { CreditCard, ReceiptText, ShieldCheck } from 'lucide-react';
import DemoBadge from '../components/DemoBadge';
import { useCareWorkflow } from '../context/CareWorkflowContext';
import { demoPaymentService } from '../services/careServices';
import type { InvoiceStatus } from '../types';

const statusStyle: Record<InvoiceStatus, string> = {
  Pending: 'bg-amber-50 text-amber-800',
  Paid: 'bg-emerald-50 text-emerald-700',
  Failed: 'bg-red-50 text-red-700',
  Refunded: 'bg-slate-100 text-slate-600',
};

export default function PaymentsPage() {
  const { invoices, payments, recordPayment } = useCareWorkflow();
  const [processing, setProcessing] = useState('');
  const [error, setError] = useState('');

  const pay = async (invoiceId: string, outcome: 'Paid' | 'Failed') => {
    const invoice = invoices.find((item) => item.id === invoiceId);
    if (!invoice) {
      setError('This demo invoice is unavailable. Refresh the page and try again.');
      return;
    }
    setError('');
    setProcessing(invoiceId);
    try {
      const payment = await demoPaymentService.simulatePayment(invoice, outcome);
      recordPayment(payment);
    } catch {
      setError('Demo payment could not be processed. No real transaction was made.');
    } finally {
      setProcessing('');
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><div className="flex flex-wrap items-start justify-between gap-4"><div className="flex items-start gap-4"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-700"><CreditCard size={22} /></div><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-sky-700">Payments & billing</p><h1 className="mt-2 text-3xl font-black text-slate-900">Invoices and payment history</h1><p className="mt-2 max-w-xl text-sm text-slate-600">Review demo consultation, OPD, diagnostic, and hospital service charges.</p></div></div><DemoBadge>Demo Payment</DemoBadge></div><div className="mt-5 flex items-start gap-2 rounded-xl border border-sky-100 bg-sky-50 p-4 text-sm text-slate-700"><ShieldCheck size={17} className="mt-0.5 shrink-0 text-sky-700" />No payment gateway is connected. Success/failure actions below are simulated and do not move money.</div></section>
      {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}
      <section className="grid gap-4 xl:grid-cols-2">{invoices.map((invoice) => <article key={invoice.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-start justify-between gap-3"><div className="flex items-center gap-3"><div className="rounded-xl bg-slate-100 p-2.5 text-slate-600"><ReceiptText size={18} /></div><div><div className="font-bold text-slate-900">{invoice.description}</div><div className="mt-1 text-xs text-slate-500">{invoice.id} · {invoice.createdAt} · {invoice.patientName}</div></div></div><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${statusStyle[invoice.status]}`}>{invoice.status}</span></div><div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4"><div><div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Amount due / billed</div><div className="mt-1 text-2xl font-black text-slate-900">₹{invoice.amount}</div></div>{invoice.status !== 'Paid' && <div className="flex gap-2"><button disabled={processing === invoice.id} onClick={() => void pay(invoice.id, 'Paid')} className="rounded-xl bg-sky-600 px-3 py-2.5 text-xs font-bold text-white hover:bg-sky-700 disabled:opacity-50">{processing === invoice.id ? 'Processing…' : 'Simulate success'}</button><button disabled={processing === invoice.id} onClick={() => void pay(invoice.id, 'Failed')} className="rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50">Simulate failure</button></div>}</div></article>)}</section>
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-black text-slate-900">Transaction history · Demo</h2>{payments.length ? <div className="mt-4 space-y-2">{payments.map((payment) => <div key={payment.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-50 p-3 text-sm"><div><strong>{payment.id}</strong><div className="text-xs text-slate-500">{payment.invoiceId} · {payment.method} · {payment.transactionReference}</div></div><span className="font-bold text-slate-700">₹{payment.amount} · {payment.status}</span></div>)}</div> : <p className="mt-3 text-sm text-slate-500">No demo payments have been simulated in this session.</p>}</section>
    </div>
  );
}
