function StatusPill({
  children,
  status = "neutral",
  dot = true,
  className = "",
}) {
  const statuses = {
    neutral: {
      wrapper: "bg-slate-100 text-slate-600",
      dot: "bg-slate-400",
    },

    active: {
      wrapper: "bg-blue-50 text-blue-700",
      dot: "bg-blue-500",
    },

    success: {
      wrapper: "bg-emerald-50 text-emerald-700",
      dot: "bg-emerald-500",
    },

    warning: {
      wrapper: "bg-amber-50 text-amber-700",
      dot: "bg-amber-500",
    },

    danger: {
      wrapper: "bg-red-50 text-red-700",
      dot: "bg-red-500",
    },
  };

  const config = statuses[status] ?? statuses.neutral;

  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1",
        "text-[10px] font-semibold",
        config.wrapper,
        className,
      ].join(" ")}
    >
      {dot && (
        <span
          className={[
            "h-1.5 w-1.5 rounded-full",
            config.dot,
          ].join(" ")}
          aria-hidden="true"
        />
      )}

      {children}
    </span>
  );
}

export default StatusPill;