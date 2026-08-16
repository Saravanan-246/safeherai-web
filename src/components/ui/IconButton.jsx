function IconButton({
  children,
  label,
  size = "default",
  variant = "default",
  disabled = false,
  className = "",
  type = "button",
  ...props
}) {
  const sizes = {
    small: "h-8 w-8",
    default: "h-9 w-9",
    large: "h-10 w-10",
  };

  const variants = {
    default:
      "border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900",

    ghost:
      "bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-900",

    blue:
      "bg-blue-50 text-blue-600 hover:bg-blue-100",

    danger:
      "bg-red-50 text-red-600 hover:bg-red-100",
  };

  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      disabled={disabled}
      className={[
        "inline-flex shrink-0 items-center justify-center rounded-lg",
        "transition-all duration-150",
        "active:scale-[0.96]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500",
        "disabled:pointer-events-none disabled:opacity-40",
        sizes[size] ?? sizes.default,
        variants[variant] ?? variants.default,
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}

export default IconButton;