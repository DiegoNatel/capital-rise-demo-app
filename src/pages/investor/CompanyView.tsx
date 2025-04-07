import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Check, FilePlus, Users } from "lucide-react";
import { companies, Company } from "@/data/companies";
import { offersWithCompanyData } from "@/data/offers";

const CompanyView = () => {
  const { id } = useParams();
  const [company, setCompany] = useState<Company | null>(null);
  
  useEffect(() => {
    // Find company by ID
    const foundCompany = companies.find(c => c.id === id);
    if (foundCompany) {
      setCompany(foundCompany);
    }
  }, [id]);

  if (!company) {
    return (
      <MainLayout>
        <div className="container py-8">
          <p>Empresa não encontrada</p>
        </div>
      </MainLayout>
    );
  }

  // Filter offers for this company
  const companyOffers = offersWithCompanyData.filter(
    offer => offer.companyId === company.id
  );

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: value >= 1000000 ? 1 : 2
    }).format(value);
  };

  return (
    <MainLayout>
      <div className="container py-8">
        {/* Company Header */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Company Logo */}
            <div className="h-20 w-20 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold text-2xl">
              {company.name.substring(0, 2)}
            </div>
            
            {/* Company Info */}
            <div className="flex-grow">
              <h1 className="text-3xl font-bold">{company.name}</h1>
              <p className="text-slate-500 dark:text-slate-400">
                {company.industry} • {company.location} • Fundada em {company.foundedYear}
              </p>
            </div>
            
            {/* Action Buttons */}
            <div>
              <Button asChild>
                <Link to={`/offer/${companyOffers[0]?.id || '#'}`}>
                  <FilePlus className="mr-2 h-4 w-4" />
                  Nova Oferta
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Company Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
              <p className="text-sm text-slate-500 dark:text-slate-400">Valuation</p>
              <p className="text-lg font-semibold">
                {formatCurrency(company.valuation)}
              </p>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
              <p className="text-sm text-slate-500 dark:text-slate-400">Funcionários</p>
              <p className="text-lg font-semibold">{company.employees}</p>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
              <p className="text-sm text-slate-500 dark:text-slate-400">Crescimento Anual</p>
              <p className="text-lg font-semibold text-green-500">+{company.growth}%</p>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
              <p className="text-sm text-slate-500 dark:text-slate-400">Capital Captado</p>
              <p className="text-lg font-semibold">R$ 3.2M</p>
            </div>
          </div>
        </div>
        
        {/* Tabs Navigation */}
        <Tabs defaultValue="overview" className="mt-4">
          <TabsList className="w-full bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            <TabsTrigger 
              value="overview"
              className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 rounded-md"
            >
              Visão Geral
            </TabsTrigger>
            <TabsTrigger 
              value="offers"
              className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 rounded-md"
            >
              Ofertas
            </TabsTrigger>
            <TabsTrigger 
              value="financials"
              className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 rounded-md"
            >
              Financeiro
            </TabsTrigger>
            <TabsTrigger 
              value="investors"
              className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 rounded-md"
            >
              Investidores
            </TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Resumo da Empresa</CardTitle>
                <CardDescription>
                  Informações gerais e destaques da operação
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium text-lg mb-2">Sobre nós</h3>
                  <p className="text-slate-600 dark:text-slate-300">{company.description}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-3">Destaques</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {company.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start">
                        <div className="mt-0.5 mr-3">
                          <Check className="h-5 w-5 text-green-500" />
                        </div>
                        <p>{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-4">Equipe de Liderança</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {company.team.map((member, index) => (
                      <div key={index} className="flex flex-col items-center text-center">
                        <div className="h-20 w-20 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mb-3">
                          <Users className="h-8 w-8 text-slate-500" />
                        </div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{member.position}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Other tabs would be implemented here */}
          <TabsContent value="offers">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Ofertas</CardTitle>
                <CardDescription>
                  Oportunidades de investimento disponíveis
                </CardDescription>
              </CardHeader>
              <CardContent>
                {companyOffers.length > 0 ? (
                  <div className="space-y-4">
                    {companyOffers.map((offer) => (
                      <div key={offer.id} className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                        <h3 className="font-medium text-lg">{offer.title}</h3>
                        <p className="text-slate-500 dark:text-slate-400 mb-4">{offer.description.substring(0, 100)}...</p>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">Meta: {formatCurrency(offer.goalAmount)}</span>
                          <span className="text-sm">Captado: {formatCurrency(offer.raisedAmount)}</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-4">
                          <div 
                            className="h-full bg-green-500 rounded-full" 
                            style={{ width: `${Math.min((offer.raisedAmount / offer.goalAmount) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <Button size="sm" asChild className="mt-2">
                          <Link to={`/offer/${offer.id}`}>
                            Ver Detalhes
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Nenhuma oferta disponível no momento.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="financials">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Informações Financeiras</CardTitle>
                <CardDescription>
                  Demonstrações financeiras e indicadores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-lg mb-2">Receita e Lucro</h3>
                    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-slate-50 dark:bg-slate-700">
                            <th className="text-left p-3 text-sm font-medium">Ano</th>
                            <th className="text-right p-3 text-sm font-medium">Receita</th>
                            <th className="text-right p-3 text-sm font-medium">Lucro</th>
                          </tr>
                        </thead>
                        <tbody>
                          {company.financials.years.map((year, index) => (
                            <tr key={year} className="border-t border-slate-200 dark:border-slate-700">
                              <td className="p-3">{year}</td>
                              <td className="text-right p-3">{formatCurrency(company.financials.revenue[index])}</td>
                              <td className="text-right p-3">{formatCurrency(company.financials.profit[index])}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="investors">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Investidores</CardTitle>
                <CardDescription>
                  Informações sobre a base de investidores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Informações detalhadas sobre investidores disponíveis apenas para usuários autorizados.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default CompanyView;
