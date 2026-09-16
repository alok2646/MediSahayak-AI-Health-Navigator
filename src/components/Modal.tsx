type ModalProps = {
  open: boolean;
  title: string;
  children: React.ReactNode;
  confirmLabel?: string;
  onClose: () => void;
  onConfirm?: () => void;
};

export default function Modal({ open, title, children, confirmLabel = 'Confirm', onClose, onConfirm }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h3 className="text-xl font-bold text-slate-900">{title}</h3>
          <button onClick={onClose} className="rounded-full bg-slate-100 px-2 py-1 text-sm text-slate-600">✕</button>
        </div>
        <div className="mb-5 text-sm text-slate-600">{children}</div>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700">Cancel</button>
          <button onClick={onConfirm ?? onClose} className="rounded-2xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-700">{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}
