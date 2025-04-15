
import { Company, TeamMember } from "../components/types";

export interface EditProfileFormData {
  name: string;
  industry: string;
  description: string;
  foundedYear: number;
  location: string;
  employees: number;
  valuation: number;
  growth: number;
  website: string;
  team: TeamMember[];
  highlights: string;
}

export interface LockedFieldTooltipProps {
  children: React.ReactNode;
  message: string;
}

