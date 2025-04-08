
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface IndustryAllocationProps {
  allocationByIndustry: {
    industry: string;
    percentage: number;
  }[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const IndustryAllocation = ({ allocationByIndustry }: IndustryAllocationProps) => {
  return (
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
                data={allocationByIndustry}
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
                {allocationByIndustry.map(
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
          {allocationByIndustry.map((item, index) => (
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
  );
};

export default IndustryAllocation;
