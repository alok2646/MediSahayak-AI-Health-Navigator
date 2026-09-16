export default function AffordableCarePage() {
  const sections = [
    { title: 'FREE', items: [{ name: 'Government Hospital', detail: 'Demo / verification required' }, { name: 'Community Health Camp', detail: 'Demo / verification required' }] },
    { title: 'LOW COST', items: [{ name: 'Low-cost Consultation', detail: 'Demo / verification required' }, { name: 'Clinic Subsidy', detail: 'Demo / verification required' }] },
    { title: 'GOVERNMENT', items: [{ name: 'Public Health Centre', detail: 'Demo / verification required' }, { name: 'Referral Network', detail: 'Demo / verification required' }] },
    { title: 'COMMUNITY CARE', items: [{ name: 'Community Screening', detail: 'Demo / verification required' }, { name: 'Telecare Support', detail: 'Demo / verification required' }] },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-soft">
        <h1 className="text-4xl font-black text-slate-900">Affordable Healthcare</h1>
        <p className="mt-2 text-slate-600">Explore low-cost and community-based healthcare options.</p>
      </section>

      <div className="grid gap-4 xl:grid-cols-2">
        {sections.map((section) => (
          <div key={section.title} className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-soft">
            <h2 className="mb-4 text-xl font-black uppercase tracking-[0.12em] text-slate-800">{section.title}</h2>
            <div className="space-y-3">
              {section.items.map((item) => (
                <div key={item.name} className="rounded-[22px] bg-slate-50 p-4">
                  <div className="font-bold text-slate-900">{item.name}</div>
                  <div className="mt-1 text-sm text-slate-500">{item.detail}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
