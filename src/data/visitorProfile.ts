export type VisitorGroup = {
  slug: string;
  name: string;
  roles: string[];
};

/** Target visitor groups for Kenya Buildcon International Expo 2027.
 * Based on the 2027 brochure's Visitor Profile (page 7), with overlapping roles consolidated.
 * These describe the intended audience, not confirmed attendee registrations.
 */
export const visitorGroups: VisitorGroup[] = [
  {
    slug: "contractors",
    name: "Contractors & Builders",
    roles: [
      "Building Contractors",
      "Civil Contractors",
      "Subcontractors",
      "Builders",
      "Construction Industry Professionals",
      "Safety & Security Professionals",
    ],
  },
  {
    slug: "developers-project-owners",
    name: "Developers & Property Investors",
    roles: [
      "Real Estate & Property Developers",
      "Property Investors",
      "Investors & Financiers",
      "Hotel & Hospitality Professionals",
      "Property Owners",
    ],
  },
  {
    slug: "architects-engineers-consultants",
    name: "Architects, Engineers & Consultants",
    roles: [
      "Architects & Planners",
      "Structural & Civil Engineers",
      "Consulting Engineers",
      "Project Managers & Consultants",
      "Interior Design Professionals",
      "Urban Planners & Designers",
      "Energy Efficiency Experts",
    ],
  },
  {
    slug: "trade-distribution",
    name: "Trade & Distribution Professionals",
    roles: [
      "Importers",
      "Dealers & Distributors",
      "Building Material Suppliers",
      "Retailers",
    ],
  },
  {
    slug: "procurement",
    name: "Procurement & Facility Professionals",
    roles: [
      "Procurement & Sourcing Professionals",
      "Buyers from Hospitality & Healthcare Facilities",
      "Facility Managers",
      "Building Product Buyers",
    ],
  },
  {
    slug: "industrial-institutional",
    name: "Government, Academic & Institutional Visitors",
    roles: [
      "Government Agencies & Building Authorities",
      "Academics & Researchers",
      "Universities & Technical Institutes",
      "Research Institutions",
    ],
  },
];
