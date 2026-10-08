/**
 * Cited market statistics used across the site (homepage, Why Kenya).
 * Every entry must carry a verifiable source. Remove an entry rather than
 * publish an unsourced figure.
 */

export type MarketFact = {
  id: string;
  value: string;
  label: string;
  detail?: string;
  period?: string;
  sourceName: string;
  sourceUrl?: string;
  lastVerified: string; // YYYY-MM-DD
};

export const marketFacts: MarketFact[] = [
  {
    id: "construction-growth",
    value: "6.7%",
    label: "Construction sector growth",
    detail:
      "Kenya's construction sector grew 6.7% in the third quarter of 2025, rebounding from a 2.6% contraction in the same quarter of 2024, supported by higher cement consumption and resumed public works.",
    period: "Q3 2025",
    sourceName: "Kenya National Bureau of Statistics",
    sourceUrl: "https://www.knbs.or.ke/",
    lastVerified: "2026-10-08",
  },
  {
    id: "vision-2030",
    value: "2030",
    label: "Kenya Vision 2030 development blueprint",
    detail:
      "Kenya's long-term development blueprint includes flagship infrastructure such as the Nairobi Expressway and Konza Technopolis, sustaining demand for building materials, machinery and construction technology.",
    sourceName: "Kenya Vision 2030 Delivery Board",
    sourceUrl: "https://vision2030.go.ke/",
    lastVerified: "2026-10-08",
  },
  {
    id: "eac-partner-states",
    value: "8",
    label: "East African Community partner states",
    detail:
      "Kenya sits within the East African Community, giving exhibitors in Nairobi a gateway to a regional market of eight partner states across East and Central Africa.",
    sourceName: "East African Community",
    sourceUrl: "https://www.eac.int/",
    lastVerified: "2026-10-08",
  },
];

export const opportunityCategories: string[] = [
  "Residential Development",
  "Commercial Construction",
  "Roads & Infrastructure",
  "Affordable Housing",
  "Industrial Projects",
  "Hotels & Hospitality",
  "Green & Sustainable Building",
  "Public Infrastructure",
  "Interiors & Fit-Out",
];

export const marketSources = [
  { name: "Kenya National Bureau of Statistics", url: "https://www.knbs.or.ke/" },
  { name: "Kenya Vision 2030", url: "https://vision2030.go.ke/" },
  { name: "East African Community", url: "https://www.eac.int/" },
];
