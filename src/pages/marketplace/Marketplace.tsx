
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Label } from "@/components/ui/label";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  ChevronDown,
  Filter,
  LineChart,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { LineChart as RechartLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { tokens } from "@/data/tokens";

const Marketplace = () => {
  const { toast } = useToast();
  const [filter, setFilter] = useState({
    search: "",
    industry: "all",
    orderBy: "marketCap",
    orderDir: "desc",
  });
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const [selectedToken, setSelectedToken] = useState<typeof tokens[0] | null>(null);
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  
  // Filter and sort tokens
  const filteredTokens = tokens
    .filter((token) => {
      // Search filter
      if (filter.search) {
        const searchLower = filter.search.toLowerCase();
        return (
          token.symbol.toLowerCase().includes(searchLower) ||
          token.name.toLowerCase().includes(searchLower) ||
          token.companyName.toLowerCase().includes(searchLower) ||
          token.category.toLowerCase().includes(searchLower)
        );
      }
      
      // Industry filter
      if (filter.industry !== "all" && token.category !== filter.industry) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort by selected field
      const orderDir = filter.orderDir === "asc" ? 1 : -1;
      
      if (filter.orderBy === "marketCap") {
        return orderDir * (a.marketCap - b.marketCap);
      } else if (filter.orderBy === "price") {
        return orderDir * (a.price - b.price);
      } else if (filter.orderBy === "volume") {
        return orderDir * (a.volume24h - b.volume24h);
      } else {
        return orderDir * (a.priceChange24h - b.priceChange24h);
      }
    });
  
  // Get unique industries/categories for filter
  const categories = Array.from(new Set(tokens.map((token) => token.category)));
  
  const handleOpenOrderDialog = (token: typeof tokens[0], type: "buy" | "sell") => {
    setSelectedToken(token);
    setTradeType(type);
    setQuantity("");
    setPrice(type === "buy" ? token.price.toString() : (token.price * 1.05).toFixed(2));
  };
  
  const handlePlaceOrder = () => {
    if (!selectedToken || !quantity || !price) return;
    
    toast({
      title: `Ordem de ${tradeType === "buy" ? "compra" : "venda"} criada com sucesso`,
      description: `${tradeType === "buy" ? "Compra" : "Venda"} de ${quantity} ${selectedToken.symbol} a R$ ${parseFloat(price).toFixed(2)} por token.`,
    });
    
    setSelectedToken(null);
    setQuantity("");
    setPrice("");
  };
  
  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };
  
  const formatNumber = (value: number, suffix: string = "") => {
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(2)}B${suffix}`;
    } else if (value >= 1000000) {
      return `${(value / 1000000).toFixed(2)}M${suffix}`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(2)}K${suffix}`;
    } else {
      return `${value.toFixed(2)}${suffix}`;
    }
  };
  
  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Marketplace de Tokens</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Negocie tokens de empresas com liquidez e transparência
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Link to="/investor/portfolio">
              <Button variant="outline">Meu Portfólio</Button>
            </Link>
            <Link to="/investor">
              <Button className="bg-gradient-to-r from-brand-blue-500 to-brand-green-500 text-white">
                Oportunidades
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Market Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Visão Geral do Mercado</CardTitle>
            <CardDescription>
              Principais indicadores e tendências do mercado de tokens
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-500 dark:text-slate-400">Volume 24h</p>
                <p className="text-2xl font-bold">R$ 4.57M</p>
                <p className="text-sm text-green-500 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +12.5% vs. ontem
                </p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-500 dark:text-slate-400">Transações 24h</p>
                <p className="text-2xl font-bold">237</p>
                <p className="text-sm text-green-500 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +8.2% vs. ontem
                </p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-500 dark:text-slate-400">Market Cap Total</p>
                <p className="text-2xl font-bold">R$ 87.2M</p>
                <p className="text-sm text-green-500 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +3.8% vs. ontem
                </p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-500 dark:text-slate-400">Índice de Liquidez</p>
                <p className="text-2xl font-bold">72.8%</p>
                <p className="text-sm text-red-500 flex items-center">
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                  -1.2% vs. ontem
                </p>
              </div>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartLineChart
                  data={[
                    { date: "2024-03-01", value: 81400000 },
                    { date: "2024-03-02", value: 82100000 },
                    { date: "2024-03-03", value: 81800000 },
                    { date: "2024-03-04", value: 82600000 },
                    { date: "2024-03-05", value: 83500000 },
                    { date: "2024-03-06", value: 84200000 },
                    { date: "2024-03-07", value: 83900000 },
                    { date: "2024-03-08", value: 84700000 },
                    { date: "2024-03-09", value: 85300000 },
                    { date: "2024-03-10", value: 85800000 },
                    { date: "2024-03-11", value: 86200000 },
                    { date: "2024-03-12", value: 85700000 },
                    { date: "2024-03-13", value: 86300000 },
                    { date: "2024-03-14", value: 86800000 },
                    { date: "2024-03-15", value: 87200000 },
                  ]}
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
                      return `${date.getDate()}/${date.getMonth() + 1}`;
                    }}
                  />
                  <YAxis
                    tickFormatter={(value) =>
                      `R$ ${(value / 1000000).toFixed(1)}M`
                    }
                  />
                  <Tooltip
                    formatter={(value: any) => [
                      `R$ ${(Number(value) / 1000000).toFixed(2)}M`,
                      "Market Cap Total",
                    ]}
                    labelFormatter={(label) => {
                      const date = new Date(label);
                      return `${date.toLocaleDateString("pt-BR")}`;
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#0066FF"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </RechartLineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Token List */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <CardTitle>Lista de Tokens</CardTitle>
                <CardDescription>
                  Tokens disponíveis para negociação na plataforma
                </CardDescription>
              </div>
              
              <div className="w-full md:w-auto flex flex-col md:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
                  <Input
                    placeholder="Buscar tokens..."
                    className="pl-9"
                    value={filter.search}
                    onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                  />
                </div>
                
                <Select
                  value={filter.industry}
                  onValueChange={(value) => setFilter({ ...filter, industry: value })}
                >
                  <SelectTrigger className="w-full md:w-[180px]">
                    <span className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      Categoria
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as categorias</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select
                  value={`${filter.orderBy}-${filter.orderDir}`}
                  onValueChange={(value) => {
                    const [orderBy, orderDir] = value.split("-");
                    setFilter({
                      ...filter,
                      orderBy,
                      orderDir: orderDir as "asc" | "desc",
                    });
                  }}
                >
                  <SelectTrigger className="w-full md:w-[180px]">
                    <span className="flex items-center">
                      <SlidersHorizontal className="mr-2 h-4 w-4" />
                      Ordenar por
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="marketCap-desc">Market Cap (maior)</SelectItem>
                    <SelectItem value="marketCap-asc">Market Cap (menor)</SelectItem>
                    <SelectItem value="price-desc">Preço (maior)</SelectItem>
                    <SelectItem value="price-asc">Preço (menor)</SelectItem>
                    <SelectItem value="volume-desc">Volume (maior)</SelectItem>
                    <SelectItem value="volume-asc">Volume (menor)</SelectItem>
                    <SelectItem value="priceChange-desc">Variação (maior)</SelectItem>
                    <SelectItem value="priceChange-asc">Variação (menor)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
                <TabsTrigger value="all">Todos os Tokens</TabsTrigger>
                <TabsTrigger value="trending">Em Alta</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">#</TableHead>
                        <TableHead>Token</TableHead>
                        <TableHead className="text-right">Preço</TableHead>
                        <TableHead className="text-right">24h</TableHead>
                        <TableHead className="text-right">Market Cap</TableHead>
                        <TableHead className="text-right">Volume 24h</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTokens.map((token, index) => (
                        <TableRow key={token.id}>
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mr-3">
                                <span className="font-bold text-xs">{token.symbol}</span>
                              </div>
                              <div>
                                <div className="font-medium">{token.name}</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">
                                  {token.symbol} • {token.category}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {formatCurrency(token.price)}
                          </TableCell>
                          <TableCell
                            className={`text-right ${
                              token.priceChange24h >= 0
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            <span className="flex items-center justify-end">
                              {token.priceChange24h >= 0 ? (
                                <ArrowUpRight className="h-3 w-3 mr-1" />
                              ) : (
                                <ArrowDownRight className="h-3 w-3 mr-1" />
                              )}
                              {token.priceChange24h.toFixed(2)}%
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(token.marketCap)}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(token.volume24h)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
                                onClick={() => handleOpenOrderDialog(token, "buy")}
                              >
                                Comprar
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                onClick={() => handleOpenOrderDialog(token, "sell")}
                              >
                                Vender
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="trending">
                <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">#</TableHead>
                        <TableHead>Token</TableHead>
                        <TableHead className="text-right">Preço</TableHead>
                        <TableHead className="text-right">24h</TableHead>
                        <TableHead className="text-right">Market Cap</TableHead>
                        <TableHead className="text-right">Volume 24h</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tokens
                        .sort((a, b) => b.priceChange24h - a.priceChange24h)
                        .slice(0, 5)
                        .map((token, index) => (
                          <TableRow key={token.id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mr-3">
                                  <span className="font-bold text-xs">{token.symbol}</span>
                                </div>
                                <div>
                                  <div className="font-medium">{token.name}</div>
                                  <div className="text-xs text-slate-500 dark:text-slate-400">
                                    {token.symbol} • {token.category}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              {formatCurrency(token.price)}
                            </TableCell>
                            <TableCell
                              className={`text-right ${
                                token.priceChange24h >= 0
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              <span className="flex items-center justify-end">
                                {token.priceChange24h >= 0 ? (
                                  <ArrowUpRight className="h-3 w-3 mr-1" />
                                ) : (
                                  <ArrowDownRight className="h-3 w-3 mr-1" />
                                )}
                                {token.priceChange24h.toFixed(2)}%
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              {formatCurrency(token.marketCap)}
                            </TableCell>
                            <TableCell className="text-right">
                              {formatCurrency(token.volume24h)}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
                                  onClick={() => handleOpenOrderDialog(token, "buy")}
                                >
                                  Comprar
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                  onClick={() => handleOpenOrderDialog(token, "sell")}
                                >
                                  Vender
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Market Depth */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Livro de Ofertas</CardTitle>
              <CardDescription>
                Ordens de compra e venda pendentes no mercado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Token</span>
                  <Select defaultValue="GTS">
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Selecione o token" />
                    </SelectTrigger>
                    <SelectContent>
                      {tokens.map((token) => (
                        <SelectItem key={token.id} value={token.symbol}>
                          {token.symbol} - {token.companyName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-green-600">Ordens de Compra</h3>
                    <span className="text-sm text-slate-500 dark:text-slate-400">Quantidade</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { price: 3.42, quantity: 500 },
                      { price: 3.40, quantity: 750 },
                      { price: 3.38, quantity: 1200 },
                      { price: 3.35, quantity: 2000 },
                      { price: 3.30, quantity: 3500 },
                    ].map((order, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-900/10 rounded"
                      >
                        <span className="font-medium text-green-600">
                          {formatCurrency(order.price)}
                        </span>
                        <span>{order.quantity.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-blue-600">Ordens de Venda</h3>
                    <span className="text-sm text-slate-500 dark:text-slate-400">Quantidade</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { price: 3.50, quantity: 800 },
                      { price: 3.55, quantity: 650 },
                      { price: 3.60, quantity: 1500 },
                      { price: 3.65, quantity: 2200 },
                      { price: 3.70, quantity: 3000 },
                    ].map((order, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900/10 rounded"
                      >
                        <span className="font-medium text-blue-600">
                          {formatCurrency(order.price)}
                        </span>
                        <span>{order.quantity.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Transações</CardTitle>
              <CardDescription>
                Negociações recentes concluídas na plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Horário</TableHead>
                      <TableHead>Par</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead className="text-right">Preço</TableHead>
                      <TableHead className="text-right">Quantidade</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        time: "14:32:15",
                        pair: "GTS",
                        type: "buy",
                        price: 3.47,
                        quantity: 500,
                      },
                      {
                        time: "14:28:42",
                        pair: "HST",
                        type: "sell",
                        price: 2.65,
                        quantity: 750,
                      },
                      {
                        time: "14:25:18",
                        pair: "FFT",
                        type: "buy",
                        price: 1.82,
                        quantity: 1200,
                      },
                      {
                        time: "14:20:03",
                        pair: "AST",
                        type: "sell",
                        price: 3.94,
                        quantity: 300,
                      },
                      {
                        time: "14:15:27",
                        pair: "LFT",
                        type: "buy",
                        price: 4.18,
                        quantity: 450,
                      },
                      {
                        time: "14:10:55",
                        pair: "GTS",
                        type: "sell",
                        price: 3.45,
                        quantity: 600,
                      },
                    ].map((tx, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-sm">{tx.time}</TableCell>
                        <TableCell className="font-medium">{tx.pair}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              tx.type === "buy"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                            }`}
                          >
                            {tx.type === "buy" ? "Compra" : "Venda"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(tx.price)}
                        </TableCell>
                        <TableCell className="text-right">
                          {tx.quantity.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(tx.price * tx.quantity)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Order Dialog */}
      <Dialog open={!!selectedToken} onOpenChange={(open) => !open && setSelectedToken(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {tradeType === "buy" ? "Comprar" : "Vender"} Tokens
            </DialogTitle>
            <DialogDescription>
              {tradeType === "buy"
                ? "Crie uma ordem de compra para adquirir tokens"
                : "Crie uma ordem de venda para seus tokens"}
            </DialogDescription>
          </DialogHeader>
          
          {selectedToken && (
            <div className="py-4">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mr-3">
                  <span className="font-bold">{selectedToken.symbol}</span>
                </div>
                <div>
                  <h3 className="font-medium">{selectedToken.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {selectedToken.companyName}
                  </p>
                </div>
              </div>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Preço por Token (R$)</Label>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-slate-500 dark:text-slate-400">
                          R$
                        </span>
                      </div>
                      <Input
                        id="price"
                        className="pl-10"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        type="number"
                        step="0.01"
                        min="0.01"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantidade</Label>
                    <Input
                      id="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      type="number"
                      min="1"
                    />
                  </div>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                    Resumo:
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total:</span>
                      <span className="font-medium">
                        {quantity && price
                          ? formatCurrency(parseFloat(quantity) * parseFloat(price))
                          : "-"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxa da plataforma (0.5%):</span>
                      <span className="font-medium">
                        {quantity && price
                          ? formatCurrency(
                              parseFloat(quantity) *
                                parseFloat(price) *
                                0.005
                            )
                          : "-"}
                      </span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-slate-200 dark:border-slate-700">
                      <span>Total {tradeType === "buy" ? "a pagar" : "a receber"}:</span>
                      <span className="font-medium">
                        {quantity && price
                          ? formatCurrency(
                              parseFloat(quantity) *
                                parseFloat(price) *
                                (tradeType === "buy" ? 1.005 : 0.995)
                            )
                          : "-"}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {tradeType === "buy"
                    ? "A ordem será executada quando houver vendedores disponíveis no preço especificado ou inferior."
                    : "A ordem será executada quando houver compradores disponíveis no preço especificado ou superior."}
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedToken(null)}>
                  Cancelar
                </Button>
                <Button
                  onClick={handlePlaceOrder}
                  disabled={!quantity || !price}
                  className={
                    tradeType === "buy"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }
                >
                  Criar Ordem de {tradeType === "buy" ? "Compra" : "Venda"}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Marketplace;
