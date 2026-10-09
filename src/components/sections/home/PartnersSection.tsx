
import {
  getActivePartners,
  type PartnerSummary,
} from "@/lib/data/partners";

import { PartnerLogo } from "@/components/ui/PartnerLogo";
import { OrganiserLogos } from "@/components/ui/OrganiserLogos";

import { PartnersSectionClient } from "./PartnersSectionClient";

export async function PartnersSection() {
  let partners: PartnerSummary[] = [];

  try {
    partners = await getActivePartners();
  } catch {
    partners = [];
  }

  return (
    <PartnersSectionClient
      organiserLogos={<OrganiserLogos />}
      partnerLogos={partners.map((partner) => (
        <PartnerLogo
          key={partner._id || partner.name}
          partner={partner}
        />
      ))}
    />
  );
}
