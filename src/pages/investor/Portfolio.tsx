import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  DollarSign,
  Download,
  PieChart as PieChartIcon,
} from "lucide-react";
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import MainLayout from "@/components/layout/MainLayout";
import { portfolioItems, portfolioSummary } from "@/data/portfolio";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Portfolio = () => {
  const [viewType, setViewType] = useState<"cards" | "table">("cards");
  
  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };
  
  const formatPercent = (value: number) => {
    return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
  };
  
  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Meu Portfólio</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Acompanhe seus investimentos e desempenho
            </p>
          </div>
        </div>
        
        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Investimento Total
                  </p>
                  <h3 className="text-2xl font-bold mt-1">
                    {formatCurrency(portfolioSummary.totalInvestment)}
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
                    {formatCurrency(portfolioSummary.currentValue)}
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
                    Lucro/Prejuízo
                  </p>
                  <h3 className="text-2xl font-bold mt-1 text-green-500">
                    {formatCurrency(portfolioSummary.totalProfitLoss)}
                  </h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <ArrowUpRight className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Rendimento (%)
                  </p>
                  <h3 className="text-2xl font-bold mt-1 text-green-500">
                    +{portfolioSummary.totalProfitLossPercentage.toFixed(2)}%
                  </h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <PieChartIcon className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Performance Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Histórico de Desempenho</CardTitle>
            <CardDescription>
              Evolução do valor do seu portfólio nos últimos 6 meses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
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
                      return `${date.toLocaleString("default", {
                        month: "short",
                      })}`;
                    }}
                  />
                  <YAxis
                    tickFormatter={(value) =>
                      `R$ ${value.toLocaleString()}`
                    }
                  />
                  <Tooltip
                    formatter={(value: any) => [
                      `R$ ${Number(value).toLocaleString()}`,
                      "Valor",
                    ]}
                    labelFormatter={(label) => {
                      const date = new Date(label);
                      return `${date.toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                      })}`;
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
          <CardFooter className="justify-end">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exportar Dados
            </Button>
          </CardFooter>
        </Card>
        
        {/* Portfolio Allocation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Meus Ativos</CardTitle>
                  <CardDescription>
                    Detalhes dos seus investimentos atuais
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewType === "cards" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewType("cards")}
                    className="h-8 w-8 p-0"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="7" height="7" x="3" y="3" rx="1" />
                      <rect width="7" height="7" x="14" y="3" rx="1" />
                      <rect width="7" height="7" x="14" y="14" rx="1" />
                      <rect width="7" height="7" x="3" y="14" rx="1" />
                    </svg>
                  </Button>
                  <Button
                    variant={viewType === "table" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewType("table")}
                    className="h-8 w-8 p-0"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="3" x2="21" y1="6" y2="6" />
                      <line x1="3" x2="21" y1="12" y2="12" />
                      <line x1="3" x2="21" y1="18" y2="18" />
                    </svg>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {viewType === "cards" ? (
                <div className="space-y-4">
                  {portfolioItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div className="flex items-center mb-4 sm:mb-0">
                          <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mr-4">
                            <span className="font-bold">{item.tokenSymbol}</span>
                          </div>
                          <div>
                            <h3 className="font-medium">{item.tokenName}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              {item.companyName}
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full sm:w-auto">
                          <div className="text-center sm:text-right">
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              Quantidade
                            </p>
                            <p className="font-medium">
                              {item.quantity.toLocaleString()} {item.tokenSymbol}
                            </p>
                          </div>
                          
                          <div className="text-center sm:text-right">
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              Valor Atual
                            </p>
                            <p className="font-medium">
                              {formatCurrency(item.currentValue)}
                            </p>
                          </div>
                          
                          <div className="text-center sm:text-right">
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              Lucro/Prejuízo
                            </p>
                            <p
                              className={`font-medium ${
                                item.profitLoss >= 0
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {formatCurrency(item.profitLoss)}
                            </p>
                          </div>
                          
                          <div className="text-center sm:text-right">
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              Rendimento
                            </p>
                            <p
                              className={`font-medium flex items-center justify-center sm:justify-end ${
                                item.profitLossPercentage >= 0
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {item.profitLossPercentage >= 0 ? (
                                <ArrowUpRight className="h-3 w-3 mr-1" />
                              ) : (
                                <ArrowDownRight className="h-3 w-3 mr-1" />
                              )}
                              {formatPercent(item.profitLossPercentage)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Token</TableHead>
                        <TableHead>Empresa</TableHead>
                        <TableHead className="text-right">Quantidade</TableHead>
                        <TableHead className="text-right">Preço Médio</TableHead>
                        <TableHead className="text-right">Preço Atual</TableHead>
                        <TableHead className="text-right">Valor Total</TableHead>
                        <TableHead className="text-right">Rendimento</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {portfolioItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">
                            {item.tokenSymbol}
                          </TableCell>
                          <TableCell>{item.companyName}</TableCell>
                          <TableCell className="text-right">
                            {item.quantity.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(item.averagePurchasePrice)}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(item.currentPrice)}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(item.currentValue)}
                          </TableCell>
                          <TableCell
                            className={`text-right ${
                              item.profitLossPercentage >= 0
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            <span className="flex items-center justify-end">
                              {item.profitLossPercentage >= 0 ? (
                                <ArrowUpRight className="h-3 w-3 mr-1" />
                              ) : (
                                <ArrowDownRight className="h-3 w-3 mr-1" />
                              )}
                              {formatPercent(item.profitLossPercentage)}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
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
              <div className="h-64 flex items-center justify-center">
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
                      label={({ industry, percentage }) =>
                        `${industry}: ${percentage.toFixed(1)}%`
                      }
                    >
                      {portfolioSummary.allocationByIndustry.map(
                        (entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        )
                      )}
                    </Pie>
                    <Tooltip
                      formatter={(value: any) => [
                        `${Number(value).toFixed(1)}%`,
                        "Percentual",
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-2 mt-6">
                {portfolioSummary.allocationByIndustry.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center">
                      <div
                        className="h-3 w-3 rounded-full mr-2"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span>{item.industry}</span>
                    </div>
                    <span className="font-medium">{item.percentage.toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Transações</CardTitle>
            <CardDescription>
              Registro de todas as suas operações de compra e venda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="all">Todas</TabsTrigger>
                <TabsTrigger value="buy">Compras</TabsTrigger>
                <TabsTrigger value="sell">Vendas</TabsTrigger>
              </TabsList>
              
              <div className="mt-6">
                {["all", "buy", "sell"].map((tabValue) => (
                  <TabsContent key={tabValue} value={tabValue} className="space-y-4">
                    <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Data</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Token</TableHead>
                            <TableHead>Empresa</TableHead>
                            <TableHead className="text-right">Quantidade</TableHead>
                            <TableHead className="text-right">Preço</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {portfolioItems
                            .flatMap((item) =>
                              item.transactions
                                .filter(
                                  (tx) =>
                                    tabValue === "all" || tx.type === tabValue
                                )
                                .map((tx) => ({
                                  ...tx,
                                  tokenSymbol: item.tokenSymbol,
                                  companyName: item.companyName,
                                }))
                            )
                            .sort(
                              (a, b) =>
                                new Date(b.date).getTime() -
                                new Date(a.date).getTime()
                            )
                            .map((tx) => (
                              <TableRow key={tx.id}>
                                <TableCell>
                                  {new Date(tx.date).toLocaleDateString(
                                    "pt-BR"
                                  )}
                                </TableCell>
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
                                <TableCell className="font-medium">
                                  {tx.tokenSymbol}
                                </TableCell>
                                <TableCell>{tx.companyName}</TableCell>
                                <TableCell className="text-right">
                                  {tx.quantity.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-right">
                                  {formatCurrency(tx.price)}
                                </TableCell>
                                <TableCell className="text-right">
                                  {formatCurrency(tx.total)}
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                ))}
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Portfolio;
