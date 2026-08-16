import { MapPin, Search, X } from "lucide-react";
import { useId, useState } from "react";

function RouteSearch({
  value = "",
  placeholder = "Where do you want to go?",
  onChange,
  onSearch,
  onClear,
  loading = false,
  disabled = false,
}) {
  const [focused, setFocused] = useState(false);
  const inputId = useId();

  const hasValue = value.trim().length > 0;
  const isDisabled = disabled || loading;

  const handleSubmit = (event) => {
    event.preventDefault();

    const destination = value.trim();

    if (!destination || isDisabled) {
      return;
    }

    onSearch?.(destination);
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className={[
        "w-full rounded-full border bg-white px-2",
        "transition-[border-color,box-shadow] duration-200",
        focused
          ? "border-blue-300 shadow-[0_2px_12px_rgba(37,99,235,0.08)]"
          : "border-slate-200 shadow-[0_1px_6px_rgba(15,23,42,0.07)]",
      ].join(" ")}
    >
      <div className="flex h-14 items-center gap-2">
        {/* Location */}

        <div className="ml-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-blue-600">
          <MapPin
            className="h-[18px] w-[18px]"
            strokeWidth={2}
          />
        </div>

        {/* Input */}

        <div className="min-w-0 flex-1">
          <label
            htmlFor={inputId}
            className="sr-only"
          >
            Destination
          </label>

          <input
            id={inputId}
            type="text"
            value={value}
            onChange={(event) =>
              onChange?.(event.target.value)
            }
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            autoComplete="off"
            spellCheck="false"
            disabled={isDisabled}
            className="block w-full border-0 bg-transparent px-1 py-2 text-sm font-medium text-slate-800 outline-none ring-0 placeholder:text-slate-400 focus:border-0 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        {/* Clear */}

        {hasValue && !loading && (
          <button
            type="button"
            onClick={onClear}
            disabled={disabled}
            aria-label="Clear destination"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 active:scale-[0.96]"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {/* Search */}

        <button
          type="submit"
          disabled={!hasValue || isDisabled}
          aria-label="Search route"
          className={[
            "mr-0.5 flex h-10 shrink-0 items-center justify-center rounded-full",
            "px-3.5 transition-all duration-150 active:scale-[0.97]",
            "disabled:cursor-not-allowed",
            hasValue && !isDisabled
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-slate-100 text-slate-400",
          ].join(" ")}
        >
          {loading ? (
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
            />
          ) : (
            <>
              <Search
                className="h-4 w-4"
                strokeWidth={2}
              />

              <span className="ml-2 hidden text-xs font-semibold sm:inline">
                Search
              </span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default RouteSearch;