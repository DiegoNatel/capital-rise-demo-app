
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PerformanceChartProps {
  performanceHistory: {
    date: string;
    value: number;
  }[];
}

const PerformanceChart = ({ performanceHistory }: PerformanceChartProps) => {
  return (
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
              data={performanceHistory}
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
  );
};

export default PerformanceChart;
