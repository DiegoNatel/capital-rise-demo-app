
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
  return (
    <>
      <h3 className="font-medium text-lg mb-4">Demonstrativo de Fluxo de Caixa</h3>
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              {companyData.financials.years.map((year: string, index: number) => (
                <TableHead key={index} className="text-right">{year}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-slate-50 dark:bg-slate-800">
              <TableCell className="font-medium">Fluxo de Caixa Operacional</TableCell>
              {companyData.financials.years.map((year: string, index: number) => (
                <TableCell key={index} className="text-right font-medium"></TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>Lucro líquido</TableCell>
              {companyData.financials.profit.map((value: number, index: number) => (
                <TableCell key={index} className="text-right">R$ {value.toLocaleString()}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>(+) Depreciação e amortização</TableCell>
              {companyData.financials.revenue.map((value: number, index: number) => (
                <TableCell key={index} className="text-right">R$ {Math.round(value * 0.03).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>(+/-) Variação no capital de giro</TableCell>
              {companyData.financials.revenue.map((value: number, index: number) => (
                <TableCell key={index} className="text-right text-red-500">R$ -{Math.round(value * 0.04).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Caixa líquido das atividades operacionais</TableCell>
              {companyData.financials.profit.map((value: number, index: number) => (
                <TableCell key={index} className="text-right font-medium">R$ {Math.round(value * 1.04).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            
            <TableRow className="bg-slate-50 dark:bg-slate-800">
              <TableCell className="font-medium">Fluxo de Caixa de Investimento</TableCell>
              {companyData.financials.years.map((year: string, index: number) => (
                <TableCell key={index} className="text-right font-medium"></TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>(-) Aquisição de imobilizado</TableCell>
              {companyData.financials.revenue.map((value: number, index: number) => (
                <TableCell key={index} className="text-right text-red-500">R$ -{Math.round(value * 0.08).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>(-) Investimentos em intangíveis</TableCell>
              {companyData.financials.revenue.map((value: number, index: number) => (
                <TableCell key={index} className="text-right text-red-500">R$ -{Math.round(value * 0.05).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Caixa líquido das atividades de investimento</TableCell>
              {companyData.financials.revenue.map((value: number, index: number) => (
                <TableCell key={index} className="text-right font-medium text-red-500">R$ -{Math.round(value * 0.13).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            
            <TableRow className="bg-slate-50 dark:bg-slate-800">
              <TableCell className="font-medium">Fluxo de Caixa de Financiamento</TableCell>
              {companyData.financials.years.map((year: string, index: number) => (
                <TableCell key={index} className="text-right font-medium"></TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>(+) Captação de empréstimos</TableCell>
              {companyData.financials.revenue.map((value: number, index: number) => (
                <TableCell key={index} className="text-right">R$ {Math.round(value * 0.1).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>(-) Amortização de empréstimos</TableCell>
              {companyData.financials.revenue.map((value: number, index: number) => (
                <TableCell key={index} className="text-right text-red-500">R$ -{Math.round(value * 0.07).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>(-) Dividendos pagos</TableCell>
              {companyData.financials.profit.map((value: number, index: number) => (
                <TableCell key={index} className="text-right text-red-500">R$ -{Math.round(value * 0.3).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Caixa líquido das atividades de financiamento</TableCell>
              {companyData.financials.profit.map((value: number, index: number) => (
                <TableCell key={index} className="text-right font-medium text-red-500">R$ -{Math.round(value * 0.2).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            
            <TableRow className="bg-slate-50 dark:bg-slate-800">
              <TableCell className="font-semibold">Aumento/Redução do Caixa</TableCell>
              {companyData.financials.profit.map((value: number, index: number) => {
                const operacional = value * 1.04;
                const investimento = -companyData.financials.revenue[index] * 0.13;
                const financiamento = -value * 0.2;
                const total = operacional + investimento + financiamento;
                return (
                  <TableCell key={index} className={`text-right font-semibold ${total >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {total >= 0 ? 'R$ ' : 'R$ -'}
                    {Math.abs(Math.round(total)).toLocaleString()}
                  </TableCell>
                );
              })}
            </TableRow>
            <TableRow>
              <TableCell>Caixa no início do período</TableCell>
              {companyData.financials.revenue.map((value: number, index: number) => (
                <TableCell key={index} className="text-right">R$ {Math.round(value * 0.12).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Caixa no fim do período</TableCell>
              {companyData.financials.profit.map((value: number, index: number) => {
                const operacional = value * 1.04;
                const investimento = -companyData.financials.revenue[index] * 0.13;
                const financiamento = -value * 0.2;
                const variacao = operacional + investimento + financiamento;
                const inicial = companyData.financials.revenue[index] * 0.12;
                const final = inicial + variacao;
                return (
                  <TableCell key={index} className="text-right font-medium">
                    R$ {Math.round(final).toLocaleString()}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default CashFlowStatement;
