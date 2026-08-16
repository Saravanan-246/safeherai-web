import { Inbox } from "lucide-react";

function EmptyState({
  icon: Icon = Inbox,
  title = "Nothing here yet",
  description,
  action,
  className = "",
}) {
  return (
    <div
      className={[
        "flex min-h-[220px] flex-col items-center justify-center",
        "rounded-2xl border border-dashed border-slate-200",
        "bg-slate-50/50 px-5 py-10 text-center",
        className,
      ].join(" ")}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm">
        <Icon
          className="h-4.5 w-4.5"
          aria-hidden="true"
        />
      </div>

      <h3 className="mt-4 text-sm font-semibold tracking-tight text-slate-800">
        {title}
      </h3>

      {description && (
        <p className="mt-1.5 max-w-sm text-xs leading-5 text-slate-500">
          {description}
        </p>
      )}

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export default EmptyState;