
import { CompanyWithOffers } from "../components/CompanyCard";
import { FilterOptions } from "../components/FilterBar";

export const filterCompanies = (companies: CompanyWithOffers[], filter: FilterOptions, activeTab: string): CompanyWithOffers[] => {
  // First apply the tab filter
  const tabFilteredCompanies = companies.filter(company => {
    if (activeTab === "all") return true;
    if (activeTab === "active") return company.hasActiveOffer;
    if (activeTab === "upcoming") return company.hasUpcomingOffer && !company.hasActiveOffer;
    if (activeTab === "completed") return company.offers.some(offer => offer.status === 'completed');
    return true;
  });
  
  // Then apply the search/dropdown filters
  return tabFilteredCompanies.filter(company => {
    // Status filter
    if (filter.status !== "all" && !company.offers.some(offer => offer.status === filter.status)) {
      return false;
    }

    // Industry filter
    if (filter.industry !== "all" && company.industry !== filter.industry) {
      return false;
    }

    // Min investment filter
    if (filter.minInvestment !== "all") {
      const minInvestmentValue = parseInt(filter.minInvestment);
      if (!company.offers.some(offer => offer.minInvestment <= minInvestmentValue)) {
        return false;
      }
    }

    // Search filter
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      const nameMatch = company.name.toLowerCase().includes(searchLower);
      const industryMatch = company.industry.toLowerCase().includes(searchLower);
      const descriptionMatch = company.description.toLowerCase().includes(searchLower);
      
      if (!nameMatch && !industryMatch && !descriptionMatch) {
        return false;
      }
    }

    return true;
  });
};
