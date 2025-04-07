
import { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowUpRight, 
  ChevronRight, 
  Filter, 
  Search 
} from "lucide-react";
import { offersWithCompanyData } from "@/data/offers";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter offers based on search query
  const filteredOffers = offersWithCompanyData.filter(offer => 
    offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    offer.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    offer.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Marketplace</h1>
            <p className="text-slate-500 dark:text-slate-400">
              Explore oportunidades de investimento em startups brasileiras
            </p>
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <Input
                placeholder="Buscar oportunidades..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter size={18} />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList>
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="active">Ativas</TabsTrigger>
            <TabsTrigger value="tech">Tecnologia</TabsTrigger>
            <TabsTrigger value="clean-energy">Energia Limpa</TabsTrigger>
            <TabsTrigger value="fintech">Fintech</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOffers.map((offer) => (
                <Card key={offer.id} className="overflow-hidden">
                  <div className="h-3 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{offer.title}</h3>
                        <Link 
                          to={`/company/${offer.companyId}`} 
                          className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary hover:underline flex items-center"
                        >
                          {offer.companyName}
                          <ChevronRight className="h-3 w-3 ml-1" />
                        </Link>
                      </div>
                      <div className={`px-2 py-1 text-xs rounded-full ${
                        offer.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' :
                        offer.status === 'completed' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400' :
                        offer.status === 'upcoming' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400' :
                        'bg-slate-100 text-slate-700 dark:bg-slate-900/40 dark:text-slate-400'
                      }`}>
                        {offer.status === 'active' ? 'Ativa' :
                         offer.status === 'completed' ? 'Concluída' :
                         offer.status === 'upcoming' ? 'Em breve' :
                         'Cancelada'}
                      </div>
                    </div>
                    
                    <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-4">
                      {offer.description}
                    </p>
                    
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">
                          R$ {offer.raisedAmount.toLocaleString()}
                        </span>
                        <span className="text-sm text-slate-500">
                          Meta: R$ {offer.goalAmount.toLocaleString()}
                        </span>
                      </div>
                      <Progress 
                        value={Math.round((offer.raisedAmount / offer.goalAmount) * 100)} 
                        className="h-2 mb-2"
                      />
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>{Math.round((offer.raisedAmount / offer.goalAmount) * 100)}% completo</span>
                        <span>{offer.investors} investidores</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm mb-4">
                      <div className="flex items-center">
                        <span className="font-medium">{offer.industry}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">{offer.tokenSymbol} • R$ {offer.tokenPrice.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full" asChild>
                      <Link to={`/offer/${offer.id}`}>
                        Ver Oferta
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Additional tabs would follow the same pattern */}
          <TabsContent value="active">
            <div className="py-8 text-center text-slate-500">
              Conteúdo filtrado será mostrado aqui.
            </div>
          </TabsContent>
          <TabsContent value="tech">
            <div className="py-8 text-center text-slate-500">
              Conteúdo filtrado será mostrado aqui.
            </div>
          </TabsContent>
          <TabsContent value="clean-energy">
            <div className="py-8 text-center text-slate-500">
              Conteúdo filtrado será mostrado aqui.
            </div>
          </TabsContent>
          <TabsContent value="fintech">
            <div className="py-8 text-center text-slate-500">
              Conteúdo filtrado será mostrado aqui.
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Marketplace;
