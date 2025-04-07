
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const MarketOverview = () => {
  return (
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
            <LineChart
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
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketOverview;
