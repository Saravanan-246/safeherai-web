function Card({
  children,
  className = "",
  padding = "default",
  interactive = false,
  as: Component = "section",
  ...props
}) {
  const paddings = {
    none: "",
    small: "p-3",
    default: "p-4 sm:p-5",
    large: "p-5 sm:p-6",
  };

  return (
    <Component
      className={[
        "rounded-2xl border border-slate-200 bg-white",
        "shadow-sm shadow-slate-200/20",
        paddings[padding] ?? paddings.default,
        interactive
          ? "transition hover:border-blue-200 hover:shadow-md hover:shadow-slate-200/30"
          : "",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Card;