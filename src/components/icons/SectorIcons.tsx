import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function BuildingMaterialsIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="13" width="7" height="7" stroke="currentColor" />
      <rect x="11" y="13" width="7" height="7" stroke="currentColor" />
      <rect x="7" y="5" width="7" height="7" stroke="currentColor" />
    </svg>
  );
}

export function MachineryIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 20h6l3-6V7a2 2 0 0 1 2-2h1" stroke="currentColor" />
      <circle cx="6" cy="20" r="0.1" stroke="currentColor" />
      <path d="M15 5l4 3v6h-4" stroke="currentColor" />
      <circle cx="17" cy="18" r="2" stroke="currentColor" />
      <circle cx="6" cy="18" r="2" stroke="currentColor" />
    </svg>
  );
}

export function HardwareToolsIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M14.5 6.5a3 3 0 0 0-4.2 3.6L4 16.4V20h3.6l6.3-6.3a3 3 0 0 0 3.6-4.2l-2.4 2.4-2-2 2.4-2.4Z"
        stroke="currentColor"
      />
    </svg>
  );
}

export function SteelMetalIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 8h18M3 12h18M3 16h18" stroke="currentColor" />
      <path d="M6 8v8M18 8v8" stroke="currentColor" />
    </svg>
  );
}

export function DoorsWindowsIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="4" width="16" height="16" stroke="currentColor" />
      <path d="M12 4v16M4 12h16" stroke="currentColor" />
    </svg>
  );
}

export function ElectricalIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M13 3 5 14h6l-1 7 8-11h-6l1-7Z" stroke="currentColor" />
    </svg>
  );
}

export function PlumbingIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M12 3s5 5.5 5 9.5a5 5 0 0 1-10 0C7 8.5 12 3 12 3Z"
        stroke="currentColor"
      />
    </svg>
  );
}

export function HvacIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="2" stroke="currentColor" />
      <path
        d="M12 10c0-3 2-5 4.5-4.8C15.8 7.5 14 9 12 10ZM12 14c0 3-2 5-4.5 4.8C8.2 16.5 10 15 12 14ZM14 12c3 0 5 2 4.8 4.5C16.5 15.8 15 14 14 12ZM10 12c-3 0-5-2-4.8-4.5C7.5 8.2 9 10 10 12Z"
        stroke="currentColor"
      />
    </svg>
  );
}

export function TilesStoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="8" height="8" stroke="currentColor" />
      <rect x="13" y="3" width="8" height="8" stroke="currentColor" />
      <rect x="3" y="13" width="8" height="8" stroke="currentColor" />
      <rect x="13" y="13" width="8" height="8" stroke="currentColor" />
    </svg>
  );
}

export function PaintsCoatingsIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="7" y="3" width="6" height="6" rx="1" stroke="currentColor" />
      <path d="M9 9v3l-4 4a2.5 2.5 0 0 0 3.5 3.5L13 15h4" stroke="currentColor" />
    </svg>
  );
}

export function SanitarywareIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h16v2a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6v-2Z" stroke="currentColor" />
      <path d="M8 12V6a2 2 0 0 1 4 0M16 12V8a2 2 0 0 1 2 2v2" stroke="currentColor" />
    </svg>
  );
}

export function InteriorsIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 16l9-11 9 11" stroke="currentColor" />
      <path d="M6 13v7h12v-7" stroke="currentColor" />
    </svg>
  );
}

export function FireSafetyIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M12 3C9 6 8 8.5 8 11a4 4 0 0 0 8 0c0-1-.5-2-1-2.5.2 1.6-.6 2.5-1.5 2.5-1.4 0-1.8-1.4-1-2.5-1.5.5-2.5 2-2.5 3.5"
        stroke="currentColor"
      />
    </svg>
  );
}

export function PrefabIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 9l9-5 9 5-9 5-9-5Z" stroke="currentColor" />
      <path d="M3 9v6l9 5 9-5V9" stroke="currentColor" />
      <path d="M12 14v6" stroke="currentColor" />
    </svg>
  );
}

export function SolarEnergyIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" />
      <path
        d="M12 3v2.5M12 18.5V21M4.2 4.2l1.8 1.8M18 18l1.8 1.8M3 12h2.5M18.5 12H21M4.2 19.8l1.8-1.8M18 6l1.8-1.8"
        stroke="currentColor"
      />
    </svg>
  );
}

// Keys match the slugs in src/data/exhibitionProfile.ts
export const sectorIconMap: Record<string, (props: IconProps) => React.JSX.Element> = {
  "building-materials": BuildingMaterialsIcon,
  "construction-machinery": MachineryIcon,
  "structural-engineering-steel": SteelMetalIcon,
  "prefab-modular-construction": PrefabIcon,
  "doors-windows-glass-aluminium": DoorsWindowsIcon,
  "roofing-facade": BuildingMaterialsIcon,
  "construction-chemicals-paints": PaintsCoatingsIcon,
  "tiles-marble-flooring": TilesStoneIcon,
  "kitchen-bathroom-plumbing": SanitarywareIcon,
  "interiors-landscaping": InteriorsIcon,
  "electrical-lighting-cables": ElectricalIcon,
  "hvac-lifts-building-services": HvacIcon,
  "solar-renewable-energy": SolarEnergyIcon,
  "fire-safety-security": FireSafetyIcon,
  "smart-building-technology": HardwareToolsIcon,
};
