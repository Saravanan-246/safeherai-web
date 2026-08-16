function Spinner({
  size = "default",
  label = "Loading",
  className = "",
}) {
  const sizes = {
    small: "h-3.5 w-3.5 border-2",
    default: "h-5 w-5 border-2",
    large: "h-7 w-7 border-[3px]",
  };

  return (
    <span
      role="status"
      aria-label={label}
      className={[
        "inline-block animate-spin rounded-full",
        "border-slate-200 border-t-blue-600",
        sizes[size] ?? sizes.default,
        className,
      ].join(" ")}
    />
  );
}

export default Spinner;