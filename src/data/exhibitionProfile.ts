
export interface SectorItem {
  name: string;
  slug: string;
  subcategories: string[];
}

/**
 * Source:
 * 4th Kenya Buildcon International Expo 2027 brochure,
 * page 6 — Exhibitor Profile.
 *
 * Sector groups are website navigation categories.
 * Product labels follow the brochure wording.
 *
 * Duplicated brochure entries are included only once.
 */

export const exhibitionSectors: SectorItem[] = [
  {
    name: "Building Materials",
    slug: "building-materials",
    subcategories: [
      "Cement and Steel",
      "Concrete Blocks & Machinery",
      "Gypsum Boards",
      "Lightweight Construction Materials",
      "Timber & Timber Products",
    ],
  },
  {
    name: "Construction Machinery & Equipment",
    slug: "construction-machinery",
    subcategories: [
      "Earthmoving Equipment",
      "Construction Tools, Machinery and Tapes",
      "Demolition Equipment",
      "Quarrying & Mining Equipment",
      "Surveying Equipment",
    ],
  },
  {
    name: "Structural Engineering & Steel",
    slug: "structural-engineering-steel",
    subcategories: [
      "Structural Engineering",
      "Structural Steel Fabrication",
      "Formwork and Scaffolding",
    ],
  },
  {
    name: "Prefab & Modular Construction",
    slug: "prefab-modular-construction",
    subcategories: [
      "Pre-fabricated Structures",
      "Modular Construction Solutions",
      "PVC/UPVC Machinery and Profiles",
    ],
  },
  {
    name: "Doors, Windows, Glass & Aluminium",
    slug: "doors-windows-glass-aluminium",
    subcategories: [
      "Doors and Windows",
      "Aluminium Extrusions",
      "Architectural Glass",
      "Decorative Glass and Mirrors",
      "Architectural Hardware",
    ],
  },
  {
    name: "Roofing & Façade",
    slug: "roofing-facade",
    subcategories: [
      "Roofing & Façade",
      "Acoustics & Soundproofing Solutions",
      "Noise Control Products",
    ],
  },
  {
    name: "Construction Chemicals, Paints & Coatings",
    slug: "construction-chemicals-paints",
    subcategories: [
      "Construction Chemicals & Waterproofing",
      "Adhesive & Sealants",
      "Paints & Coatings",
    ],
  },
  {
    name: "Tiles, Marble, Stone & Flooring",
    slug: "tiles-marble-flooring",
    subcategories: [
      "Tiles & Sanitary Ware",
      "Marble & Stones",
      "Flooring and Wall Coverings",
      "Industrial Flooring Solutions",
    ],
  },
  {
    name: "Kitchen, Bathroom & Plumbing",
    slug: "kitchen-bathroom-plumbing",
    subcategories: [
      "Kitchen & Bathroom Solutions",
      "Plumbing Fittings and Accessories",
    ],
  },
  {
    name: "Interiors, Furniture & Landscaping",
    slug: "interiors-landscaping",
    subcategories: [
      "Interior Decorating Products",
      "Outdoor Furniture & Landscaping",
    ],
  },
  {
    name: "Electrical, Lighting & Cables",
    slug: "electrical-lighting-cables",
    subcategories: [
      "Electricals & Electronics",
      "Lighting / LED",
      "Switches & Switch Gear",
      "Wires & Cables",
      "Battery & Generators",
    ],
  },
  {
    name: "HVAC, Lifts & Building Services",
    slug: "hvac-lifts-building-services",
    subcategories: [
      "Air Conditioning & HVAC",
      "Lifts & Elevators",
    ],
  },
  {
    name: "Solar, Renewable & Green Energy",
    slug: "solar-renewable-energy",
    subcategories: [
      "Renewable Energy Systems",
      "Solar, Wind & Other Green Energy Products",
      "Construction Waste Management",
    ],
  },
  {
    name: "Fire, Safety & Security",
    slug: "fire-safety-security",
    subcategories: [
      "Fire Protection Systems",
      "Passive Fire Protection",
      "Safety & Security",
    ],
  },
  {
    name: "Smart Building & Construction Technology",
    slug: "smart-building-technology",
    subcategories: [
      "Building Automation",
      "Home Automation Systems",
      "Building Information Modeling (BIM) Software",
      "Infrastructure Software",
    ],
  },
];

/**
 * Derived only from the official exhibitor profile.
 * Do not use these values as confirmed exhibitor counts.
 */

export const exhibitionProfileStats = {
  sectorGroups: exhibitionSectors.length,
  productCategories: new Set(
    exhibitionSectors.flatMap(
      (sector) => sector.subcategories
    )
  ).size,
};
