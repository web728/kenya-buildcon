
/**
 * Kenya Buildcon — Previous Edition Data
 *
 * Historical exhibition statistics, feedback,
 * participating companies and supporting associations
 * from the project's previous-edition records.
 *
 * Important:
 * These figures relate to the previous edition,
 * NOT to confirmed results or participation for 2027.
 *
 * Historical claims should be checked against the
 * official Post Show Report before publication.
 */

/* ==========================================
   STAT TYPES
========================================== */

export type ShowStat = {
  value: number;
  suffix?: string;
  label: string;
};

/* ==========================================
   HERO STATS — ANIMATED COUNTERS

   Used by:
   HeroStatsSection.tsx
========================================== */

export const showStats: ShowStat[] = [
  {
    value: 250,
    suffix: "+",
    label: "Exhibiting Brands",
  },
  {
    value: 9500,
    suffix: "+",
    label: "Trade Visitors",
  },
  {
    value: 700,
    suffix: "+",
    label: "Product Categories",
  },
];

/* ==========================================
   EXHIBITOR FEEDBACK
========================================== */

export const exhibitorFeedback = [
  {
    value: "85%",
    label: "of exhibitors made beneficial business connections",
  },
  {
    value: "95%",
    label: "rated the quality of visitors outstanding or exceptional",
  },
  {
    value: "90%",
    label: "expect orders as a result of displaying",
  },
  {
    value: "90%",
    label: "intend to participate again as exhibitors",
  },
];

/* ==========================================
   VISITOR FEEDBACK
========================================== */

export const visitorFeedback = [
  {
    value: "9,595",
    label: "total trade visitors over three days",
  },
  {
    value: "95%",
    label: "of visitors were satisfied",
  },
  {
    value: "83%",
    label: "plan to visit again",
  },
  {
    value: "76%",
    label: "recommended the exhibition",
  },
];

/* ==========================================
   PAST PARTICIPANTS

   Used by:
   ExhibitorDirectoryPreviewSection.tsx

   Historical companies, not confirmed
   exhibitors for Kenya Buildcon 2027.
========================================== */

export const pastParticipants: string[] = [
  "Bosch East Africa",
  "Mather + Platt (K) Ltd.",
  "Modern Fittings Kenya (Hafele)",
  "Millennium Tiles East Africa",
  "Hotpoint Kenya",
  "Visaka Industries Ltd.",
  "National Housing Corporation, Kenya",
  "Rhino Road Equipment",
  "Prime UPVC",
  "Space & Style Limited, Kenya",
  "Victoria Homestore, Kenya",
  "Kvalit Germany",
  "Atlantic Polymers",
  "Metcraft Buildware Pvt. Ltd.",
  "LRB Plywood",
  "RFL Bangladesh",
];

/* ==========================================
   SUPPORTING ASSOCIATIONS

   Historical association data.
   Do not imply current 2027 endorsement
   without confirmation.
========================================== */

export const supportingAssociations: string[] = [
  "Kenya National Chamber of Commerce and Industry (KNCCI)",
  "The Kenya Association of Building and Civil Engineering Contractors (KABCEC)",
  "The Architectural Association of Kenya",
  "Institute of Quantity Surveyors of Kenya",
  "Kenya Property Developers Association",
  "Association of Construction Managers of Kenya",
  "Town and County Planners Association of Kenya",
];

/* ==========================================
   KEY FEATURES

   Original project feature titles and
   descriptions preserved.

   Event activities also broadly align with
   the official 2027 brochure, page 3.
========================================== */


export const keyFeatures = [
  {
    title: "Networking",
    desc: "Meet manufacturers, suppliers, buyers and industry professionals from the building and construction sector.",
  },
  {
    title: "Knowledge Sharing",
    desc: "Exchange industry knowledge and learn about current developments, challenges and opportunities in construction.",
  },
  {
    title: "Technical Workshops",
    desc: "Attend technical sessions covering construction methods, building materials and new technologies.",
  },
  {
    title: "Seminars & Panels",
    desc: "Hear from industry professionals on key topics related to construction, infrastructure and market developments.",
  },
  {
    title: "VIP Lounge",
    desc: "A dedicated space for invited guests and industry representatives to meet and hold business discussions.",
  },
  {
    title: "Government Engagement",
    desc: "Opportunities for industry representatives to connect with government officials and discuss construction-related projects and developments.",
  },
  {
    title: "Business Development",
    desc: "Meet potential customers, explore new markets and build business relationships in Kenya and East Africa.",
  },
  {
    title: "Product Showcase",
    desc: "Explore building materials, construction equipment, technologies and other products presented by exhibitors.",
  },
];
