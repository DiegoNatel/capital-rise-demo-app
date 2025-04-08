
import { Company, companies } from "@/data/companies";
import { offersWithCompanyData } from "@/data/offers";
import { CompanyWithOffers } from "../components/CompanyCard";

export const prepareCompaniesData = (): CompanyWithOffers[] => {
  return companies.map(company => {
    const companyOffers = offersWithCompanyData.filter(offer => offer.companyId === company.id);
    const hasActiveOffer = companyOffers.some(offer => offer.status === 'active');
    const hasUpcomingOffer = companyOffers.some(offer => offer.status === 'upcoming');
    
    return {
      ...company,
      offers: companyOffers,
      hasActiveOffer,
      hasUpcomingOffer
    };
  });
};
