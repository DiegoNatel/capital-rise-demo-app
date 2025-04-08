
import { OfferWithCompany } from "../components/OfferCard";
import { FilterOptions } from "../components/FilterBar";

export const filterOffers = (offers: OfferWithCompany[], filter: FilterOptions): OfferWithCompany[] => {
  return offers.filter((offer) => {
    // Status filter
    if (filter.status !== "all" && offer.status !== filter.status) {
      return false;
    }
    
    // Industry filter
    if (filter.industry !== "all" && offer.company?.industry !== filter.industry) {
      return false;
    }
    
    // Min investment filter
    if (filter.minInvestment !== "all") {
      const minValue = parseInt(filter.minInvestment);
      if (offer.minInvestment > minValue) {
        return false;
      }
    }
    
    // Search filter
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      return (
        offer.title.toLowerCase().includes(searchLower) ||
        offer.company?.name.toLowerCase().includes(searchLower) ||
        offer.company?.industry.toLowerCase().includes(searchLower) ||
        offer.description.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });
};
