
import { Link, useParams } from "react-router-dom";
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
import { ChevronRight, BarChart3, Users, DollarSign, CheckCircle, FileText, Briefcase, Calendar, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { companies } from "@/data/companies";
import { offersWithCompanyData } from "@/data/offers";
import InvestorsTab from "./components/InvestorsTab";

const CompanyProfile = () => {
  const { id } = useParams();
  // Find company by ID, or use the first company as a fallback for demo
  const companyData = companies.find(company => company.id === id) || companies[0];
  const activeOffers = offersWithCompanyData.filter(offer => 
    offer.companyId === companyData.id && offer.status === "active"
  );

  return (
    <MainLayout>
      <div className="container py-8">
        {/* Company Header */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="h-20 w-20 bg-white shadow rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold text-brand-blue-500">{companyData.name.substring(0, 2)}</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold">{companyData.name}</h1>
                <p className="text-slate-500 dark:text-slate-400">
                  {companyData.industry} • {companyData.location} • Fundada em {companyData.foundedYear}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4">
                <p className="text-sm text-slate-500 dark:text-slate-400">Valuation</p>
                <p className="text-lg font-semibold">R$ {(companyData.valuation / 1000000).toFixed(1)}M</p>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4">
                <p className="text-sm text-slate-500 dark:text-slate-400">Funcionários</p>
                <p className="text-lg font-semibold">{companyData.employees}</p>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4">
                <p className="text-sm text-slate-500 dark:text-slate-400">Crescimento Anual</p>
                <p className="text-lg font-semibold text-green-500">+{companyData.growth}%</p>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4">
                <p className="text-sm text-slate-500 dark:text-slate-400">Capital Captado</p>
                <p className="text-lg font-semibold">R$ 3.2M</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 min-w-[200px]">
            <Button className="w-full">
              Investir Agora
            </Button>
            <Button variant="outline" className="w-full">
              <FileText className="mr-2 h-4 w-4" />
              Ver Documentos
            </Button>
          </div>
        </div>
        
        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="mt-8">
          <TabsList className="grid grid-cols-4 w-full max-w-3xl">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="offers">Ofertas</TabsTrigger>
            <TabsTrigger value="financials">Financeiro</TabsTrigger>
            <TabsTrigger value="investors">Investidores</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Resumo da Empresa</CardTitle>
                <CardDescription>
                  Informações gerais e destaques da operação
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-lg mb-2">Sobre nós</h3>
                  <p className="text-slate-600 dark:text-slate-300">{companyData.description}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Destaques</h3>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {companyData.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-4">Equipe de Liderança</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {companyData.team.map((member, index) => (
                      <div key={index} className="text-center">
                        <div className="h-20 w-20 mx-auto rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mb-3">
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
            
            {/* Active Offerings */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Ofertas Ativas</CardTitle>
                  <CardDescription>
                    Captações em andamento
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/marketplace">
                    Ver Todas
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                {activeOffers.length > 0 ? (
                  <div className="space-y-6">
                    {activeOffers.map((offer) => (
                      <div key={offer.id} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                        <h3 className="font-medium text-lg mb-2">{offer.title}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
                          {offer.description}
                        </p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Meta</p>
                            <p className="font-medium">R$ {offer.goalAmount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Captado</p>
                            <p className="font-medium">R$ {offer.raisedAmount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Investidores</p>
                            <p className="font-medium">{offer.investors}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Token</p>
                            <p className="font-medium">{offer.tokenSymbol} (R$ {offer.tokenPrice.toFixed(2)})</p>
                          </div>
                        </div>
                        
                        <div className="mb-1 flex justify-between text-xs text-slate-500 dark:text-slate-400">
                          <span>Progresso:</span>
                          <span>{Math.round((offer.raisedAmount / offer.goalAmount) * 100)}%</span>
                        </div>
                        <Progress 
                          value={Math.round((offer.raisedAmount / offer.goalAmount) * 100)} 
                          className="h-2 mb-4"
                        />
                        
                        <div className="text-sm text-slate-500 dark:text-slate-400 flex justify-between items-center">
                          <span>Início: {new Date(offer.startDate).toLocaleDateString('pt-BR')}</span>
                          <span>Término: {new Date(offer.endDate).toLocaleDateString('pt-BR')}</span>
                        </div>
                        
                        <div className="flex justify-end mt-4">
                          <Button asChild>
                            <Link to={`/offer/${offer.id}`}>
                              Investir
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <p className="text-slate-500 dark:text-slate-400">
                      Esta empresa não tem ofertas ativas no momento
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Performance Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Desempenho Financeiro</CardTitle>
                <CardDescription>
                  Visão geral dos principais indicadores financeiros
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-5">
                    <div className="mb-3 flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                        <TrendingUp className="h-5 w-5 text-blue-500" />
                      </div>
                      <h3 className="font-medium">Receita Anual</h3>
                    </div>
                    <p className="text-2xl font-bold">
                      R$ {companyData.financials.revenue[companyData.financials.revenue.length - 1].toLocaleString()}
                    </p>
                    <p className="text-sm text-green-500 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +{Math.round((companyData.financials.revenue[companyData.financials.revenue.length - 1] / companyData.financials.revenue[companyData.financials.revenue.length - 2] - 1) * 100)}% vs. ano anterior
                    </p>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-5">
                    <div className="mb-3 flex items-center">
                      <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                        <DollarSign className="h-5 w-5 text-green-500" />
                      </div>
                      <h3 className="font-medium">Lucro Líquido</h3>
                    </div>
                    <p className="text-2xl font-bold">
                      R$ {companyData.financials.profit[companyData.financials.profit.length - 1].toLocaleString()}
                    </p>
                    <p className="text-sm text-green-500 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Margem de {Math.round((companyData.financials.profit[companyData.financials.profit.length - 1] / companyData.financials.revenue[companyData.financials.revenue.length - 1]) * 100)}%
                    </p>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-5">
                    <div className="mb-3 flex items-center">
                      <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3">
                        <BarChart3 className="h-5 w-5 text-purple-500" />
                      </div>
                      <h3 className="font-medium">Valor por Ação</h3>
                    </div>
                    <p className="text-2xl font-bold">
                      R$ 3.47
                    </p>
                    <p className="text-sm text-green-500 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +17.2% nos últimos 12 meses
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Offers Tab */}
          <TabsContent value="offers" className="space-y-8 mt-6">
            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Todas as Ofertas</CardTitle>
                  <CardDescription>
                    Histórico completo de captações
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {offersWithCompanyData
                    .filter(offer => offer.companyId === companyData.id)
                    .map((offer) => (
                      <div key={offer.id} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-lg">{offer.title}</h3>
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
                        
                        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
                          {offer.description}
                        </p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Meta</p>
                            <p className="font-medium">R$ {offer.goalAmount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Captado</p>
                            <p className="font-medium">R$ {offer.raisedAmount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Investidores</p>
                            <p className="font-medium">{offer.investors}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Período</p>
                            <p className="font-medium">
                              {new Date(offer.startDate).toLocaleDateString('pt-BR')} - {new Date(offer.endDate).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                        </div>
                        
                        {offer.status !== 'upcoming' && (
                          <>
                            <div className="mb-1 flex justify-between text-xs text-slate-500 dark:text-slate-400">
                              <span>Progresso:</span>
                              <span>{Math.round((offer.raisedAmount / offer.goalAmount) * 100)}%</span>
                            </div>
                            <Progress 
                              value={Math.round((offer.raisedAmount / offer.goalAmount) * 100)} 
                              className="h-2 mb-4"
                            />
                          </>
                        )}
                        
                        <div className="flex justify-end mt-2">
                          {offer.status === 'active' && (
                            <Button asChild>
                              <Link to={`/offer/${offer.id}`}>
                                Investir
                              </Link>
                            </Button>
                          )}
                          {offer.status !== 'active' && (
                            <Button variant="outline" size="sm">
                              Ver Detalhes
                            </Button>
                          )}
                        </div>
                      </div>
                    ))
                  }
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Financials Tab */}
          <TabsContent value="financials" className="space-y-8 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Financeiras</CardTitle>
                <CardDescription>
                  Demonstrações financeiras e indicadores
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Income Statement */}
                <div>
                  <h3 className="font-medium text-lg mb-4">Demonstrativo de Resultados</h3>
                  <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-700">
                          <th className="text-left p-3 text-sm font-medium">Item</th>
                          {companyData.financials.years.map((year, index) => (
                            <th key={index} className="text-right p-3 text-sm font-medium">{year}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-slate-200 dark:border-slate-700">
                          <td className="p-3">Receita</td>
                          {companyData.financials.revenue.map((value, index) => (
                            <td key={index} className="text-right p-3">R$ {value.toLocaleString()}</td>
                          ))}
                        </tr>
                        <tr className="border-t border-slate-200 dark:border-slate-700">
                          <td className="p-3">Lucro Bruto</td>
                          {companyData.financials.revenue.map((value, index) => (
                            <td key={index} className="text-right p-3">R$ {Math.round(value * 0.65).toLocaleString()}</td>
                          ))}
                        </tr>
                        <tr className="border-t border-slate-200 dark:border-slate-700">
                          <td className="p-3">Despesas Operacionais</td>
                          {companyData.financials.revenue.map((value, index) => (
                            <td key={index} className="text-right p-3">R$ {Math.round(value * 0.5).toLocaleString()}</td>
                          ))}
                        </tr>
                        <tr className="border-t border-slate-200 dark:border-slate-700 font-medium">
                          <td className="p-3">Lucro Líquido</td>
                          {companyData.financials.profit.map((value, index) => (
                            <td key={index} className="text-right p-3">R$ {value.toLocaleString()}</td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Balance Sheet */}
                <div>
                  <h3 className="font-medium text-lg mb-4">Balanço Patrimonial</h3>
                  <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-700">
                          <th className="text-left p-3 text-sm font-medium">Item</th>
                          <th className="text-right p-3 text-sm font-medium">{companyData.financials.years[companyData.financials.years.length - 1]}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-slate-200 dark:border-slate-700">
                          <td className="p-3 font-medium">Ativos</td>
                          <td className="text-right p-3"></td>
                        </tr>
                        <tr className="border-t border-slate-200 dark:border-slate-700">
                          <td className="p-3 pl-6">Caixa e Equivalentes</td>
                          <td className="text-right p-3">R$ {Math.round(companyData.valuation * 0.12).toLocaleString()}</td>
                        </tr>
                        <tr className="border-t border-slate-200 dark:border-slate-700">
                          <td className="p-3 pl-6">Contas a Receber</td>
                          <td className="text-right p-3">R$ {Math.round(companyData.valuation * 0.08).toLocaleString()}</td>
                        </tr>
                        <tr className="border-t border-slate-200 dark:border-slate-700">
                          <td className="p-3 pl-6">Ativos Fixos</td>
                          <td className="text-right p-3">R$ {Math.round(companyData.valuation * 0.35).toLocaleString()}</td>
                        </tr>
                        <tr className="border-t border-slate-200 dark:border-slate-700">
                          <td className="p-3 pl-6">Outros Ativos</td>
                          <td className="text-right p-3">R$ {Math.round(companyData.valuation * 0.15).toLocaleString()}</td>
                        </tr>
                        <tr className="border-t border-slate-200 dark:border-slate-700 font-medium">
                          <td className="p-3">Total de Ativos</td>
                          <td className="text-right p-3">R$ {Math.round(companyData.valuation * 0.7).toLocaleString()}</td>
                        </tr>
                        <tr className="border-t border-slate-200 dark:border-slate-700">
                          <td className="p-3 font-medium">Passivos</td>
                          <td className="text-right p-3"></td>
                        </tr>
                        <tr className="border-t border-slate-200 dark:border-slate-700">
                          <td className="p-3 pl-6">Contas a Pagar</td>
                          <td className="text-right p-3">R$ {Math.round(companyData.valuation * 0.05).toLocaleString()}</td>
                        </tr>
                        <tr className="border-t border-slate-200 dark:border-slate-700">
                          <td className="p-3 pl-6">Empréstimos</td>
                          <td className="text-right p-3">R$ {Math.round(companyData.valuation * 0.15).toLocaleString()}</td>
                        </tr>
                        <tr className="border-t border-slate-200 dark:border-slate-700">
                          <td className="p-3 pl-6">Outros Passivos</td>
                          <td className="text-right p-3">R$ {Math.round(companyData.valuation * 0.1).toLocaleString()}</td>
                        </tr>
                        <tr className="border-t border-slate-200 dark:border-slate-700">
                          <td className="p-3 font-medium">Patrimônio Líquido</td>
                          <td className="text-right p-3">R$ {Math.round(companyData.valuation * 0.4).toLocaleString()}</td>
                        </tr>
                        <tr className="border-t border-slate-200 dark:border-slate-700 font-medium">
                          <td className="p-3">Total de Passivos e Patrimônio</td>
                          <td className="text-right p-3">R$ {Math.round(companyData.valuation * 0.7).toLocaleString()}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Cash Flow */}
                <div>
                  <h3 className="font-medium text-lg mb-4">Fluxo de Caixa</h3>
                  <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-700">
                          <th className="text-left p-3 text-sm font-medium">Item</th>
                          <th className="text-right p-3 text-sm font-medium">{companyData.financials.years[companyData.financials.years.length - 1]}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-slate-200 dark:border-slate-700">
                          <td className="p-3">Lucro Líquido</td>
                          <td className="text-right p-3">R$ {companyData.financials.profit[companyData.financials.profit.length - 1].toLocaleString()}</td>
                        </tr>
                        <tr className="border-t border-slate-200 dark:border-slate-700">
                          <td className="p-3">Depreciação e Amortização</td>
                          <td className="text-right p-3">R$ {Math.round(companyData.valuation * 0.03).toLocaleString()}</td>
                        </tr>
                        <tr className="border-t border-slate-200 dark:border-slate-700">
                          <td className="p-3">Variação do Capital de Giro</td>
                          <td className="text-right p-3">R$ {Math.round(companyData.valuation * -0.02).toLocaleString()}</td>
                        </tr>
                        <tr className="border-t border-slate-200 dark:border-slate-700 font-medium">
                          <td className="p-3">Fluxo de Caixa Operacional</td>
                          <td className="text-right p-3">R$ {(companyData.financials.profit[companyData.financials.profit.length - 1] + Math.round(companyData.valuation * 0.01)).toLocaleString()}</td>
                        </tr>
                        <tr className="border-t border-slate-200 dark:border-slate-700">
                          <td className="p-3">Investimentos em Ativos</td>
                          <td className="text-right p-3">R$ {Math.round(companyData.valuation * -0.08).toLocaleString()}</td>
                        </tr>
                        <tr className="border-t border-slate-200 dark:border-slate-700 font-medium">
                          <td className="p-3">Fluxo de Caixa de Investimentos</td>
                          <td className="text-right p-3">R$ {Math.round(companyData.valuation * -0.08).toLocaleString()}</td>
                        </tr>
                        <tr className="border-t border-slate-200 dark:border-slate-700">
                          <td className="p-3">Captações</td>
                          <td className="text-right p-3">R$ {Math.round(companyData.valuation * 0.05).toLocaleString()}</td>
                        </tr>
                        <tr className="border-t border-slate-200 dark:border-slate-700">
                          <td className="p-3">Pagamentos de Dívidas</td>
                          <td className="text-right p-3">R$ {Math.round(companyData.valuation * -0.03).toLocaleString()}</td>
                        </tr>
                        <tr className="border-t border-slate-200 dark:border-slate-700 font-medium">
                          <td className="p-3">Fluxo de Caixa de Financiamento</td>
                          <td className="text-right p-3">R$ {Math.round(companyData.valuation * 0.02).toLocaleString()}</td>
                        </tr>
                        <tr className="border-t border-slate-200 dark:border-slate-700 font-medium">
                          <td className="p-3">Variação Líquida de Caixa</td>
                          <td className="text-right p-3">R$ {Math.round(companyData.valuation * 0.04).toLocaleString()}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Financial Indicators */}
                <div>
                  <h3 className="font-medium text-lg mb-4">Indicadores Financeiros</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <Calendar className="h-5 w-5 text-slate-500 mr-2" />
                        <h4 className="font-medium">Margem Líquida</h4>
                      </div>
                      <p className="text-2xl font-semibold">
                        {Math.round((companyData.financials.profit[companyData.financials.profit.length - 1] / companyData.financials.revenue[companyData.financials.revenue.length - 1]) * 100)}%
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Último ano fiscal
                      </p>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <TrendingUp className="h-5 w-5 text-slate-500 mr-2" />
                        <h4 className="font-medium">Taxa de Crescimento</h4>
                      </div>
                      <p className="text-2xl font-semibold">
                        {companyData.growth}%
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        CAGR 3 anos
                      </p>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <Briefcase className="h-5 w-5 text-slate-500 mr-2" />
                        <h4 className="font-medium">ROI Projetado</h4>
                      </div>
                      <p className="text-2xl font-semibold">
                        32%
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        5 anos (estimativa)
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Investors Tab */}
          <TabsContent value="investors">
            <InvestorsTab companyData={companyData} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default CompanyProfile;
