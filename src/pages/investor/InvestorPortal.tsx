
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { offersWithCompanyData } from "@/data/offers";
import PortalHeader from "./components/PortalHeader";
import FilterBar, { FilterOptions } from "./components/FilterBar";
import OffersTabs from "./components/OffersTabs";
import { filterOffers } from "./utils/filterOffers";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
        
        <Separator className="my-8" />
        
        <OffersTabs filteredOffers={filteredOffers} />
      </div>
    </MainLayout>
  );
};

export default InvestorPortal;
