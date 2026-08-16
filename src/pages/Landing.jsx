import {
  ArrowUpRight,
  MapPin,
  ShieldCheck,
  Siren,
  Users,
} from "lucide-react";

const features = [
  {
    number: "01",
    icon: ShieldCheck,
    title: "Dynamic Safe Routing",
    text: "Choose routes with safety intelligence built around your journey.",
  },
  {
    number: "02",
    icon: Users,
    title: "Trusted Community Signals",
    text: "Stay aware with live safety updates from people and trusted sources.",
  },
  {
    number: "03",
    icon: Siren,
    title: "Rapid Emergency Response",
    text: "Get essential emergency assistance when every second matters.",
  },
];

function Landing() {
  return (
    <main className="min-h-screen bg-white text-slate-950 selection:bg-blue-100">
      {/* =====================================================
          NAVIGATION
          ===================================================== */}

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6">
          {/* Brand */}
          <a
            href="/"
            aria-label="SafeHerAI home"
            className="flex items-center gap-2.5"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 shadow-sm shadow-blue-600/15">
              <ShieldCheck
                className="h-4 w-4 text-white"
                strokeWidth={2.2}
              />
            </span>

            <div className="leading-none">
              <span className="block text-sm font-semibold tracking-tight text-slate-950">
                SafeHerAI
              </span>

              <span className="mt-1 hidden text-[9px] font-medium uppercase tracking-[0.14em] text-slate-400 sm:block">
                Safety Intelligence
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-2 sm:flex">
            <a
              href="#features"
              className="rounded-lg px-3 py-2 text-xs font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-950"
            >
              Features
            </a>

            <a
              href="#product"
              className="rounded-lg px-3 py-2 text-xs font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-950"
            >
              Product
            </a>

            <a
              href="/home"
              className="ml-1 inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-blue-600/15 transition hover:bg-blue-700 active:scale-[0.98]"
            >
              Open App
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </nav>

          {/* Mobile CTA */}
          <a
            href="/home"
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2.5 text-xs font-semibold text-white shadow-sm shadow-blue-600/15 transition hover:bg-blue-700 active:scale-[0.98] sm:hidden"
          >
            Open App
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      {/* =====================================================
          HERO
          ===================================================== */}

      <section id="product" className="border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            {/* Hero content */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                Proactive Safety Intelligence
              </div>

              <h1 className="mt-6 text-5xl font-semibold leading-[0.98] tracking-[-0.065em] text-slate-950 sm:text-6xl lg:text-[4.5rem]">
                Safer journeys.
                <span className="mt-1 block">
                  Smarter <span className="text-blue-600">decisions.</span>
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-[15px] leading-7 text-slate-500">
                SafeHerAI brings safer routing, trusted safety signals, and rapid emergency access together in one focused journey experience.
              </p>

              {/* Actions */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/home"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm shadow-blue-600/15 transition hover:bg-blue-700 active:scale-[0.98]"
                >
                  Start a Safe Journey
                  <ArrowUpRight className="h-4 w-4" />
                </a>

                <a
                  href="#features"
                  className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-[0.98]"
                >
                  Explore Features
                </a>
              </div>

              {/* Trust indicators */}
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-blue-600" />
                  Real GPS
                </span>

                <span
                  aria-hidden="true"
                  className="h-1 w-1 rounded-full bg-slate-300"
                />

                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
                  Safety-first
                </span>
              </div>
            </div>

            {/* =================================================
                PRODUCT PREVIEW
                ================================================= */}

            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-10 -z-10 bg-slate-100/80 blur-3xl"
              />

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_80px_-35px_rgba(15,23,42,0.25)]">
                {/* Browser bar */}
                <div className="flex h-11 items-center justify-between border-b border-slate-200 px-4">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-slate-200" />
                    <span className="h-2 w-2 rounded-full bg-slate-200" />
                    <span className="h-2 w-2 rounded-full bg-slate-200" />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="font-mono text-[9px] font-semibold tracking-wide text-slate-600">
                      SAFEHERAI / LIVE
                    </span>
                  </div>
                </div>

                {/* Map */}
                <div className="relative h-[330px] overflow-hidden bg-slate-100 sm:h-[390px]">
                  {/* Map roads */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-75"
                  >
                    <div className="absolute left-[18%] top-[-10%] h-[130%] w-10 rotate-[24deg] bg-white" />
                    <div className="absolute left-[53%] top-[-10%] h-[130%] w-7 rotate-[-27deg] bg-white" />
                    <div className="absolute left-[-10%] top-[42%] h-8 w-[120%] rotate-[-7deg] bg-white" />
                    <div className="absolute left-[-10%] top-[70%] h-7 w-[120%] rotate-[12deg] bg-white" />
                    <div className="absolute left-[-10%] top-[22%] h-px w-[120%] rotate-[4deg] bg-slate-200" />
                    <div className="absolute left-[-10%] top-[86%] h-px w-[120%] rotate-[-3deg] bg-slate-200" />
                  </div>

                  {/* Route */}
                  <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 600 390"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M105 322 C150 280 148 253 205 240 C260 226 238 186 300 164 C362 141 354 101 435 65"
                      fill="none"
                      stroke="#dbeafe"
                      strokeWidth="13"
                      strokeLinecap="round"
                    />
                    <path
                      d="M105 322 C150 280 148 253 205 240 C260 226 238 186 300 164 C362 141 354 101 435 65"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="4.5"
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Current location */}
                  <div className="absolute bottom-[55px] left-[13%]">
                    <span
                      aria-hidden="true"
                      className="absolute -inset-3 rounded-full bg-blue-500/10"
                    />
                    <span className="relative flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-white bg-blue-600 shadow-lg shadow-blue-600/20">
                      <MapPin className="h-4 w-4 text-white" />
                    </span>
                  </div>

                  {/* Destination */}
                  <div className="absolute right-[15%] top-[48px] flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-white bg-slate-900 shadow-md">
                    <MapPin className="h-3.5 w-3.5 text-white" />
                  </div>

                  {/* Journey status */}
                  <div className="absolute left-4 top-4 rounded-xl border border-white/80 bg-white/95 px-3.5 py-3 shadow-lg backdrop-blur-md">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
                        <ShieldCheck className="h-4 w-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-400">Journey status</p>
                        <p className="mt-0.5 text-xs font-semibold text-slate-900">
                          Safe route selected
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Route summary */}
                  <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/80 bg-white/95 p-4 shadow-xl backdrop-blur-md">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                          Recommended route
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">
                          Safer Route
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold tracking-tight text-blue-600">
                          18 min
                        </p>
                        <p className="font-mono text-[10px] text-slate-400">
                          4.2 km
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                      <span className="text-[10px] text-slate-400">
                        Safety score
                      </span>
                      <span className="rounded-full bg-emerald-50 px-2 py-1 font-mono text-[9px] font-medium text-emerald-700">
                        91 / 100 · SAFE
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURES
          ===================================================== */}

      <section id="features" className="border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20">
          <div className="mb-10 max-w-xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-600">
              Core capabilities
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Safety intelligence for the journey ahead.
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Three focused layers working together around every journey.
            </p>
          </div>

          <div className="grid border-y border-slate-200 md:grid-cols-3 md:divide-x md:divide-slate-200">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <article
                  key={feature.number}
                  className="group border-b border-slate-200 px-1 py-7 last:border-b-0 md:border-b-0 md:px-7 md:py-8 first:md:pl-0 last:md:pr-0"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="font-mono text-[9px] text-slate-300">
                      {feature.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-sm font-semibold tracking-tight text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {feature.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA & FOOTER
          ===================================================== */}

      <section>
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20">
          <div className="flex flex-col justify-between gap-8 rounded-2xl bg-blue-600 p-7 sm:p-10 md:flex-row md:items-center">
            <div className="max-w-xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-100">
                SafeHerAI
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                Make every journey a safer one.
              </h2>
              <p className="mt-3 text-sm leading-6 text-blue-100">
                Proactive safety intelligence for every journey.
              </p>
            </div>

            <a
              href="/home"
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 active:scale-[0.98]"
            >
              Start a Safe Journey
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <footer className="mt-12 flex flex-col justify-between gap-2 border-t border-slate-200 pt-6 text-xs text-slate-400 sm:flex-row">
            <span className="font-semibold text-slate-600">SafeHerAI</span>
            <span>Proactive Safety Intelligence for Every Journey</span>
          </footer>
        </div>
      </section>
    </main>
  );
}

export default Landing;