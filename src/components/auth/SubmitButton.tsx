import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  label: string;
  loading?: boolean;
}

export function SubmitButton({ label, loading = false }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-headline-md text-on-primary shadow-[0_4px_14px_rgba(173,198,255,0.2)] transition-all duration-300 hover:bg-primary-fixed active:scale-[0.98] disabled:opacity-60"
    >
      {loading && <Loader2 size={18} className="animate-spin" />}
      {label}
    </button>
  );
}
