
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PortfolioItem } from "@/data/portfolio";

interface PortfolioAssetsTableProps {
  portfolioItems: PortfolioItem[];
  formatCurrency: (value: number) => string;
  formatPercent: (value: number) => string;
}

const PortfolioAssetsTable = ({ portfolioItems, formatCurrency, formatPercent }: PortfolioAssetsTableProps) => {
  return (
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
  );
};

export default PortfolioAssetsTable;
