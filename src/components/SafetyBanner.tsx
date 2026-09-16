export default function SafetyBanner() {
  return (
    <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50/80 px-5 py-4 text-sm text-slate-700 shadow-sm">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p className="font-semibold text-slate-800">MediSahayak is an AI healthcare assistant, not a replacement for a qualified healthcare professional.</p>
        <div className="flex items-center gap-2 text-xs font-medium text-amber-700">
          <span className="rounded-full bg-amber-200/60 px-2 py-1">AI Safety</span>
        </div>
      </div>
      <div className="mt-3 grid gap-2 text-xs md:grid-cols-2">
        <p>✓ Explain • ✓ Organize • ✓ Search • ✓ Compare • ✓ Navigate</p>
        <p>✗ Definitively diagnose • ✗ Independently prescribe • ✗ Replace emergency medical care</p>
      </div>
      <p className="mt-3 text-xs text-slate-600">Please contact your local emergency medical service or visit the nearest emergency department for urgent medical problems.</p>
    </div>
  );
}
