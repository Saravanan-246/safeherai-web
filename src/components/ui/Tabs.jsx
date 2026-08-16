import { useId, useState } from "react";

function Tabs({
  items = [],
  value,
  defaultValue,
  onChange,
  className = "",
}) {
  const generatedId = useId();

  const firstValue = items[0]?.value ?? "";

  const [internalValue, setInternalValue] = useState(
    defaultValue ?? firstValue,
  );

  const activeValue = value !== undefined ? value : internalValue;

  const handleChange = (nextValue) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onChange?.(nextValue);
  };

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label="Content tabs"
        className="flex items-center gap-1 overflow-x-auto border-b border-slate-200"
      >
        {items.map((item) => {
          const active = item.value === activeValue;

          return (
            <button
              key={item.value}
              id={`${generatedId}-${item.value}`}
              type="button"
              role="tab"
              aria-selected={active}
              disabled={item.disabled}
              onClick={() => handleChange(item.value)}
              className={[
                "relative shrink-0 px-3 py-2.5",
                "text-xs font-medium transition-colors",
                "focus-visible:outline-2 focus-visible:outline-offset-[-2px]",
                "focus-visible:outline-blue-500",
                "disabled:pointer-events-none disabled:opacity-40",
                active
                  ? "text-blue-600"
                  : "text-slate-400 hover:text-slate-700",
              ].join(" ")}
            >
              {item.label}

              {active && (
                <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-blue-600" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Tabs;