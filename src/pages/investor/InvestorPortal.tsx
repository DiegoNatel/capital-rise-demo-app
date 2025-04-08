
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { offersWithCompanyData } from "@/data/offers";
import PortalHeader from "./components/PortalHeader";
import FilterBar, { FilterOptions } from "./components/FilterBar";
import OffersTabs from "./components/OffersTabs";
import { filterOffers } from "./utils/filterOffers";

const InvestorPortal = () => {
  const [filter, setFilter] = useState<FilterOptions>({
    status: "all",
    industry: "all",
    minInvestment: "all",
    search: "",
  });
  
  // Get unique industries for filter
  const industries = Array.from(
    new Set(offersWithCompanyData.map((offer) => offer.company?.industry).filter(Boolean))
  ) as string[];
  
  // Filter offers based on selected filters
  const filteredOffers = filterOffers(offersWithCompanyData, filter);
  
  return (
    <MainLayout>
      <div className="container py-8">
        <PortalHeader />
        <FilterBar 
          filter={filter} 
          setFilter={setFilter} 
          industries={industries}
        />
        <OffersTabs filteredOffers={filteredOffers} />
      </div>
    </MainLayout>
  );
};

export default InvestorPortal;
