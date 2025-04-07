
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Building,
  Calendar,
  CheckCircle,
  DollarSign,
  Download,
  FileText,
  Globe,
  HelpCircle,
  Info,
  Map,
  MessageSquare,
  Plus,
  Share2,
  ThumbsUp,
  Users,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { offersWithCompanyData } from "@/data/offers";
import { tokens } from "@/data/tokens";

const OfferDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [tokenAmount, setTokenAmount] = useState(0);
  const [dialogStep, setDialogStep] = useState(1);
  
  // Find the offer by ID
  const offer = offersWithCompanyData.find((o) => o.id === id);
  
  // Find the token for this offer
  const token = tokens.find((t) => t.symbol === offer?.tokenSymbol);
  
  // If offer doesn't exist, show error message
  if (!offer || !offer.company) {
    return (
      <MainLayout>
        <div className="container py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Oferta não encontrada</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            A oferta que você está procurando não existe ou foi removida.
          </p>
          <Button asChild>
            <Link to="/investor">Voltar para Oportunidades</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInvestmentAmount(value);
    
    if (value && !isNaN(parseFloat(value)) && offer.tokenPrice) {
      setTokenAmount(Math.floor(parseFloat(value) / offer.tokenPrice));
    } else {
      setTokenAmount(0);
    }
  };
  
  const handleInvestment = () => {
    toast({
      title: "Investimento realizado com sucesso!",
      description: `Você investiu R$ ${investmentAmount} em ${offer.company?.name}.`,
    });
    
    setDialogStep(1);
    setInvestmentAmount("");
    setTokenAmount(0);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };
  
  return (
    <MainLayout>
      <div className="container py-8">
        {/* Breadcrumb and back button */}
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" asChild className="mr-4">
            <Link to="/investor">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Oportunidades
            </Link>
          </Button>
        </div>
        
        {/* Offer Header */}
        <div className="flex flex-col md:flex-row gap-6 mb-8 items-start">
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <div className="h-20 w-20 bg-white dark:bg-slate-800 shadow rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-700">
                <span className="text-2xl font-bold text-brand-blue-500">{offer.company.name.substring(0, 2)}</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold">{offer.company.name}</h1>
                <p className="text-slate-500 dark:text-slate-400">
                  {offer.company.industry} • {offer.company.location} • Fundada em {offer.company.foundedYear}
                </p>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold mb-4">{offer.title}</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-3 border border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-500 dark:text-slate-400">Meta</p>
                <p className="text-lg font-semibold">R$ {offer.goalAmount.toLocaleString()}</p>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-3 border border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-500 dark:text-slate-400">Captado</p>
                <p className="text-lg font-semibold">R$ {offer.raisedAmount.toLocaleString()}</p>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-3 border border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-500 dark:text-slate-400">Investidores</p>
                <p className="text-lg font-semibold">{offer.investors}</p>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-3 border border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-500 dark:text-slate-400">Token</p>
                <p className="text-lg font-semibold">{offer.tokenSymbol} (R$ {offer.tokenPrice.toFixed(2)})</p>
              </div>
            </div>
            
            {offer.status !== 'upcoming' && (
              <div className="mb-6">
                <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400 mb-1">
                  <span>Progresso:</span>
                  <span>{Math.round((offer.raisedAmount / offer.goalAmount) * 100)}% completo</span>
                </div>
                <Progress 
                  value={Math.round((offer.raisedAmount / offer.goalAmount) * 100)} 
                  className="h-2"
                />
              </div>
            )}
            
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
              <div className={`px-2 py-1 rounded-full capitalize ${
                offer.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400' :
                offer.status === 'completed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400' :
                offer.status === 'upcoming' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-400' :
                'bg-slate-100 text-slate-800 dark:bg-slate-900/40 dark:text-slate-400'
              }`}>
                {offer.status === 'active' ? 'Ativa' :
                 offer.status === 'completed' ? 'Concluída' :
                 offer.status === 'upcoming' ? 'Em breve' :
                 'Cancelada'}
              </div>
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {offer.status === 'active' && `Encerra em ${formatDate(offer.endDate)}`}
                {offer.status === 'upcoming' && `Inicia em ${formatDate(offer.startDate)}`}
                {offer.status === 'completed' && `Concluída em ${formatDate(offer.endDate)}`}
              </span>
              <span className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                Mín. R$ {offer.minInvestment.toLocaleString()}
              </span>
            </div>
          </div>
          
          {/* Investment Card */}
          <div className="w-full md:w-80">
            <Card>
              <CardHeader>
                <CardTitle>Investir nesta Oferta</CardTitle>
                <CardDescription>
                  {offer.status === 'active' 
                    ? 'Adquira tokens e torne-se parte desta empresa'
                    : offer.status === 'upcoming'
                    ? 'Esta oferta ainda não está disponível para investimento'
                    : 'Esta oferta já foi encerrada'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Preço por Token</p>
                    <p className="text-2xl font-bold">R$ {offer.tokenPrice.toFixed(2)}</p>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Informações</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Investimento mínimo:</span>
                        <span className="font-medium">R$ {offer.minInvestment.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tokens disponíveis:</span>
                        <span className="font-medium">{(offer.totalTokens - offer.soldTokens).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Período de lockup:</span>
                        <span className="font-medium">6 meses</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-3">
                {offer.status === 'active' ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-gradient-to-r from-brand-blue-500 to-brand-green-500 text-white">
                        Investir Agora
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      {dialogStep === 1 && (
                        <>
                          <DialogHeader>
                            <DialogTitle>Investir em {offer.company.name}</DialogTitle>
                            <DialogDescription>
                              Informe o valor que deseja investir nesta oferta.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="investmentAmount">Valor do Investimento (R$)</Label>
                                <div className="relative mt-1">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-slate-500 dark:text-slate-400">R$</span>
                                  </div>
                                  <Input
                                    id="investmentAmount"
                                    className="pl-10"
                                    value={investmentAmount}
                                    onChange={handleAmountChange}
                                    type="number"
                                    min={offer.minInvestment}
                                    placeholder={offer.minInvestment.toString()}
                                  />
                                </div>
                                {parseFloat(investmentAmount) < offer.minInvestment && investmentAmount !== "" && (
                                  <p className="text-xs text-red-500 mt-1">
                                    O valor mínimo de investimento é R$ {offer.minInvestment.toLocaleString()}
                                  </p>
                                )}
                              </div>
                              
                              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Resumo:</p>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span>Valor do investimento:</span>
                                    <span className="font-medium">
                                      {investmentAmount ? `R$ ${parseFloat(investmentAmount).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '-'}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Preço por token:</span>
                                    <span className="font-medium">R$ {offer.tokenPrice.toFixed(2)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Quantidade de tokens:</span>
                                    <span className="font-medium">{tokenAmount.toLocaleString()}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setDialogStep(1)}>
                              Cancelar
                            </Button>
                            <Button 
                              onClick={() => setDialogStep(2)} 
                              disabled={!investmentAmount || isNaN(parseFloat(investmentAmount)) || parseFloat(investmentAmount) < offer.minInvestment}
                            >
                              Continuar
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </DialogFooter>
                        </>
                      )}
                      
                      {dialogStep === 2 && (
                        <>
                          <DialogHeader>
                            <DialogTitle>Confirmar Investimento</DialogTitle>
                            <DialogDescription>
                              Revise os detalhes do seu investimento antes de confirmar.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                              <div className="bg-slate-50 dark:bg-slate-800 p-3 border-b border-slate-200 dark:border-slate-700">
                                <p className="font-medium">Detalhes do Investimento</p>
                              </div>
                              <div className="p-3 space-y-3">
                                <div className="flex justify-between">
                                  <span className="text-slate-500 dark:text-slate-400">Empresa:</span>
                                  <span className="font-medium">{offer.company.name}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-500 dark:text-slate-400">Oferta:</span>
                                  <span className="font-medium">{offer.title}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-500 dark:text-slate-400">Valor:</span>
                                  <span className="font-medium">R$ {parseFloat(investmentAmount).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-500 dark:text-slate-400">Tokens:</span>
                                  <span className="font-medium">{tokenAmount.toLocaleString()} {offer.tokenSymbol}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-500 dark:text-slate-400">Preço por token:</span>
                                  <span className="font-medium">R$ {offer.tokenPrice.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-4 flex items-center space-x-2">
                              <input 
                                type="checkbox" 
                                id="confirmTerms" 
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
                              />
                              <Label htmlFor="confirmTerms" className="text-sm font-normal">
                                Eu li e concordo com os <Link to="#" className="text-blue-500 hover:text-blue-600">Termos de Investimento</Link> e reconheço os riscos envolvidos.
                              </Label>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setDialogStep(1)}>
                              Voltar
                            </Button>
                            <Button 
                              onClick={handleInvestment} 
                              className="bg-gradient-to-r from-brand-blue-500 to-brand-green-500 text-white"
                            >
                              Confirmar Investimento
                              <CheckCircle className="ml-2 h-4 w-4" />
                            </Button>
                          </DialogFooter>
                        </>
                      )}
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Button className="w-full" disabled>
                    {offer.status === 'upcoming' ? 'Disponível em breve' : 'Oferta Encerrada'}
                  </Button>
                )}
                
                <div className="w-full flex space-x-2">
                  <Button variant="outline" className="flex-1">
                    <Share2 className="mr-2 h-4 w-4" />
                    Compartilhar
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Info className="mr-2 h-4 w-4" />
                    Mais Info
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
        
        {/* Tabs Content */}
        <Tabs defaultValue="overview" className="mt-8">
          <TabsList className="grid w-full max-w-3xl grid-cols-5">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="financial">Financeiro</TabsTrigger>
            <TabsTrigger value="team">Equipe</TabsTrigger>
            <TabsTrigger value="documents">Documentos</TabsTrigger>
            <TabsTrigger value="updates">Atualizações</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Sobre a Empresa</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-slate-700 dark:text-slate-300">
                  {offer.company.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col space-y-2">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Indústria</span>
                    <span className="font-medium flex items-center">
                      <Building className="h-4 w-4 mr-2 text-brand-blue-500" />
                      {offer.company.industry}
                    </span>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Localização</span>
                    <span className="font-medium flex items-center">
                      <Map className="h-4 w-4 mr-2 text-brand-blue-500" />
                      {offer.company.location}
                    </span>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Website</span>
                    <a href={offer.company.website} target="_blank" rel="noopener noreferrer" className="font-medium flex items-center text-brand-blue-500 hover:underline">
                      <Globe className="h-4 w-4 mr-2" />
                      {offer.company.website.replace('https://', '')}
                    </a>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Destaques</h3>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {offer.company.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Detalhes da Captação</h3>
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-5 border border-slate-200 dark:border-slate-700">
                    <p className="text-slate-700 dark:text-slate-300">
                      {offer.description}
                    </p>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Objetivo da Captação</p>
                        <ul className="mt-1 space-y-2">
                          {offer.highlights.map((highlight, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                              <span className="text-sm">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Riscos</p>
                        <ul className="mt-1 space-y-2">
                          {offer.risks.map((risk, index) => (
                            <li key={index} className="flex items-start">
                              <Info className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                              <span className="text-sm">{risk}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {token && (
              <Card>
                <CardHeader>
                  <CardTitle>Desempenho do Token</CardTitle>
                  <CardDescription>
                    Histórico do preço do token {token.symbol} nos últimos 12 meses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={token.priceHistory}
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
                          tickFormatter={(value) => `R$ ${value.toFixed(2)}`}
                          domain={['dataMin', 'dataMax']}
                        />
                        <Tooltip 
                          formatter={(value: any) => [`R$ ${Number(value).toFixed(2)}`, 'Preço']}
                          labelFormatter={(label) => {
                            const date = new Date(label);
                            return `${date.toLocaleString('default', { month: 'long', year: 'numeric' })}`;
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="price"
                          stroke="#0066FF"
                          activeDot={{ r: 8 }}
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                      <p className="text-sm text-slate-500 dark:text-slate-400">Preço Atual</p>
                      <p className="text-lg font-semibold">R$ {token.price.toFixed(2)}</p>
                      <p className={`text-xs flex items-center ${token.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {token.priceChange24h >= 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowUpRight className="h-3 w-3 mr-1 rotate-180" />}
                        {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(1)}% (24h)
                      </p>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                      <p className="text-sm text-slate-500 dark:text-slate-400">Market Cap</p>
                      <p className="text-lg font-semibold">R$ {(token.marketCap / 1000000).toFixed(1)}M</p>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                      <p className="text-sm text-slate-500 dark:text-slate-400">Volume (24h)</p>
                      <p className="text-lg font-semibold">R$ {(token.volume24h / 1000).toFixed(0)}K</p>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                      <p className="text-sm text-slate-500 dark:text-slate-400">Circulação</p>
                      <p className="text-lg font-semibold">{(token.circulatingSupply / 1000000).toFixed(1)}M</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">de {(token.totalSupply / 1000000).toFixed(1)}M</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          {/* Financial Tab */}
          <TabsContent value="financial" className="space-y-8 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Visão Financeira</CardTitle>
                <CardDescription>
                  Resultados financeiros e indicadores de desempenho
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Desempenho de Receita</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={offer.company.financials.years.map((year, index) => ({
                          year,
                          revenue: offer.company.financials.revenue[index],
                          profit: offer.company.financials.profit[index],
                        }))}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="year" />
                        <YAxis tickFormatter={(value) => `R$ ${(value / 1000000).toFixed(1)}M`} />
                        <Tooltip 
                          formatter={(value: any) => [`R$ ${Number(value).toLocaleString()}`, '']}
                          labelFormatter={(label) => `Ano: ${label}`}
                        />
                        <Line
                          type="monotone"
                          name="Receita"
                          dataKey="revenue"
                          stroke="#0066FF"
                          activeDot={{ r: 8 }}
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          name="Lucro"
                          dataKey="profit"
                          stroke="#00FFC1"
                          activeDot={{ r: 8 }}
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Indicadores Financeiros</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <BarChart3 className="h-5 w-5 text-brand-blue-500 mr-2" />
                        <h4 className="font-medium">Receita Anual</h4>
                      </div>
                      <p className="text-2xl font-bold">
                        R$ {offer.company.financials.revenue[offer.company.financials.revenue.length - 1].toLocaleString()}
                      </p>
                      <p className="text-sm text-green-500 flex items-center mt-1">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        +{Math.round(
                          (offer.company.financials.revenue[offer.company.financials.revenue.length - 1] /
                            offer.company.financials.revenue[offer.company.financials.revenue.length - 2] - 1) * 100
                        )}% vs. ano anterior
                      </p>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <DollarSign className="h-5 w-5 text-green-500 mr-2" />
                        <h4 className="font-medium">Lucro Líquido</h4>
                      </div>
                      <p className="text-2xl font-bold">
                        R$ {offer.company.financials.profit[offer.company.financials.profit.length - 1].toLocaleString()}
                      </p>
                      <p className="text-sm text-green-500 flex items-center mt-1">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        Margem de {Math.round(
                          (offer.company.financials.profit[offer.company.financials.profit.length - 1] /
                            offer.company.financials.revenue[offer.company.financials.revenue.length - 1]) * 100
                        )}%
                      </p>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <Building className="h-5 w-5 text-purple-500 mr-2" />
                        <h4 className="font-medium">Valuation</h4>
                      </div>
                      <p className="text-2xl font-bold">
                        R$ {(offer.company.valuation / 1000000).toFixed(1)}M
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        {Math.round(
                          offer.company.valuation /
                            offer.company.financials.revenue[offer.company.financials.revenue.length - 1]
                        )}x Receita
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Demonstrações Financeiras</h3>
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                    <p className="mb-4">Acesse as demonstrações financeiras completas da empresa nos documentos anexos.</p>
                    <div className="flex flex-wrap gap-2">
                      {offer.documents.filter(doc => doc.type === 'PDF').map((doc, index) => (
                        <Button key={index} variant="outline" size="sm" className="flex items-center" asChild>
                          <a href={doc.url} target="_blank" rel="noopener noreferrer">
                            <FileText className="h-4 w-4 mr-2" />
                            {doc.name}
                            <Download className="h-3 w-3 ml-2" />
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Team Tab */}
          <TabsContent value="team" className="space-y-8 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Equipe</CardTitle>
                <CardDescription>
                  Conheça as pessoas por trás da empresa
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {offer.company.team.map((member, index) => (
                    <div key={index} className="text-center">
                      <div className="h-32 w-32 mx-auto rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mb-4">
                        <Users className="h-16 w-16 text-slate-400 dark:text-slate-500" />
                      </div>
                      <h3 className="text-xl font-medium">{member.name}</h3>
                      <p className="text-slate-500 dark:text-slate-400">{member.position}</p>
                      <div className="flex justify-center mt-4 space-x-3">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Linkedin className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 text-center">
                  <h3 className="text-lg font-medium mb-2">Cultura Organizacional</h3>
                  <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                    A equipe da {offer.company.name} é composta por profissionais experientes e apaixonados pelo setor de {offer.company.industry.toLowerCase()}.
                    Com uma cultura focada em inovação, colaboração e resultados, a empresa construiu um ambiente onde talentos diversos 
                    podem contribuir para a missão de transformar o mercado através de soluções tecnológicas avançadas.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-medium mb-4">Conselheiros e Investidores</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mr-4">
                        <Users className="h-6 w-6 text-slate-400 dark:text-slate-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">Tech Ventures Capital</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Investidor Anjo - Primeira Rodada</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mr-4">
                        <Users className="h-6 w-6 text-slate-400 dark:text-slate-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">Roberto Andrade</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Conselheiro - Ex-CEO Empresa XYZ</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-8 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Documentos</CardTitle>
                <CardDescription>
                  Acesse todos os documentos relacionados à oferta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {offer.documents.map((doc, index) => (
                    <div key={index} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                      <div className="flex items-center">
                        <FileText className="h-8 w-8 text-brand-blue-500 mr-3" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{doc.type}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={doc.url} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800 dark:text-blue-300">Nota Importante</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                        Todos os documentos disponibilizados foram verificados pela equipe de compliance da plataforma.
                        Recomendamos a leitura completa de todos os materiais antes de tomar decisões de investimento.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Termos e Condições</CardTitle>
                <CardDescription>
                  Informações importantes sobre a oferta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Tipo de Token</h4>
                    <p className="text-slate-600 dark:text-slate-300">
                      Token de Equity
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                      Representa participação acionária na empresa
                    </p>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Período de Lockup</h4>
                    <p className="text-slate-600 dark:text-slate-300">
                      6 meses
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                      Período que tokens não podem ser vendidos
                    </p>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Direitos do Token</h4>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">Direito a Dividendos</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">Direito a Voto</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-700">
                    <h4 className="font-medium">Fatores de Risco</h4>
                  </div>
                  <div className="p-4">
                    <p className="text-slate-600 dark:text-slate-300 mb-4">
                      O investimento em startups e empresas em estágio inicial envolve riscos significativos, incluindo:
                    </p>
                    <ul className="space-y-2">
                      {offer.risks.map((risk, index) => (
                        <li key={index} className="flex items-start">
                          <Info className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                          <span>{risk}</span>
                        </li>
                      ))}
                      <li className="flex items-start">
                        <Info className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                        <span>Risco de liquidez e possibilidade de perda total do investimento</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Updates Tab */}
          <TabsContent value="updates" className="space-y-8 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Atualizações da Oferta</CardTitle>
                <CardDescription>
                  Novidades e comunicados enviados pela empresa
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {offer.updates.length > 0 ? (
                  <div className="space-y-6">
                    {offer.updates.map((update, index) => (
                      <div key={index} className="border-b border-slate-200 dark:border-slate-700 last:border-0 pb-6 last:pb-0">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-lg">{update.title}</h3>
                          <span className="text-sm text-slate-500 dark:text-slate-400">
                            {new Date(update.date).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <p className="mt-2 text-slate-600 dark:text-slate-300">
                          {update.content}
                        </p>
                        <div className="flex items-center mt-4 space-x-4">
                          <Button variant="ghost" size="sm" className="flex items-center">
                            <ThumbsUp className="h-4 w-4 mr-2" />
                            Curtir
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Comentar
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center">
                            <Share2 className="h-4 w-4 mr-2" />
                            Compartilhar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MessageSquare className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-2">
                      Nenhuma atualização ainda
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                      A empresa ainda não publicou atualizações para esta oferta.
                      Volte mais tarde para acompanhar novidades.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Perguntas e Respostas</CardTitle>
                <CardDescription>
                  Dúvidas feitas pelos investidores e respondidas pela empresa
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-6">
                  <div className="border-b border-slate-200 dark:border-slate-700 pb-6">
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mr-3">
                        <HelpCircle className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">Qual é o plano de expansão internacional?</h4>
                          <span className="text-xs text-slate-500 dark:text-slate-400">2 dias atrás</span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                          Gostaria de saber se a empresa planeja expandir para outros países da América Latina e quais seriam os primeiros mercados alvo?
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Investidor #152</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start mt-4 ml-12">
                      <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mr-3">
                        <Building className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">{offer.company.name}</h4>
                          <span className="text-xs text-slate-500 dark:text-slate-400">1 dia atrás</span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                          Sim, planejamos iniciar nossa expansão internacional no próximo ano, começando por Colômbia e México, 
                          que apresentam condições favoráveis e demanda pelos nossos serviços. Em seguida, avaliaremos oportunidades 
                          no Chile e Peru.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mr-3">
                        <HelpCircle className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">Previsão para distribuição de dividendos?</h4>
                          <span className="text-xs text-slate-500 dark:text-slate-400">5 dias atrás</span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                          Existe alguma política de distribuição de dividendos definida? Quando podemos esperar os primeiros pagamentos?
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Investidor #118</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start mt-4 ml-12">
                      <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mr-3">
                        <Building className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">{offer.company.name}</h4>
                          <span className="text-xs text-slate-500 dark:text-slate-400">4 dias atrás</span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                          Nossa política prevê a distribuição de 25% do lucro líquido como dividendos, mas atualmente estamos 
                          reinvestindo todos os recursos para acelerar o crescimento. Estimamos iniciar a distribuição de dividendos 
                          a partir do segundo semestre de 2025, quando atingirmos as metas de escala previstas no nosso plano de negócios.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 text-center">
                  <h3 className="font-medium mb-2">Tem alguma dúvida?</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Faça sua pergunta diretamente para a empresa
                  </p>
                  <Button className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    Fazer Pergunta
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default OfferDetails;
