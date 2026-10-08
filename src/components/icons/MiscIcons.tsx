import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function TargetIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" stroke="currentColor" />
    </svg>
  );
}

export function HandshakeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2 12l5-4 3 2 4-3 8 5-3 3-3-2-4 3-5-3" stroke="currentColor" />
      <path d="M9 15l2 2M13 12l3 3" stroke="currentColor" />
    </svg>
  );
}

export function MegaphoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 10v4h3l6 4V6L6 10H3Z" stroke="currentColor" />
      <path d="M14 8.5a3.5 3.5 0 0 1 0 7" stroke="currentColor" />
      <path d="M17 6a7 7 0 0 1 0 12" stroke="currentColor" />
    </svg>
  );
}

export function GrowthIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 17l6-6 4 4 8-9" stroke="currentColor" />
      <path d="M15 6h6v6" stroke="currentColor" />
    </svg>
  );
}

export function BriefcaseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="8" width="18" height="11" rx="1.5" stroke="currentColor" />
      <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" />
      <path d="M3 13h18" stroke="currentColor" />
    </svg>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="8" r="3" stroke="currentColor" />
      <path d="M3 20a6 6 0 0 1 12 0" stroke="currentColor" />
      <circle cx="17.5" cy="9" r="2.3" stroke="currentColor" />
      <path d="M15.5 12.3A5 5 0 0 1 21 20" stroke="currentColor" />
    </svg>
  );
}

export function PresentationIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4" width="18" height="12" rx="1.5" stroke="currentColor" />
      <path d="M9 20l3-4 3 4M12 16v4" stroke="currentColor" />
      <path d="M7 12l3-3 2 2 4-4" stroke="currentColor" />
    </svg>
  );
}

export function LinkIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9.5 14.5l5-5" stroke="currentColor" />
      <path d="M8 17l-2.5 2.5a3 3 0 0 1-4.2-4.2L4 12.5" stroke="currentColor" />
      <path d="M16 7l2.5-2.5a3 3 0 0 1 4.2 4.2L20 11.2" stroke="currentColor" />
    </svg>
  );
}

export function HardHatIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 16a8 8 0 0 1 16 0" stroke="currentColor" />
      <path d="M2 16h20v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2Z" stroke="currentColor" />
      <path d="M12 8V5" stroke="currentColor" />
    </svg>
  );
}

export function BlueprintIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="1" stroke="currentColor" />
      <path d="M7 17V9h4a3 3 0 0 1 0 6H7" stroke="currentColor" />
      <path d="M15 9v8" stroke="currentColor" />
    </svg>
  );
}

export function TruckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2" y="8" width="11" height="8" stroke="currentColor" />
      <path d="M13 11h4l3 3v2h-7v-5Z" stroke="currentColor" />
      <circle cx="6" cy="18" r="1.6" stroke="currentColor" />
      <circle cx="16.5" cy="18" r="1.6" stroke="currentColor" />
    </svg>
  );
}

export function StampIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 13V9a3 3 0 0 1 6 0v4" stroke="currentColor" />
      <rect x="6" y="13" width="12" height="4" stroke="currentColor" />
      <path d="M4 20h16" stroke="currentColor" />
    </svg>
  );
}

export function CompassIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" />
      <path d="M15 9l-2 6-6 2 2-6 6-2Z" stroke="currentColor" />
    </svg>
  );
}

export const visitorGroupIconMap: Record<string, (props: IconProps) => React.JSX.Element> = {
  contractors: HardHatIcon,
  "developers-project-owners": BriefcaseIcon,
  "architects-engineers-consultants": BlueprintIcon,
  "trade-distribution": TruckIcon,
  procurement: StampIcon,
  "industrial-institutional": CompassIcon,
};

export const benefitIconMap: Record<string, (props: IconProps) => React.JSX.Element> = {
  "Meet New Buyers": TargetIcon,
  "Find Distributors & Agents": TruckIcon,
  "Generate Business Enquiries": MegaphoneIcon,
  "Introduce Your Brand": PresentationIcon,
  "Reach Contractors & Developers": HardHatIcon,
  "Meet Architects & Engineers": BlueprintIcon,
  "Showcase Products & Technologies": StampIcon,
  "Strengthen Market Presence": GrowthIcon,
  "Find New Customers": TargetIcon,
  "Develop Distribution": TruckIcon,
  "Meet Contractors": HardHatIcon,
  "Reach Developers": BriefcaseIcon,
  "Connect With Specifiers": BlueprintIcon,
  "Launch Products": PresentationIcon,
  "Build Market Awareness": MegaphoneIcon,
  "Develop Direct Relationships": HandshakeIcon,
};
