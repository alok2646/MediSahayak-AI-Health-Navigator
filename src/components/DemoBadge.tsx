type DemoBadgeProps = { children?: string; tone?: 'blue' | 'amber' | 'red' };

const toneStyles = {
  blue: 'bg-sky-50 text-sky-700 ring-sky-100',
  amber: 'bg-amber-50 text-amber-800 ring-amber-100',
  red: 'bg-red-50 text-red-700 ring-red-100',
};

export default function DemoBadge({ children = 'Demo Data', tone = 'amber' }: DemoBadgeProps) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ring-1 ${toneStyles[tone]}`}>{children}</span>;
}
