function Badge({
  children,
  variant = "default",
  size = "default",
  className = "",
}) {
  const variants = {
    default: "border-slate-200 bg-slate-50 text-slate-600",
    blue: "border-blue-100 bg-blue-50 text-blue-700",
    success: "border-emerald-100 bg-emerald-50 text-emerald-700",
    warning: "border-amber-100 bg-amber-50 text-amber-700",
    danger: "border-red-100 bg-red-50 text-red-700",
  };

  const sizes = {
    small: "px-2 py-0.5 text-[9px]",
    default: "px-2.5 py-1 text-[10px]",
  };

  return (
    <span
      className={[
        "inline-flex items-center rounded-full border font-semibold",
        sizes[size] ?? sizes.default,
        variants[variant] ?? variants.default,
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}

export default Badge;