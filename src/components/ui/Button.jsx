import { LoaderCircle } from "lucide-react";

function Button({
  children,
  type = "button",
  variant = "primary",
  size = "default",
  loading = false,
  disabled = false,
  fullWidth = false,
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-blue-600 text-white shadow-sm shadow-blue-600/15 hover:bg-blue-700 focus-visible:outline-blue-500",

    secondary:
      "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-950 focus-visible:outline-blue-500",

    ghost:
      "text-slate-600 hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-blue-500",

    danger:
      "bg-red-600 text-white shadow-sm shadow-red-600/15 hover:bg-red-700 focus-visible:outline-red-500",

    soft:
      "bg-blue-50 text-blue-700 hover:bg-blue-100 focus-visible:outline-blue-500",
  };

  const sizes = {
    small: "h-9 rounded-lg px-3 text-[11px]",
    default: "h-10 rounded-xl px-4 text-xs",
    large: "h-11 rounded-xl px-5 text-sm",
  };

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={[
        "inline-flex shrink-0 items-center justify-center gap-2",
        "font-semibold transition-all duration-150",
        "active:scale-[0.98]",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        sizes[size] ?? sizes.default,
        variants[variant] ?? variants.primary,
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      {...props}
    >
      {loading && (
        <LoaderCircle
          className="h-3.5 w-3.5 animate-spin"
          aria-hidden="true"
        />
      )}

      {children}
    </button>
  );
}

export default Button;