export type SectorItem = {
  name: string;
  slug: string;
  subcategories: string[];
};

export const exhibitionSectors: SectorItem[] = [
  { name: "Building Materials", slug: "building-materials", subcategories: ["Cement, Concrete & Blocks", "Steel & Building Products", "Gypsum Boards", "Lightweight Building Materials", "Timber & Wood Products"] },
  { name: "Construction Machinery & Equipment", slug: "construction-machinery", subcategories: ["Earthmoving Equipment", "Construction Machinery & Tools", "Demolition Equipment", "Quarrying & Mining Equipment", "Surveying Equipment"] },
  { name: "Structural Engineering & Steel", slug: "structural-engineering-steel", subcategories: ["Structural Engineering Services", "Structural Steel & Fabrication", "Formwork & Scaffolding"] },
  { name: "Prefab & Modular Construction", slug: "prefab-modular-construction", subcategories: ["Prefabricated Structures", "Modular Building Systems", "Prefabricated Building Components"] },
  { name: "Doors, Windows, Glass & Aluminium", slug: "doors-windows-glass-aluminium", subcategories: ["Doors & Windows", "Aluminium Profiles & Extrusions", "Architectural Glass", "Decorative Glass & Mirrors", "Architectural Hardware", "PVC & UPVC Profiles and Machinery"] },
  { name: "Roofing, Façades & Insulation", slug: "roofing-facade", subcategories: ["Roofing Materials & Systems", "Façade & Cladding Systems", "Thermal & Acoustic Insulation", "Soundproofing & Noise Control"] },
  { name: "Construction Chemicals, Paints & Coatings", slug: "construction-chemicals-paints", subcategories: ["Construction Chemicals", "Waterproofing Products", "Adhesives & Sealants", "Paints & Protective Coatings"] },
  { name: "Tiles, Marble, Stone & Flooring", slug: "tiles-marble-flooring", subcategories: ["Tiles & Ceramics", "Marble & Natural Stone", "Flooring & Wall Coverings", "Industrial Flooring Solutions"] },
  { name: "Kitchen, Bathroom & Plumbing", slug: "kitchen-bathroom-plumbing", subcategories: ["Kitchen & Bathroom Products", "Sanitary Ware", "Plumbing Fittings & Accessories"] },
  { name: "Interiors, Furniture & Landscaping", slug: "interiors-landscaping", subcategories: ["Interior Design & Decoration Products", "Furniture & Furnishings", "Outdoor Furniture & Landscaping"] },
  { name: "Electrical, Lighting & Cables", slug: "electrical-lighting-cables", subcategories: ["Electrical Equipment & Accessories", "LED & Architectural Lighting", "Switches & Switchgear", "Wires & Cables", "Batteries & Generators"] },
  { name: "HVAC, Lifts & Building Services", slug: "hvac-lifts-building-services", subcategories: ["Air Conditioning & HVAC Systems", "Lifts & Elevators", "Building Services Equipment"] },
  { name: "Solar, Renewable & Green Energy", slug: "solar-renewable-energy", subcategories: ["Solar Energy Systems", "Wind & Renewable Energy Products", "Energy-Efficient Building Solutions", "Construction Waste Management"] },
  { name: "Fire, Safety & Security", slug: "fire-safety-security", subcategories: ["Fire Protection Systems", "Passive Fire Protection", "Safety Equipment & Solutions", "Building Security Systems"] },
  { name: "Smart Building & Construction Technology", slug: "smart-building-technology", subcategories: ["Building Automation Systems", "Home Automation Solutions", "Building Information Modelling (BIM)", "Construction & Infrastructure Software"] },
];
