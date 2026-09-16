type FilterBarProps = {
  items: string[];
  selected: string;
  onChange: (value: string) => void;
};

export default function FilterBar({ items, selected, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onChange(item)}
          className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
            selected === item
              ? 'border-sky-200 bg-sky-100 text-sky-800'
              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
