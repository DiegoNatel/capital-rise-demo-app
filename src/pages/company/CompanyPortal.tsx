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
import { ChevronRight, CheckCircle, Users, DollarSign, TrendingUp, Briefcase, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { companies } from "@/data/companies";
import { offersWithCompanyData } from "@/data/offers";

// Sample company for demo purposes
const companyData = companies[0];
const activeOffers = offersWithCompanyData.filter(offer => 
  offer.companyId === companyData.id && offer.status === "active"
);

const CompanyPortal = () => {
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
            <Button variant="outline" className="w-full">
              <FileText className="mr-2 h-4 w-4" />
              Editar Perfil
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
                  <Link to="/company/offers">
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
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <FilePlus className="h-12 w-12 text-slate-300 dark:text-slate-600 mb-4" />
                    <p className="text-slate-500 dark:text-slate-400 mb-4">
                      Você não tem nenhuma oferta ativa no momento
                    </p>
                    <Button asChild>
                      <Link to="/company/create-offer">
                        Criar Oferta
                      </Link>
                    </Button>
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
              <CardFooter>
                <Button variant="outline" size="sm" asChild className="ml-auto">
                  <Link to="/company/financials">
                    Ver Relatório Completo
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Offers Tab */}
          <TabsContent value="offers" className="space-y-8 mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Todas as Ofertas</CardTitle>
                  <CardDescription>
                    Histórico completo de captações
                  </CardDescription>
                </div>
                <Button asChild>
                  <Link to="/company/create-offer">
                    <FilePlus className="mr-2 h-4 w-4" />
                    Nova Oferta
                  </Link>
                </Button>
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
                          <Button variant="outline" size="sm">
                            {offer.status === 'active' ? 'Gerenciar' : 'Ver Detalhes'}
                          </Button>
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
                
                <div>
                  <h3 className="font-medium text-lg mb-4">Cap Table</h3>
                  <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-700">
                          <th className="text-left p-3 text-sm font-medium">Acionista</th>
                          <th className="text-right p-3 text-sm font-medium">Percentual</th>
                          <th className="text-right p-3 text-sm font-medium">Valor</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-slate-200 dark:border-slate-700">
                          <td className="p-3">Fundadores</td>
                          <td className="text-right p-3">65%</td>
                          <td className="text-right p-3">R$ {(companyData.valuation * 0.65).toLocaleString()}</td>
                        </tr>
                        <tr className="border-t border-slate-200 dark:border-slate-700">
                          <td className="p-3">Investidores Anjo</td>
                          <td className="text-right p-3">15%</td>
                          <td className="text-right p-3">R$ {(companyData.valuation * 0.15).toLocaleString()}</td>
                        </tr>
                        <tr className="border-t border-slate-200 dark:border-slate-700">
                          <td className="p-3">Tokenholders</td>
                          <td className="text-right p-3">12%</td>
                          <td className="text-right p-3">R$ {(companyData.valuation * 0.12).toLocaleString()}</td>
                        </tr>
                        <tr className="border-t border-slate-200 dark:border-slate-700">
                          <td className="p-3">Pool de Opções</td>
                          <td className="text-right p-3">8%</td>
                          <td className="text-right p-3">R$ {(companyData.valuation * 0.08).toLocaleString()}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full flex justify-end space-x-4">
                  <Button variant="outline">Atualizar Dados</Button>
                  <Button variant="outline">Fazer Upload de Documentos</Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Investors Tab */}
          <TabsContent value="investors" className="space-y-8 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Base de Investidores</CardTitle>
                <CardDescription>
                  Perfil e distribuição dos investidores
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Total de Investidores</p>
                    <p className="text-3xl font-bold mt-1">142</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Ticket Médio</p>
                    <p className="text-3xl font-bold mt-1">R$ 22.887</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Retenção</p>
                    <p className="text-3xl font-bold mt-1">94%</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-4">Distribuição Geográfica</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-slate-50 dark:bg-slate-700">
                            <th className="text-left p-3 text-sm font-medium">Região</th>
                            <th className="text-right p-3 text-sm font-medium">Investidores</th>
                            <th className="text-right p-3 text-sm font-medium">Percentual</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t border-slate-200 dark:border-slate-700">
                            <td className="p-3">Sudeste</td>
                            <td className="text-right p-3">87</td>
                            <td className="text-right p-3">61.3%</td>
                          </tr>
                          <tr className="border-t border-slate-200 dark:border-slate-700">
                            <td className="p-3">Sul</td>
                            <td className="text-right p-3">24</td>
                            <td className="text-right p-3">16.9%</td>
                          </tr>
                          <tr className="border-t border-slate-200 dark:border-slate-700">
                            <td className="p-3">Nordeste</td>
                            <td className="text-right p-3">18</td>
                            <td className="text-right p-3">12.7%</td>
                          </tr>
                          <tr className="border-t border-slate-200 dark:border-slate-700">
                            <td className="p-3">Centro-Oeste</td>
                            <td className="text-right p-3">9</td>
                            <td className="text-right p-3">6.3%</td>
                          </tr>
                          <tr className="border-t border-slate-200 dark:border-slate-700">
                            <td className="p-3">Norte</td>
                            <td className="text-right p-3">4</td>
                            <td className="text-right p-3">2.8%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="h-64 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                      <div className="text-center text-slate-500 dark:text-slate-400">
                        <p>Mapa de calor indisponível na versão demo</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-4">Tipos de Investidores</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                      <p className="font-medium mb-1">Pessoa Física</p>
                      <div className="w-full h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-brand-blue-500 rounded-full" 
                          style={{ width: '82%' }}
                        />
                      </div>
                      <div className="flex justify-between mt-1 text-sm">
                        <span>82%</span>
                        <span>116 investidores</span>
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                      <p className="font-medium mb-1">Pessoa Jurídica</p>
                      <div className="w-full h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-brand-green-500 rounded-full" 
                          style={{ width: '13%' }}
                        />
                      </div>
                      <div className="flex justify-between mt-1 text-sm">
                        <span>13%</span>
                        <span>19 investidores</span>
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                      <p className="font-medium mb-1">Institucional</p>
                      <div className="w-full h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-purple-500 rounded-full" 
                          style={{ width: '5%' }}
                        />
                      </div>
                      <div className="flex justify-between mt-1 text-sm">
                        <span>5%</span>
                        <span>7 investidores</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default CompanyPortal;
