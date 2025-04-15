
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
  return (
    <>
      <h3 className="font-medium text-lg mb-4">Demonstrativo de Resultados</h3>
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
            <TableRow>
              <TableCell className="font-medium">Receita Bruta</TableCell>
              {companyData.financials.revenue.map((value: number, index: number) => (
                <TableCell key={index} className="text-right">R$ {value.toLocaleString()}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>(-) Impostos sobre vendas</TableCell>
              {companyData.financials.revenue.map((value: number, index: number) => (
                <TableCell key={index} className="text-right">R$ {Math.round(value * 0.12).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>(-) Devoluções e abatimentos</TableCell>
              {companyData.financials.revenue.map((value: number, index: number) => (
                <TableCell key={index} className="text-right">R$ {Math.round(value * 0.03).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            <TableRow className="bg-slate-50 dark:bg-slate-800">
              <TableCell className="font-medium">Receita Líquida</TableCell>
              {companyData.financials.revenue.map((value: number, index: number) => (
                <TableCell key={index} className="text-right font-medium">R$ {Math.round(value * 0.85).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>(-) Custo dos produtos/serviços</TableCell>
              {companyData.financials.revenue.map((value: number, index: number) => (
                <TableCell key={index} className="text-right">R$ {Math.round(value * 0.35).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            <TableRow className="bg-slate-50 dark:bg-slate-800">
              <TableCell className="font-medium">Lucro Bruto</TableCell>
              {companyData.financials.revenue.map((value: number, index: number) => (
                <TableCell key={index} className="text-right font-medium">R$ {Math.round(value * 0.5).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>(-) Despesas operacionais</TableCell>
              {companyData.financials.revenue.map((value: number, index: number) => (
                <TableCell key={index} className="text-right">R$ {Math.round(value * 0.25).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>(-) Despesas com vendas</TableCell>
              {companyData.financials.revenue.map((value: number, index: number) => (
                <TableCell key={index} className="text-right">R$ {Math.round(value * 0.1).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>(-) Despesas administrativas</TableCell>
              {companyData.financials.revenue.map((value: number, index: number) => (
                <TableCell key={index} className="text-right">R$ {Math.round(value * 0.15).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            <TableRow className="bg-slate-50 dark:bg-slate-800">
              <TableCell className="font-medium">EBITDA</TableCell>
              {companyData.financials.revenue.map((value: number, index: number) => (
                <TableCell key={index} className="text-right font-medium">R$ {Math.round(value * 0.25).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>(-) Depreciação e amortização</TableCell>
              {companyData.financials.revenue.map((value: number, index: number) => (
                <TableCell key={index} className="text-right">R$ {Math.round(value * 0.03).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>(+/-) Resultado financeiro</TableCell>
              {companyData.financials.revenue.map((value: number, index: number) => (
                <TableCell key={index} className="text-right text-red-500">R$ -{Math.round(value * 0.02).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>(-) IR e CSLL</TableCell>
              {companyData.financials.revenue.map((value: number, index: number) => (
                <TableCell key={index} className="text-right">R$ {Math.round(value * 0.05).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            <TableRow className="bg-slate-50 dark:bg-slate-800">
              <TableCell className="font-semibold">Lucro Líquido</TableCell>
              {companyData.financials.profit.map((value: number, index: number) => (
                <TableCell key={index} className="text-right font-semibold">R$ {value.toLocaleString()}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default IncomeStatement;
