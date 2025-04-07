
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  Building,
  User,
  BarChart3,
  DollarSign,
  TrendingUp,
  RefreshCw,
  FileText,
  Bell,
  MoreHorizontal,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "@/components/layout/MainLayout";
import { portfolioSummary, portfolioItems } from "@/data/portfolio";
import { tokens } from "@/data/tokens";
import { offersWithCompanyData } from "@/data/offers";

const Dashboard = () => {
  const [dashboardType, setDashboardType] = useState<'investor' | 'company'>('investor');
  
  // Simplified data for charts
  const activeOffers = offersWithCompanyData.filter(offer => offer.status === 'active');
  
  // Portfolio allocation by industry
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  // Recent activities data
  const recentActivities = [
    {
      id: 1,
      title: "Investimento realizado",
      description: "Você investiu R$ 5.000 em GreenTech Solutions",
      time: "1 hora atrás",
      type: "investment",
    },
    {
      id: 2,
      title: "Token vendido",
      description: "Você vendeu 500 tokens HST por R$ 1.325",
      time: "2 dias atrás",
      type: "sale",
    },
    {
      id: 3,
      title: "Dividendos recebidos",
      description: "Recebimento de R$ 320 em dividendos de AgroSmart",
      time: "5 dias atrás",
      type: "dividend",
    },
  ];
  
  return (
    <MainLayout>
      <div className="container py-8">
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Bem-vindo de volta, acompanhe seus indicadores e atividades
            </p>
          </div>
          
          <div className="mt-4 sm:mt-0">
            <Tabs defaultValue={dashboardType} onValueChange={(v) => setDashboardType(v as 'investor' | 'company')}>
              <TabsList>
                <TabsTrigger value="investor" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Investidor
                </TabsTrigger>
                <TabsTrigger value="company" className="flex items-center">
                  <Building className="mr-2 h-4 w-4" />
                  Empresa
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        {/* Investor Dashboard */}
        {dashboardType === 'investor' && (
          <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Total Investido
                      </p>
                      <h3 className="text-2xl font-bold mt-1">
                        R$ {portfolioSummary.totalInvestment.toLocaleString()}
                      </h3>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-brand-blue-100 dark:bg-brand-blue-900/30 flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-brand-blue-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Valor Atual
                      </p>
                      <h3 className="text-2xl font-bold mt-1">
                        R$ {portfolioSummary.currentValue.toLocaleString()}
                      </h3>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-brand-green-100 dark:bg-brand-green-900/30 flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-brand-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Rendimento
                      </p>
                      <h3 className="text-2xl font-bold mt-1 text-green-500">
                        +{portfolioSummary.totalProfitLossPercentage.toFixed(2)}%
                      </h3>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Ativos
                      </p>
                      <h3 className="text-2xl font-bold mt-1">
                        {portfolioItems.length}
                      </h3>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-brand-blue-100 dark:bg-brand-blue-900/30 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-brand-blue-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Portfolio Performance Chart and Allocation */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Desempenho do Portfólio</CardTitle>
                  <CardDescription>
                    Evolução do valor de seus investimentos nos últimos 6 meses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={portfolioSummary.performanceHistory}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis 
                          dataKey="date" 
                          tickFormatter={(value) => {
                            const date = new Date(value);
                            return `${date.toLocaleString('default', { month: 'short' })}`;
                          }}
                        />
                        <YAxis 
                          tickFormatter={(value) => `R$ ${value.toLocaleString()}`}
                        />
                        <Tooltip 
                          formatter={(value: any) => [`R$ ${Number(value).toLocaleString()}`, 'Valor']}
                          labelFormatter={(label) => {
                            const date = new Date(label);
                            return `${date.toLocaleString('default', { month: 'long', year: 'numeric' })}`;
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#0066FF"
                          activeDot={{ r: 8 }}
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Alocação por Indústria</CardTitle>
                  <CardDescription>
                    Distribuição dos seus investimentos por setor
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={portfolioSummary.allocationByIndustry}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="percentage"
                          nameKey="industry"
                          label={({ industry, percentage }) => `${industry}: ${percentage.toFixed(1)}%`}
                        >
                          {portfolioSummary.allocationByIndustry.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value: any) => [`${Number(value).toFixed(1)}%`, 'Percentual']}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Portfolio and Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Meu Portfólio</CardTitle>
                    <CardDescription>
                      Desempenho dos seus ativos
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/investor/portfolio">
                      Ver Tudo
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {portfolioItems.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mr-3">
                            <span className="font-bold text-sm">{item.tokenSymbol}</span>
                          </div>
                          <div>
                            <p className="font-medium">{item.tokenName}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{item.companyName}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">R$ {item.currentValue.toLocaleString()}</p>
                          <div className={`text-sm flex items-center justify-end ${item.profitLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {item.profitLoss >= 0 ? (
                              <ArrowUpRight className="h-3 w-3 mr-1" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3 mr-1" />
                            )}
                            {item.profitLossPercentage.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Atividades Recentes</CardTitle>
                    <CardDescription>
                      Últimas transações e eventos
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="icon">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start">
                        <div className={`h-9 w-9 rounded-full flex items-center justify-center mr-3 mt-0.5 ${
                          activity.type === 'investment' ? 'bg-green-100 text-green-600' :
                          activity.type === 'sale' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'
                        }`}>
                          {activity.type === 'investment' && <ArrowUpRight className="h-5 w-5" />}
                          {activity.type === 'sale' && <ArrowDownRight className="h-5 w-5" />}
                          {activity.type === 'dividend' && <DollarSign className="h-5 w-5" />}
                        </div>
                        <div>
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{activity.description}</p>
                          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Recommended Opportunities */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Oportunidades Recomendadas</CardTitle>
                  <CardDescription>
                    Ofertas baseadas no seu perfil e histórico de investimentos
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/investor">
                    Ver Todas
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeOffers.slice(0, 3).map((offer) => (
                    <div key={offer.id} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                      <div className="flex items-center mb-3">
                        <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mr-3">
                          <span className="font-bold text-sm">{offer.tokenSymbol}</span>
                        </div>
                        <div className="overflow-hidden">
                          <p className="font-medium truncate">{offer.company?.name}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{offer.company?.industry}</p>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="text-sm flex items-center justify-between mb-1">
                          <span className="text-slate-500 dark:text-slate-400">Meta:</span>
                          <span className="font-medium">R$ {offer.goalAmount.toLocaleString()}</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-brand-blue-500 to-brand-green-500 rounded-full" 
                            style={{ width: `${Math.min(100, (offer.raisedAmount / offer.goalAmount) * 100)}%` }}
                          />
                        </div>
                        <div className="text-sm text-right mt-1">
                          {Math.round((offer.raisedAmount / offer.goalAmount) * 100)}% completo
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Preço por token</p>
                          <p className="font-medium">R$ {offer.tokenPrice.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Investimento mín.</p>
                          <p className="font-medium">R$ {offer.minInvestment.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <Button size="sm" className="w-full" asChild>
                        <Link to={`/offer/${offer.id}`}>
                          Ver Detalhes
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Company Dashboard */}
        {dashboardType === 'company' && (
          <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Capital Captado
                      </p>
                      <h3 className="text-2xl font-bold mt-1">
                        R$ 3.2M
                      </h3>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-brand-blue-100 dark:bg-brand-blue-900/30 flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-brand-blue-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Investidores
                      </p>
                      <h3 className="text-2xl font-bold mt-1">
                        142
                      </h3>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-brand-green-100 dark:bg-brand-green-900/30 flex items-center justify-center">
                      <Users className="h-6 w-6 text-brand-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Valorização
                      </p>
                      <h3 className="text-2xl font-bold mt-1 text-green-500">
                        +18.5%
                      </h3>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Notificações
                      </p>
                      <h3 className="text-2xl font-bold mt-1">
                        12
                      </h3>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                      <Bell className="h-6 w-6 text-amber-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Active Offerings and Revenue Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ofertas Ativas</CardTitle>
                  <CardDescription>
                    Status das suas captações em andamento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Series A Investment Round</h4>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                        Captado: R$ 3.250.000 de R$ 5.000.000
                      </p>
                      <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-2">
                        <div 
                          className="h-full bg-gradient-to-r from-brand-blue-500 to-brand-green-500 rounded-full" 
                          style={{ width: '65%' }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500 dark:text-slate-400">65% completo</span>
                        <span className="text-slate-500 dark:text-slate-400">45 dias restantes</span>
                      </div>
                      <Button size="sm" className="w-full mt-4" variant="outline">
                        Gerenciar Oferta
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Receita vs Captação</CardTitle>
                  <CardDescription>
                    Comparação entre receita operacional e capital captado
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: 'Q1', receita: 780000, captacao: 0 },
                          { name: 'Q2', receita: 940000, captacao: 0 },
                          { name: 'Q3', receita: 1250000, captacao: 2500000 },
                          { name: 'Q4', receita: 1650000, captacao: 750000 },
                        ]}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={(value) => `${value / 1000}k`} />
                        <Tooltip formatter={(value: any) => [`R$ ${Number(value).toLocaleString()}`, '']} />
                        <Bar dataKey="receita" name="Receita" fill="#0066FF" />
                        <Bar dataKey="captacao" name="Captação" fill="#00FFC1" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Investor Activity and Company Updates */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Atividade de Investidores</CardTitle>
                    <CardDescription>
                      Interações recentes com investidores
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver Tudo
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mr-3">
                            <User className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                          </div>
                          <div>
                            <p className="font-medium">Investidor #{142 - i}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              {i === 1 ? 'Realizou investimento de R$ 25.000' : 
                               i === 2 ? 'Perguntou sobre projeções financeiras' : 
                               'Adicionou oferta aos favoritos'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Button variant="ghost" size="sm">
                            {i === 2 ? 'Responder' : 'Ver Detalhes'}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Atualizações da Empresa</CardTitle>
                    <CardDescription>
                      Comunicações enviadas aos investidores
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    Nova
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      {
                        title: "Novo Parceiro Estratégico",
                        date: "15/03/2024",
                        excerpt: "Anunciamos parceria com importante player do setor..."
                      },
                      {
                        title: "Resultados do Q4 2023",
                        date: "05/02/2024",
                        excerpt: "Apresentamos os resultados do último trimestre com..."
                      }
                    ].map((update, i) => (
                      <div key={i} className="border-b border-slate-200 dark:border-slate-700 last:border-0 pb-4 last:pb-0">
                        <h4 className="font-medium">{update.title}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          Publicado em {update.date}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                          {update.excerpt}
                        </p>
                        <Button variant="link" size="sm" className="px-0 mt-1">
                          Ler mais
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
                <CardDescription>
                  Funções frequentemente utilizadas para gestão da empresa
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button size="lg" className="h-auto py-6 flex flex-col items-center justify-center" asChild>
                  <Link to="/company/create-offer">
                    <DollarSign className="h-6 w-6 mb-2" />
                    <span>Criar Nova Oferta</span>
                  </Link>
                </Button>
                
                <Button size="lg" className="h-auto py-6 flex flex-col items-center justify-center" variant="outline">
                  <FileText className="h-6 w-6 mb-2" />
                  <span>Atualizar Documentos</span>
                </Button>
                
                <Button size="lg" className="h-auto py-6 flex flex-col items-center justify-center" variant="outline">
                  <RefreshCw className="h-6 w-6 mb-2" />
                  <span>Atualizar Cap Table</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Dashboard;
