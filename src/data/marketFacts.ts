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
    label: "Construction Sector Growth",
    detail:
      "Kenya's construction sector grew by 6.7% in Q3 2025, compared to a 2.6% decline in the same period of 2024, showing an improvement in construction activity.",
    period: "Q3 2025",
    sourceName: "Kenya National Bureau of Statistics",
    sourceUrl:
      "https://www.knbs.or.ke/wp-content/uploads/2025/12/Kenya-Quarterly-Gross-Domestic-Product-Third-Quarter-2025.pdf",
    lastVerified: "2026-10-29",
  },
  {
    id: "vision-2030",
    value: "2030",
    label: "Kenya Vision 2030",
    detail:
      "Kenya Vision 2030 is the country's long-term development plan, with infrastructure development among its key priorities.",
    sourceName: "Kenya Vision 2030 Delivery Board",
    sourceUrl: "https://vision2030.go.ke/about-vision-2030/",
    lastVerified: "2026-10-29",
  },
  {
    id: "eac-partner-states",
    value: "8",
    label: "East African Community Partner States",
    detail:
      "Kenya is one of the eight East African Community partner states, supporting regional trade and business connections across East Africa.",
    sourceName: "East African Community",
    sourceUrl: "https://www.eac.int/eac-partner-states/",
    lastVerified: "2026-10-29",
  },
];



export const opportunityCategories: string[] = [
  "Residential Development",
  "Commercial Development",
  "Roads & Infrastructure",
  "Affordable Housing",
  "Industrial Development",
  "Hotels & Hospitality",
  "Sustainable Building",
  "Public Infrastructure",
  "Interiors & Fit-Out",
];


export const marketSources = [
  { name: "Kenya National Bureau of Statistics", url: "https://www.knbs.or.ke/" },
  { name: "Kenya Vision 2030", url: "https://vision2030.go.ke/" },
  { name: "East African Community", url: "https://www.eac.int/eac-partner-states/" },
];
