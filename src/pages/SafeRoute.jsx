import { useMemo, useState } from "react";
import { Map, Route } from "lucide-react";

import PageContainer from "../components/layout/PageContainer";
import SafetyMap from "../components/map/SafetyMap";
import RouteComparison from "../components/routing/RouteComparison";
import RouteDetails from "../components/routing/RouteDetails";
import RouteSearch from "../components/routing/RouteSearch";
import RouteStatus from "../components/routing/RouteStatus";
import StatusPill from "../components/ui/StatusPill";

const DEFAULT_ROUTES = [
  {
    id: "safe-route",
    name: "Safer Route",
    distance: "4.2 km",
    duration: "18 min",
    safetyScore: 91,
    safetyLabel: "High",
    description:
      "Balanced route with stronger safety conditions around the journey.",
  },
  {
    id: "fast-route",
    name: "Fastest Route",
    distance: "3.7 km",
    duration: "14 min",
    safetyScore: 74,
    safetyLabel: "Moderate",
    description:
      "Shorter journey with a lower safety score.",
  },
];

const DEFAULT_ROUTE_POINTS = [
  [10, 15],
  [18, 27],
  [30, 24],
  [42, 43],
  [57, 49],
  [70, 67],
  [88, 82],
];

const DEFAULT_MARKERS = [
  {
    id: "signal-01",
    type: "safe",
    x: "63%",
    y: "31%",
    label: "Verified safe",
  },
  {
    id: "signal-02",
    type: "caution",
    x: "42%",
    y: "57%",
    label: "Safety signal",
  },
  {
    id: "police-01",
    type: "police",
    x: "73%",
    y: "48%",
    label: "Police assistance",
  },
];

function SafeRoute({
  routes = DEFAULT_ROUTES,
  routePoints = DEFAULT_ROUTE_POINTS,
  markers = DEFAULT_MARKERS,
  onSearch,
  onStartJourney,
}) {
  const [destination, setDestination] = useState("");
  const [status, setStatus] = useState("idle");
  const [selectedRouteId, setSelectedRouteId] = useState(
    routes[0]?.id ?? null,
  );

  const selectedRoute = useMemo(
    () =>
      routes.find(
        (route) => route.id === selectedRouteId,
      ) ?? null,
    [routes, selectedRouteId],
  );

  const handleSearch = async (value) => {
    setDestination(value);
    setStatus("searching");

    try {
      await onSearch?.(value);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  };

  const handleClear = () => {
    setDestination("");
    setStatus("idle");
  };

  const handleSelectRoute = (route) => {
    setSelectedRouteId(route.id);
    setStatus("ready");
  };

  const handleStartJourney = (route) => {
    onStartJourney?.(route);
    setStatus("navigating");
  };

  return (
    <PageContainer size="wide">
      {/* =====================================================
          HEADER
          ===================================================== */}

      <header className="mb-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Route className="h-3.5 w-3.5" />
              </div>

              <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-blue-600">
                Safe routing
              </p>
            </div>

            <h1 className="mt-2 text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
              Find your safer route
            </h1>

            <p className="mt-1.5 max-w-xl text-xs leading-5 text-slate-500">
              Compare available routes using journey time,
              distance, and safety conditions.
            </p>
          </div>

          <StatusPill status="active">
            Safety analysis active
          </StatusPill>
        </div>
      </header>

      {/* =====================================================
          SEARCH
          ===================================================== */}

      <section className="mb-5">
        <RouteSearch
          value={destination}
          onChange={setDestination}
          onSearch={handleSearch}
          onClear={handleClear}
          loading={status === "searching"}
        />
      </section>

      {/* =====================================================
          STATUS
          ===================================================== */}

      <section className="mb-5 max-w-2xl">
        <RouteStatus status={status} />
      </section>

      {/* =====================================================
          MASTER / DETAIL WORKSPACE
          ===================================================== */}

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        {/* Main visual */}

        <section className="min-w-0">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                Route overview
              </p>

              <h2 className="mt-1 text-sm font-semibold text-slate-900">
                Journey map
              </h2>
            </div>

            <div className="hidden items-center gap-1.5 text-[9px] text-slate-400 sm:flex">
              <Map className="h-3 w-3" />
              Live route view
            </div>
          </div>

          <SafetyMap
            route={routePoints}
            signals={markers}
            onZoomIn={() => {}}
            onZoomOut={() => {}}
            onLocate={() => {}}
          />
        </section>

        {/* Route details */}

        <aside className="min-w-0">
          <RouteDetails
            route={selectedRoute}
            onStartJourney={handleStartJourney}
          />
        </aside>
      </div>

      {/* =====================================================
          ROUTE COMPARISON
          ===================================================== */}

      <section className="mt-6">
        <RouteComparison
          routes={routes}
          selectedRouteId={selectedRouteId}
          onRouteSelect={handleSelectRoute}
        />
      </section>

      <div className="h-4" />
    </PageContainer>
  );
}

export default SafeRoute;