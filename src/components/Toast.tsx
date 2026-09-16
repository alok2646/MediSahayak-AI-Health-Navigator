type ToastProps = {
  visible: boolean;
  message: string;
  onClose: () => void;
};

export default function Toast({ visible, message, onClose }: ToastProps) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-2xl">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span>{message}</span>
        <button onClick={onClose} className="ml-2 text-slate-300 hover:text-white">✕</button>
      </div>
    </div>
  );
}
