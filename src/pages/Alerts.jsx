import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Clock3,
  ShieldAlert,
} from "lucide-react";

import Card from "../components/ui/Card";
import EmptyState from "../components/ui/EmptyState";
import StatusPill from "../components/ui/StatusPill";
import PageContainer from "../components/layout/PageContainer";

const DEFAULT_ALERTS = [
  {
    id: "alert-001",
    type: "caution",
    title: "Safety signal nearby",
    description:
      "A lower-activity area was detected along your current route.",
    location: "East Street",
    time: "2 min ago",
    status: "new",
  },
  {
    id: "alert-002",
    type: "info",
    title: "Route safety updated",
    description:
      "New safety information has been incorporated into your journey.",
    location: "Main Road",
    time: "8 min ago",
    status: "reviewed",
  },
  {
    id: "alert-003",
    type: "safe",
    title: "Verified safe point nearby",
    description:
      "A trusted assistance point is available near your route.",
    location: "Community Centre",
    time: "14 min ago",
    status: "reviewed",
  },
];

const ALERT_CONFIG = {
  caution: {
    icon: AlertTriangle,
    iconClass: "bg-amber-50 text-amber-600",
  },

  danger: {
    icon: ShieldAlert,
    iconClass: "bg-red-50 text-red-600",
  },

  info: {
    icon: Bell,
    iconClass: "bg-blue-50 text-blue-600",
  },

  safe: {
    icon: CheckCircle2,
    iconClass: "bg-emerald-50 text-emerald-600",
  },
};

function AlertItem({ alert }) {
  const config =
    ALERT_CONFIG[alert.type] ?? ALERT_CONFIG.info;

  const Icon = config.icon;

  return (
    <article className="p-4 sm:p-5">
      <div className="flex gap-3.5">
        {/* Alert icon */}

        <div
          className={[
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
            config.iconClass,
          ].join(" ")}
        >
          <Icon className="h-4 w-4" />
        </div>

        {/* Content */}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xs font-semibold text-slate-900">
                  {alert.title}
                </h3>

                {alert.status === "new" && (
                  <StatusPill status="active">
                    New
                  </StatusPill>
                )}
              </div>

              <p className="mt-1.5 text-[11px] leading-5 text-slate-500">
                {alert.description}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-1.5 text-slate-400">
              <Clock3 className="h-3 w-3" />

              <span className="font-mono text-[9px]">
                {alert.time}
              </span>
            </div>
          </div>

          {/* Location */}

          {alert.location && (
            <div className="mt-3 text-[9px] font-medium text-slate-400">
              {alert.location}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function Alerts({
  alerts = DEFAULT_ALERTS,
  loading = false,
}) {
  const validAlerts = Array.isArray(alerts)
    ? alerts.filter((alert) => alert?.id)
    : [];

  const newCount = validAlerts.filter(
    (alert) => alert.status === "new",
  ).length;

  return (
    <PageContainer size="narrow">
      {/* Page heading */}

      <header className="mb-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Bell className="h-3.5 w-3.5" />
          </div>

          <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-blue-600">
            Safety centre
          </p>
        </div>

        <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
              Alerts
            </h1>

            <p className="mt-1.5 max-w-lg text-xs leading-5 text-slate-500">
              Review safety updates and important signals from
              your journey.
            </p>
          </div>

          {newCount > 0 && (
            <StatusPill status="active">
              {newCount} new
            </StatusPill>
          )}
        </div>
      </header>

      {/* Loading */}

      {loading && (
        <Card padding="none">
          <div className="divide-y divide-slate-100">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse p-5"
              >
                <div className="flex gap-3.5">
                  <div className="h-9 w-9 rounded-xl bg-slate-100" />

                  <div className="flex-1">
                    <div className="h-3 w-40 rounded bg-slate-100" />

                    <div className="mt-2 h-2.5 w-full max-w-md rounded bg-slate-100" />

                    <div className="mt-3 h-2 w-24 rounded bg-slate-100" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Alerts */}

      {!loading && validAlerts.length > 0 && (
        <Card padding="none">
          <div className="divide-y divide-slate-100">
            {validAlerts.map((alert) => (
              <AlertItem
                key={alert.id}
                alert={alert}
              />
            ))}
          </div>
        </Card>
      )}

      {/* Empty */}

      {!loading && validAlerts.length === 0 && (
        <EmptyState
          icon={CheckCircle2}
          title="You're all caught up"
          description="There are no new safety alerts to review right now."
        />
      )}

      {/* Footer note */}

      {!loading && validAlerts.length > 0 && (
        <div className="mt-4 flex items-center justify-center gap-1.5 text-center text-[9px] text-slate-400">
          <ShieldAlert className="h-3 w-3" />

          Safety information may change as new signals become
          available.
        </div>
      )}
    </PageContainer>
  );
}

export default Alerts;