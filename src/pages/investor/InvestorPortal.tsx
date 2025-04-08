
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { offersWithCompanyData } from "@/data/offers";
import PortalHeader from "./components/PortalHeader";
import FilterBar, { FilterOptions } from "./components/FilterBar";
import { Card, CardContent } from "@/components/ui/card";
import CompaniesSection from "./components/CompaniesSection";
import { prepareCompaniesData } from "./utils/prepareCompaniesData";

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
  
  // Prepare companies data with their associated offers
  const companiesWithOffers = prepareCompaniesData();
  
  return (
    <MainLayout>
      <div className="container py-8">
        <PortalHeader />
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Filtrar Oportunidades</h2>
            <FilterBar 
              filter={filter} 
              setFilter={setFilter} 
              industries={industries}
            />
          </CardContent>
        </Card>
        
        <CompaniesSection 
          companies={companiesWithOffers} 
          filter={filter} 
        />
      </div>
    </MainLayout>
  );
};

export default InvestorPortal;
