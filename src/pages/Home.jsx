import { useMemo, useState } from "react";

import SafetyMap from "../components/map/SafetyMap";

import RouteComparison from "../components/routing/RouteComparison";
import RouteDetails from "../components/routing/RouteDetails";
import RouteSearch from "../components/routing/RouteSearch";
import RouteStatus from "../components/routing/RouteStatus";

import SafetyBubbleCard from "../components/safety/SafetyBubbleCard";

import PageContainer from "../components/layout/PageContainer";

import {
  mockSafetyData,
  mockSafetyMarkers,
} from "../data/mockSafetyData";

const DEFAULT_ROUTES = [
  {
    id: "safe-route",
    name: "Safer Route",
    distance: "4.2 km",
    duration: "18 min",
    safetyScore: 91,
    safetyLabel: "High",
    description:
      "Balanced route with stronger safety conditions.",
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

function Home({
  routes = DEFAULT_ROUTES,
  safetyData = mockSafetyData,
  safetyMarkers = mockSafetyMarkers,
  onSearch,
  onStartJourney,
  onSOS,
}) {
  const [destination, setDestination] = useState("");
  const [routeStatus, setRouteStatus] = useState("idle");
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
    setRouteStatus("searching");

    try {
      await onSearch?.(value);

      setRouteStatus("ready");
    } catch {
      setRouteStatus("error");
    }
  };

  const handleRouteSelect = (route) => {
    setSelectedRouteId(route.id);
    setRouteStatus("ready");
  };

  const handleStartJourney = (route) => {
    onStartJourney?.(route);
    setRouteStatus("navigating");
  };

  const score =
    safetyData?.overview?.score ?? 0;

  const riskLevel =
    safetyData?.overview?.riskLevel ?? "low";

  const signalCount =
    safetyData?.overview?.signalCount ??
    safetyData?.signals?.length ??
    0;

  return (
    <PageContainer size="wide">
      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <header className="mb-5">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-blue-600">
              Safety workspace
            </p>

            <h1 className="mt-1.5 text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
              Plan a safer journey
            </h1>

            <p className="mt-1.5 max-w-xl text-xs leading-5 text-slate-500">
              Find a route, compare safety conditions, and
              stay aware throughout your journey.
            </p>
          </div>

          <div className="hidden rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[9px] font-medium text-slate-500 sm:block">
            Safety intelligence active
          </div>
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
          onClear={() => {
            setDestination("");
            setRouteStatus("idle");
          }}
          loading={routeStatus === "searching"}
        />
      </section>

      {/* =====================================================
          MAIN WORKSPACE
          ===================================================== */}

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        {/* ===================================================
            LEFT — MAP
            =================================================== */}

        <div className="min-w-0">
          <SafetyMap
            route={DEFAULT_ROUTE_POINTS}
            signals={safetyMarkers}
            onZoomIn={() => {}}
            onZoomOut={() => {}}
            onLocate={() => {}}
          />
        </div>

        {/* ===================================================
            RIGHT — INTELLIGENCE PANEL
            =================================================== */}

        <aside className="space-y-5">
          <RouteStatus status={routeStatus} />

          <SafetyBubbleCard
            score={score}
            riskLevel={riskLevel}
            signalCount={signalCount}
            title="Your Safety Bubble"
            description={
              safetyData?.overview?.description ??
              "Current area safety conditions look favorable."
            }
            onViewDetails={() => {}}
          />
        </aside>
      </div>

      {/* =====================================================
          ROUTE ANALYSIS
          ===================================================== */}

      <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <RouteComparison
          routes={routes}
          selectedRouteId={selectedRouteId}
          onRouteSelect={handleRouteSelect}
        />

        <RouteDetails
          route={selectedRoute}
          onStartJourney={handleStartJourney}
        />
      </div>

      {/* =====================================================
          MOBILE SOS ACTION
          ===================================================== */}

      <div className="h-16 lg:hidden" />

      {/* =====================================================
          DEVELOPMENT HOOK
          ===================================================== */}

      <div className="sr-only">
        {onSOS ? "SOS available" : "SOS handler unavailable"}
      </div>
    </PageContainer>
  );
}

export default Home;