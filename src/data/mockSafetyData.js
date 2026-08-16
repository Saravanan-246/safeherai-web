/* =========================================================
   SafeHerAI — Mock Safety Data
   Demo data for UI development only.
   Replace with safetyService.js in production.
   ========================================================= */

/* =========================================================
   Safety Overview
   ========================================================= */

export const mockSafetyOverview = {
  score: 91,
  riskLevel: "low",
  status: "safe",

  title: "Your Safety Bubble",

  description:
    "Current area safety conditions look favorable.",

  signalCount: 6,

  updatedAt: "Just now",
};

/* =========================================================
   Safety Signals
   ========================================================= */

export const mockSafetySignals = [
  {
    id: "signal-001",
    type: "positive",
    title: "Well-lit area",
    description:
      "Good lighting conditions reported along the selected route.",
    location: "Main Road",
    time: "2 min ago",
  },

  {
    id: "signal-002",
    type: "positive",
    title: "Trusted activity nearby",
    description:
      "Higher activity levels detected around this area.",
    location: "Central Junction",
    time: "5 min ago",
  },

  {
    id: "signal-003",
    type: "caution",
    title: "Low activity zone",
    description:
      "Lower activity levels reported around this section of the route.",
    location: "East Street",
    time: "8 min ago",
  },

  {
    id: "signal-004",
    type: "positive",
    title: "Verified safe point",
    description:
      "A trusted safety point is available nearby.",
    location: "Community Centre",
    time: "11 min ago",
  },

  {
    id: "signal-005",
    type: "info",
    title: "Safety coverage updated",
    description:
      "Recent safety information has been incorporated into the area.",
    location: "North Avenue",
    time: "14 min ago",
  },

  {
    id: "signal-006",
    type: "positive",
    title: "Active public area",
    description:
      "The area currently shows healthy public activity.",
    location: "Market Road",
    time: "18 min ago",
  },
];

/* =========================================================
   Map Safety Markers
   ========================================================= */

export const mockSafetyMarkers = [
  {
    id: "marker-001",
    type: "safe",
    x: "63%",
    y: "31%",
    label: "Verified safe",
  },

  {
    id: "marker-002",
    type: "caution",
    x: "42%",
    y: "57%",
    label: "Safety signal",
    showLabel: true,
  },

  {
    id: "marker-003",
    type: "police",
    x: "73%",
    y: "48%",
    label: "Police assistance",
  },

  {
    id: "marker-004",
    type: "medical",
    x: "30%",
    y: "36%",
    label: "Medical assistance",
  },
];

/* =========================================================
   Safety Score Breakdown
   ========================================================= */

export const mockSafetyBreakdown = [
  {
    id: "lighting",
    label: "Area lighting",
    score: 94,
  },

  {
    id: "activity",
    label: "Public activity",
    score: 89,
  },

  {
    id: "signals",
    label: "Safety signals",
    score: 92,
  },

  {
    id: "assistance",
    label: "Emergency access",
    score: 90,
  },
];

/* =========================================================
   Combined Safety Data
   ========================================================= */

export const mockSafetyData = {
  overview: mockSafetyOverview,
  signals: mockSafetySignals,
  markers: mockSafetyMarkers,
  breakdown: mockSafetyBreakdown,
};