
import { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowUpRight, ChevronRight, DollarSign, Filter, Plus, Search, Sliders } from "lucide-react";
import { offersWithCompanyData } from "@/data/offers";

const InvestorPortal = () => {
  const [filter, setFilter] = useState<{
    status: string;
    industry: string;
    minInvestment: string;
    search: string;
  }>({
    status: "all",
    industry: "all",
    minInvestment: "all",
    search: "",
  });
  
  // Filter offers based on selected filters
  const filteredOffers = offersWithCompanyData.filter((offer) => {
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
  
  // Get unique industries for filter
  const industries = Array.from(
    new Set(offersWithCompanyData.map((offer) => offer.company?.industry).filter(Boolean))
  );
  
  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Oportunidades de Investimento</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Explore ofertas de empresas inovadoras em diversos setores
            </p>
          </div>
          
          {/* Updated navigation buttons */}
          <div className="flex items-center gap-2">
            <div className="bg-slate-50 dark:bg-slate-800 rounded-full flex overflow-hidden p-1 shadow-sm border border-slate-200 dark:border-slate-700">
              <Button 
                variant="ghost" 
                className="rounded-full flex items-center gap-2 px-4 hover:bg-white dark:hover:bg-slate-700"
                asChild
              >
                <Link to="/investor/portfolio">
                  <DollarSign className="h-4 w-4" />
                  <span>Meu Portfólio</span>
                </Link>
              </Button>
              
              <Button
                variant="ghost"
                className="rounded-full bg-white dark:bg-slate-700 shadow-sm flex items-center gap-2 px-4"
              >
                <Plus className="h-4 w-4" />
                <span>Novas Oportunidades</span>
              </Button>
            </div>
            
            <Button 
              className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-md" 
              asChild
            >
              <Link to="/marketplace" className="flex items-center gap-2">
                <span>Marketplace</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Filters and Search */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
                <Input
                  placeholder="Buscar empresas, setores, ofertas..."
                  className="pl-9"
                  value={filter.search}
                  onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="w-full md:w-auto">
                <Select
                  value={filter.status}
                  onValueChange={(value) => setFilter({ ...filter, status: value })}
                >
                  <SelectTrigger className="w-full md:w-[160px]">
                    <span className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      Status
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="active">Ativos</SelectItem>
                    <SelectItem value="upcoming">Em breve</SelectItem>
                    <SelectItem value="completed">Concluídos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full md:w-auto">
                <Select
                  value={filter.industry}
                  onValueChange={(value) => setFilter({ ...filter, industry: value })}
                >
                  <SelectTrigger className="w-full md:w-[180px]">
                    <span className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      Setor
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os setores</SelectItem>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry as string}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full md:w-auto">
                <Select
                  value={filter.minInvestment}
                  onValueChange={(value) => setFilter({ ...filter, minInvestment: value })}
                >
                  <SelectTrigger className="w-full md:w-[180px]">
                    <span className="flex items-center">
                      <DollarSign className="mr-2 h-4 w-4" />
                      Investimento mín.
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Qualquer valor</SelectItem>
                    <SelectItem value="1000">Até R$ 1.000</SelectItem>
                    <SelectItem value="5000">Até R$ 5.000</SelectItem>
                    <SelectItem value="10000">Até R$ 10.000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button variant="ghost" size="icon" onClick={() => setFilter({
                status: "all",
                industry: "all",
                minInvestment: "all",
                search: "",
              })}>
                <Sliders className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            <div className="flex items-center">
              <span className="mr-2 text-slate-500 dark:text-slate-400">Filtros:</span>
              
              {filter.status !== "all" && (
                <span className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-700 px-2.5 py-0.5 text-xs">
                  Status: {filter.status === "active" ? "Ativos" : 
                          filter.status === "upcoming" ? "Em breve" : 
                          filter.status === "completed" ? "Concluídos" : filter.status}
                </span>
              )}
              
              {filter.industry !== "all" && (
                <span className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-700 px-2.5 py-0.5 text-xs ml-2">
                  Setor: {filter.industry}
                </span>
              )}
              
              {filter.minInvestment !== "all" && (
                <span className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-700 px-2.5 py-0.5 text-xs ml-2">
                  Investimento: Até R$ {parseInt(filter.minInvestment).toLocaleString()}
                </span>
              )}
              
              {filter.search && (
                <span className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-700 px-2.5 py-0.5 text-xs ml-2">
                  Busca: "{filter.search}"
                </span>
              )}
              
              {(filter.status === "all" && filter.industry === "all" && 
                filter.minInvestment === "all" && !filter.search) && (
                <span className="text-slate-500 dark:text-slate-400">Nenhum filtro aplicado</span>
              )}
            </div>
          </div>
        </div>
        
        {/* Offers Tabs */}
        <Tabs defaultValue="all" className="space-y-8">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="active">Ativas</TabsTrigger>
            <TabsTrigger value="upcoming">Em breve</TabsTrigger>
            <TabsTrigger value="completed">Concluídas</TabsTrigger>
          </TabsList>
          
          {["all", "active", "upcoming", "completed"].map((tabValue) => (
            <TabsContent key={tabValue} value={tabValue} className="space-y-6">
              {filteredOffers.filter(
                (offer) => tabValue === "all" || offer.status === tabValue
              ).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredOffers
                    .filter((offer) => tabValue === "all" || offer.status === tabValue)
                    .map((offer) => (
                      <Card key={offer.id} className="overflow-hidden">
                        <div className="bg-slate-50 dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-700">
                          <div className="flex items-center mb-2">
                            <div className="h-10 w-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center mr-3 border border-slate-200 dark:border-slate-600">
                              <span className="font-bold">{offer.company?.name.substring(0, 2)}</span>
                            </div>
                            <div className="overflow-hidden">
                              <h3 className="font-medium text-lg truncate">{offer.company?.name}</h3>
                              <p className="text-sm text-slate-500 dark:text-slate-400">{offer.company?.industry}</p>
                            </div>
                          </div>
                        </div>
                        
                        <CardContent className="p-4">
                          <h4 className="font-medium truncate">{offer.title}</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 line-clamp-2">
                            {offer.description}
                          </p>
                          
                          <div className="mt-4 grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-slate-500 dark:text-slate-400">Meta</p>
                              <p className="font-medium">R$ {offer.goalAmount.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 dark:text-slate-400">Captado</p>
                              <p className="font-medium">R$ {offer.raisedAmount.toLocaleString()}</p>
                            </div>
                          </div>
                          
                          {offer.status !== 'upcoming' && (
                            <>
                              <div className="mt-4 mb-1 flex justify-between text-xs text-slate-500 dark:text-slate-400">
                                <span>Progresso:</span>
                                <span>{Math.round((offer.raisedAmount / offer.goalAmount) * 100)}%</span>
                              </div>
                              <Progress 
                                value={Math.round((offer.raisedAmount / offer.goalAmount) * 100)} 
                                className="h-2"
                              />
                            </>
                          )}
                          
                          <div className="mt-4 grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-slate-500 dark:text-slate-400">Token</p>
                              <p className="font-medium">{offer.tokenSymbol} (R$ {offer.tokenPrice.toFixed(2)})</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 dark:text-slate-400">Mín. Investimento</p>
                              <p className="font-medium">R$ {offer.minInvestment.toLocaleString()}</p>
                            </div>
                          </div>
                          
                          <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                            {offer.status === 'active' && (
                              <div className="flex justify-between items-center">
                                <span>Encerra em:</span>
                                <span>{Math.ceil((new Date(offer.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} dias</span>
                              </div>
                            )}
                            {offer.status === 'upcoming' && (
                              <div className="flex justify-between items-center">
                                <span>Inicia em:</span>
                                <span>{Math.ceil((new Date(offer.startDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} dias</span>
                              </div>
                            )}
                            {offer.status === 'completed' && (
                              <div className="flex justify-between items-center">
                                <span>Concluída em:</span>
                                <span>{new Date(offer.endDate).toLocaleDateString('pt-BR')}</span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                        
                        <CardFooter className="p-4 pt-0">
                          <Button className="w-full" asChild>
                            <Link to={`/offer/${offer.id}`}>
                              {offer.status === 'active' ? (
                                <>
                                  Investir
                                  <ArrowUpRight className="ml-2 h-4 w-4" />
                                </>
                              ) : (
                                <>
                                  Ver Detalhes
                                  <ChevronRight className="ml-2 h-4 w-4" />
                                </>
                              )}
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-2">
                    Nenhuma oferta encontrada
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                    Não encontramos ofertas que correspondam aos seus filtros. 
                    Tente ajustar os critérios de busca.
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default InvestorPortal;
