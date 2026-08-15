import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface TextFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  placeholder?: string;
  icon: LucideIcon;
  onChange: (value: string) => void;
  required?: boolean;
}

export function TextField({
  id,
  label,
  type = "text",
  value,
  placeholder,
  icon: Icon,
  onChange,
  required = true,
}: TextFieldProps) {
  const [revealed, setRevealed] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && revealed ? "text" : type;

  return (
    <div className="group space-y-2">
      <label
        htmlFor={id}
        className="block text-label-sm text-on-surface-variant transition-colors group-focus-within:text-primary"
      >
        {label}
      </label>
      <div className="relative">
        <Icon
          size={20}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 transition-colors group-focus-within:text-primary"
        />
        <input
          id={id}
          type={inputType}
          value={value}
          required={required}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-outline-variant/50 bg-surface-lowest/60 py-3 pl-12 pr-12 text-body-md text-on-surface placeholder:text-on-surface-variant/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setRevealed((v) => !v)}
            aria-label={revealed ? "Hide password" : "Show password"}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors hover:text-on-surface"
          >
            {revealed ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
}
