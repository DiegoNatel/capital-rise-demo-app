
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CashFlowStatementProps {
  companyData: any;
}

const CashFlowStatement = ({ companyData }: CashFlowStatementProps) => {
  // Years for the financial data (last 3 years)
  const currentYear = new Date().getFullYear();
  const years = [currentYear - 2, currentYear - 1, currentYear];
  
  // Calculate cash flow items based on existing data
  const operatingCashFlow = companyData.financials.profit.map(profit => profit * 1.2);
  const investingCashFlow = companyData.financials.profit.map(profit => profit * -0.5);
  const financingCashFlow = companyData.financials.profit.map((profit, index) => index === 2 ? profit * 0.3 : profit * -0.3);
  const netCashFlow = operatingCashFlow.map((ocf, index) => ocf + investingCashFlow[index] + financingCashFlow[index]);
  
  return (
    <div>
      <h3 className="font-medium text-lg mb-4">Demonstração de Fluxo de Caixa</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 dark:bg-slate-800">
              <TableHead>Item</TableHead>
              {years.map(year => (
                <TableHead key={year} className="text-right">{year}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Operating Activities */}
            <TableRow className="bg-slate-50 dark:bg-slate-800">
              <TableCell className="font-medium">Atividades Operacionais</TableCell>
              {years.map((_, i) => <TableCell key={i} className="text-right"></TableCell>)}
            </TableRow>
            <TableRow>
              <TableCell className="pl-6">Lucro Líquido</TableCell>
              {companyData.financials.profit.map((value, index) => (
                <TableCell key={index} className="text-right">
                  R$ {value.toLocaleString()}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="pl-6">Ajustes</TableCell>
              {years.map((_, index) => (
                <TableCell key={index} className="text-right">
                  R$ {(companyData.financials.profit[index] * 0.2).toLocaleString()}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="pl-6 font-medium">Fluxo de Caixa Operacional</TableCell>
              {operatingCashFlow.map((value, index) => (
                <TableCell key={index} className="text-right font-medium">
                  R$ {value.toLocaleString()}
                </TableCell>
              ))}
            </TableRow>
            
            {/* Investing Activities */}
            <TableRow className="bg-slate-50 dark:bg-slate-800">
              <TableCell className="font-medium">Atividades de Investimento</TableCell>
              {years.map((_, i) => <TableCell key={i} className="text-right"></TableCell>)}
            </TableRow>
            <TableRow>
              <TableCell className="pl-6">Aquisição de Ativos</TableCell>
              {investingCashFlow.map((value, index) => (
                <TableCell key={index} className="text-right text-red-500">
                  R$ {Math.abs(value).toLocaleString()}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="pl-6 font-medium">Fluxo de Caixa de Investimento</TableCell>
              {investingCashFlow.map((value, index) => (
                <TableCell key={index} className="text-right font-medium">
                  R$ {value.toLocaleString()}
                </TableCell>
              ))}
            </TableRow>
            
            {/* Financing Activities */}
            <TableRow className="bg-slate-50 dark:bg-slate-800">
              <TableCell className="font-medium">Atividades de Financiamento</TableCell>
              {years.map((_, i) => <TableCell key={i} className="text-right"></TableCell>)}
            </TableRow>
            <TableRow>
              <TableCell className="pl-6">Empréstimos e Financiamentos</TableCell>
              {financingCashFlow.map((value, index) => (
                <TableCell key={index} className={`text-right ${value >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  R$ {Math.abs(value).toLocaleString()}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="pl-6 font-medium">Fluxo de Caixa de Financiamento</TableCell>
              {financingCashFlow.map((value, index) => (
                <TableCell key={index} className="text-right font-medium">
                  R$ {value.toLocaleString()}
                </TableCell>
              ))}
            </TableRow>
            
            {/* Net Cash Flow */}
            <TableRow className="bg-slate-50 dark:bg-slate-800">
              <TableCell className="font-medium">Fluxo de Caixa Líquido</TableCell>
              {netCashFlow.map((value, index) => (
                <TableCell key={index} className="text-right font-medium">
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

export default CashFlowStatement;
