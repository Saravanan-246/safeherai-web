import { GitCompareArrows, Route } from "lucide-react";
import RouteCard from "./RouteCard";

const defaultRoutes = [
  {
    id: "safe-route",
    name: "Safer Route",
    distance: "4.2 km",
    duration: "18 min",
    safetyScore: 91,
    safetyLabel: "High",
    description: "Balanced route with stronger safety conditions.",
  },
  {
    id: "fast-route",
    name: "Fastest Route",
    distance: "3.7 km",
    duration: "14 min",
    safetyScore: 74,
    safetyLabel: "Moderate",
    description: "Shorter journey with a lower safety score.",
  },
];

function RouteComparison({
  routes = defaultRoutes,
  selectedRouteId,
  onRouteSelect,
}) {
  const validRoutes = Array.isArray(routes)
    ? routes.filter((route) => route?.id)
    : [];

  if (validRoutes.length === 0) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400">
            <Route className="h-4.5 w-4.5" />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-slate-900">
            No routes available
          </h3>

          <p className="mt-1.5 max-w-xs text-xs leading-5 text-slate-500">
            Routes will appear here once a destination has been analyzed.
          </p>
        </div>
      </section>
    );
  }

  const recommendedRoute = [...validRoutes].sort(
    (a, b) => (b.safetyScore ?? 0) - (a.safetyScore ?? 0),
  )[0];

  return (
    <section
      aria-label="Route comparison"
      className="w-full"
    >
      {/* Section heading */}

      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <GitCompareArrows className="h-4 w-4 text-blue-600" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-600">
              Route analysis
            </p>
          </div>

          <h2 className="mt-2 text-base font-semibold tracking-tight text-slate-950">
            Compare your routes
          </h2>

          <p className="mt-1 text-[11px] leading-5 text-slate-500">
            Choose the route that best fits your journey.
          </p>
        </div>

        <span className="hidden rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-medium text-slate-500 sm:block">
          {validRoutes.length} routes
        </span>
      </div>

      {/* Route cards */}

      <div className="mt-5 grid gap-3 lg:grid-cols-2">
        {validRoutes.map((route) => (
          <RouteCard
            key={route.id}
            route={route}
            selected={selectedRouteId === route.id}
            recommended={route.id === recommendedRoute.id}
            onSelect={onRouteSelect}
          />
        ))}
      </div>
    </section>
  );
}

export default RouteComparison;