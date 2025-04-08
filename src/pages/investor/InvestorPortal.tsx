
import { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { offersWithCompanyData } from "@/data/offers";
import { companies } from "@/data/companies";
import PortalHeader from "./components/PortalHeader";
import FilterBar, { FilterOptions } from "./components/FilterBar";
import OffersTabs from "./components/OffersTabs";
import { filterOffers } from "./utils/filterOffers";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Building, ChevronRight } from "lucide-react";

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

  // Filter active companies 
  const activeCompanies = companies.filter(company => 
    company.status === 'active' || company.status === 'upcoming'
  );
  
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
        
        {/* Companies Section */}
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Empresas Disponíveis</CardTitle>
              <CardDescription>
                Explore as empresas disponíveis para investimento
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeCompanies.map((company) => (
                <Link 
                  key={company.id} 
                  to={`/company/${company.id}`}
                  className="block"
                >
                  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-slate-200 dark:border-slate-700 h-full">
                    <div className="flex items-center mb-4">
                      <div className="h-12 w-12 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center mr-4">
                        <Building className="h-6 w-6 text-slate-500" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">{company.name}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{company.industry}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
                      {company.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="bg-slate-50 dark:bg-slate-700 rounded p-2">
                        <p className="text-xs text-slate-500 dark:text-slate-400">Valuation</p>
                        <p className="font-medium">R$ {(company.valuation / 1000000).toFixed(1)}M</p>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-700 rounded p-2">
                        <p className="text-xs text-slate-500 dark:text-slate-400">Crescimento</p>
                        <p className="font-medium text-green-500">+{company.growth}%</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button variant="ghost" size="sm" className="gap-1">
                        Ver Detalhes <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Separator className="my-8" />
        
        <OffersTabs filteredOffers={filteredOffers} />
      </div>
    </MainLayout>
  );
};

export default InvestorPortal;
