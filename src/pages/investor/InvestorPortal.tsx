import { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { offersWithCompanyData } from "@/data/offers";
import { companies } from "@/data/companies";
import PortalHeader from "./components/PortalHeader";
import FilterBar, { FilterOptions } from "./components/FilterBar";
import { filterOffers } from "./utils/filterOffers";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Building, ChevronRight, Clock, CheckCircle2 } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

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

  // Get companies with their associated offers
  const companiesWithOffers = companies.map(company => {
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
        
        {/* Companies Section with Tabs */}
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
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-52">
                <Tabs defaultValue="all" orientation="vertical" className="w-full">
                  <TabsList className="flex flex-row md:flex-col h-auto w-full bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                    <TabsTrigger value="all" className="flex-1 md:flex-none">Todas</TabsTrigger>
                    <TabsTrigger value="active" className="flex-1 md:flex-none">Ativas</TabsTrigger>
                    <TabsTrigger value="upcoming" className="flex-1 md:flex-none">Em breve</TabsTrigger>
                    <TabsTrigger value="completed" className="flex-1 md:flex-none">Concluídas</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="flex-1">
                <Tabs defaultValue="all">
                  <TabsContent value="all" className="m-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {companiesWithOffers.map((company) => (
                        <Link 
                          key={company.id} 
                          to={`/company/${company.id}`}
                          className="block"
                        >
                          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-slate-200 dark:border-slate-700 h-full relative">
                            {company.hasActiveOffer && (
                              <div className="absolute top-4 right-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded-full px-3 py-1 text-xs font-medium flex items-center">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Rodada Ativa
                              </div>
                            )}
                            {!company.hasActiveOffer && company.hasUpcomingOffer && (
                              <div className="absolute top-4 right-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full px-3 py-1 text-xs font-medium flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                Em Breve
                              </div>
                            )}
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
                  </TabsContent>
                  
                  <TabsContent value="active" className="m-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {companiesWithOffers
                        .filter(company => company.hasActiveOffer)
                        .map((company) => (
                          <Link 
                            key={company.id} 
                            to={`/company/${company.id}`}
                            className="block"
                          >
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-slate-200 dark:border-slate-700 h-full relative">
                              <div className="absolute top-4 right-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded-full px-3 py-1 text-xs font-medium flex items-center">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Rodada Ativa
                              </div>
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
                  </TabsContent>
                  
                  <TabsContent value="upcoming" className="m-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {companiesWithOffers
                        .filter(company => company.hasUpcomingOffer && !company.hasActiveOffer)
                        .map((company) => (
                          <Link 
                            key={company.id} 
                            to={`/company/${company.id}`}
                            className="block"
                          >
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-slate-200 dark:border-slate-700 h-full relative">
                              <div className="absolute top-4 right-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full px-3 py-1 text-xs font-medium flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                Em Breve
                              </div>
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
                  </TabsContent>
                  
                  <TabsContent value="completed" className="m-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {companiesWithOffers
                        .filter(company => company.offers.some(offer => offer.status === 'completed'))
                        .map((company) => (
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
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default InvestorPortal;
