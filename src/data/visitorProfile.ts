export type VisitorGroup = {
  slug: string;
  name: string;
  roles: string[];
};

/**
 * Visitor profile, grouped from the official Kenya Buildcon "Visitor's Profile"
 * list (kenyabuildcon.com) and the brochure's attendee description.
 */
export const visitorGroups: VisitorGroup[] = [
  {
    slug: "contractors",
    name: "Contractors & Builders",
    roles: [
      "Building Contractors",
      "Contractors and Subcontractors",
      "Builders and Developers",
      "Construction Industry Professionals",
      "Safety and Security Professionals",
    ],
  },
  {
    slug: "developers-project-owners",
    name: "Developers & Property Investors",
    roles: [
      "Builders and Developers",
      "Homeowners and Property Investors",
      "Investors and Financiers",
      "Hoteliers",
      "Hospitality Industry Professionals",
      "Facility Managers",
    ],
  },
  {
    slug: "architects-engineers-consultants",
    name: "Architects, Engineers & Consultants",
    roles: [
      "Architects and Planners",
      "Engineers",
      "Structural & Civil Engineers",
      "Consulting Engineers",
      "Project Managers and Consultants",
      "Interior Design Professionals",
      "Urban Planners and Designers",
      "Energy Efficiency Experts",
    ],
  },
  {
    slug: "trade-distribution",
    name: "Trade & Distribution",
    roles: [
      "Importers",
      "Dealers and Distributors",
      "Building Material Suppliers",
      "Retailers",
    ],
  },
  {
    slug: "procurement",
    name: "Procurement & Sourcing",
    roles: [
      "Sourcing Professionals from Hospitality & Health Facilities",
      "Project Managers and Consultants",
      "Facility Managers",
    ],
  },
  {
    slug: "industrial-institutional",
    name: "Government, Academic & Institutional",
    roles: [
      "Government Agencies / Building Authorities",
      "Academics and Researchers",
      "Universities, Technical & Research Institutes",
    ],
  },
];

/** Exhibitor profile, from the brochure ("Exhibitors") and the Exhibitor Profile page. */
export const whoShouldExhibit: string[] = [
  "Building Materials & Construction Companies",
  "Engineering Services Firms",
  "Heavy Machinery Manufacturers",
  "Architectural & Interior Design Companies",
  "Green Building Solution Providers",
  "Infrastructure Technology Providers",
  "Manufacturers & Exporters",
  "Importers & Distributors",
  "Cement, Steel & Structural Product Suppliers",
  "Doors, Windows & Glass Companies",
  "Tiles, Sanitaryware & Bathroom Brands",
  "Electrical, Lighting & Cable Companies",
  "HVAC, Lifts & Elevator Companies",
  "Solar & Renewable Energy Companies",
  "Fire, Safety & Security Companies",
  "Construction Chemicals & Paint Brands",
  "Prefab & Modular Construction Companies",
  "Construction Technology & Software Providers",
];
