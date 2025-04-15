
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface IncomeStatementProps {
  companyData: any;
}

const IncomeStatement = ({ companyData }: IncomeStatementProps) => {
  // Enhanced data validation
  const hasFinancialData = 
    companyData?.financials && 
    Array.isArray(companyData.financials.revenue) && 
    Array.isArray(companyData.financials.costs) && 
    Array.isArray(companyData.financials.profit);

  if (!hasFinancialData) {
    return (
      <div className="p-4 text-center">
        <p className="text-slate-500">Dados financeiros não disponíveis ou incompletos.</p>
      </div>
    );
  }

  // Ensure we have consistent data length
  const financialYears = companyData.financials.years || 
    Array.from({ length: companyData.financials.revenue.length }, (_, i) => new Date().getFullYear() - i);

  return (
    <div>
      <h3 className="font-medium text-lg mb-4">Demonstração de Resultados</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 dark:bg-slate-800">
              <TableHead>Item</TableHead>
              {financialYears.map((year, index) => (
                <TableHead key={index} className="text-right">{year}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Receita Bruta</TableCell>
              {companyData.financials.revenue.map((value, index) => (
                <TableCell key={index} className="text-right">
                  R$ {value.toLocaleString()}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Custos Operacionais</TableCell>
              {companyData.financials.costs.map((value, index) => (
                <TableCell key={index} className="text-right">
                  R$ {value.toLocaleString()}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Lucro Bruto</TableCell>
              {companyData.financials.revenue.map((value, index) => (
                <TableCell key={index} className="text-right">
                  R$ {(value - companyData.financials.costs[index]).toLocaleString()}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Despesas Administrativas</TableCell>
              {financialYears.map((_, index) => (
                <TableCell key={index} className="text-right">
                  R$ {(companyData.financials.costs[index] * 0.3).toLocaleString()}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">EBITDA</TableCell>
              {financialYears.map((_, index) => (
                <TableCell key={index} className="text-right">
                  R$ {(companyData.financials.revenue[index] - companyData.financials.costs[index] - (companyData.financials.costs[index] * 0.3)).toLocaleString()}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Lucro Líquido</TableCell>
              {companyData.financials.profit.map((value, index) => (
                <TableCell key={index} className="text-right">
                  R$ {value.toLocaleString()}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default IncomeStatement;
