import { MapPin, ShieldCheck, TriangleAlert } from "lucide-react";

const defaultItems = [
  {
    label: "Your location",
    type: "location",
  },
  {
    label: "Safer route",
    type: "route",
  },
  {
    label: "Safety signal",
    type: "signal",
  },
];

function LegendIcon({ type }) {
  if (type === "location") {
    return (
      <span className="relative flex h-4 w-4 items-center justify-center">
        <span className="absolute h-4 w-4 rounded-full bg-blue-500/15" />

        <span className="relative flex h-2.5 w-2.5 items-center justify-center rounded-full border-2 border-white bg-blue-600 shadow-sm" />
      </span>
    );
  }

  if (type === "route") {
    return (
      <span className="flex w-4 items-center">
        <span className="h-[3px] w-full rounded-full bg-blue-600" />
      </span>
    );
  }

  if (type === "signal") {
    return (
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-50 text-amber-600">
        <TriangleAlert className="h-2.5 w-2.5" />
      </span>
    );
  }

  return (
    <span className="flex h-4 w-4 items-center justify-center text-slate-400">
      <MapPin className="h-3.5 w-3.5" />
    </span>
  );
}

function MapLegend({
  items = defaultItems,
  title = "Map legend",
}) {
  return (
    <div
      aria-label={title}
      className="w-fit rounded-xl border border-slate-200 bg-white/95 p-3 shadow-md shadow-slate-200/40 backdrop-blur-md"
    >
      <p className="mb-2.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400">
        {title}
      </p>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {items.map((item) => (
          <div
            key={`${item.type}-${item.label}`}
            className="flex items-center gap-2"
          >
            <LegendIcon type={item.type} />

            <span className="whitespace-nowrap text-[10px] font-medium text-slate-600">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MapLegend;