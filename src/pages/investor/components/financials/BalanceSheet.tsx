
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BalanceSheetProps {
  companyData: any;
}

const BalanceSheet = ({ companyData }: BalanceSheetProps) => {
  return (
    <>
      <h3 className="font-medium text-lg mb-4">Balanço Patrimonial</h3>
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
              <TableCell className="font-semibold">ATIVO</TableCell>
              {companyData.financials.years.map((year: string, index: number) => (
                <TableCell key={index} className="text-right font-semibold"></TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Ativo Circulante</TableCell>
              {companyData.financials.revenue.map((value: number, index: number) => (
                <TableCell key={index} className="text-right">R$ {Math.round(value * 0.4).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="pl-6">Caixa e equivalentes</TableCell>
              {companyData.financials.revenue.map((value: number, index: number) => (
                <TableCell key={index} className="text-right">R$ {Math.round(value * 0.15).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="pl-6">Contas a receber</TableCell>
              {companyData.financials.revenue.map((value: number, index: number) => (
                <TableCell key={index} className="text-right">R$ {Math.round(value * 0.18).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="pl-6">Estoques</TableCell>
              {companyData.financials.revenue.map((value: number, index: number) => (
                <TableCell key={index} className="text-right">R$ {Math.round(value * 0.07).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Ativo Não Circulante</TableCell>
              {companyData.financials.revenue.map((value: number, index: number) => (
                <TableCell key={index} className="text-right">R$ {Math.round(value * 0.6).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="pl-6">Imobilizado</TableCell>
              {companyData.financials.revenue.map((value: number, index: number) => (
                <TableCell key={index} className="text-right">R$ {Math.round(value * 0.4).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="pl-6">Intangível</TableCell>
              {companyData.financials.revenue.map((value: number, index: number) => (
                <TableCell key={index} className="text-right">R$ {Math.round(value * 0.2).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            <TableRow className="bg-slate-50 dark:bg-slate-800">
              <TableCell className="font-semibold">TOTAL DO ATIVO</TableCell>
              {companyData.financials.revenue.map((value: number, index: number) => (
                <TableCell key={index} className="text-right font-semibold">R$ {Math.round(value * 1.0).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            
            <TableRow className="bg-slate-50 dark:bg-slate-800">
              <TableCell className="font-semibold">PASSIVO E PATRIMÔNIO LÍQUIDO</TableCell>
              {companyData.financials.years.map((year: string, index: number) => (
                <TableCell key={index} className="text-right font-semibold"></TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Passivo Circulante</TableCell>
              {companyData.financials.revenue.map((value: number, index: number) => (
                <TableCell key={index} className="text-right">R$ {Math.round(value * 0.25).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="pl-6">Fornecedores</TableCell>
              {companyData.financials.revenue.map((value: number, index: number) => (
                <TableCell key={index} className="text-right">R$ {Math.round(value * 0.12).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="pl-6">Empréstimos de curto prazo</TableCell>
              {companyData.financials.revenue.map((value: number, index: number) => (
                <TableCell key={index} className="text-right">R$ {Math.round(value * 0.08).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="pl-6">Obrigações tributárias</TableCell>
              {companyData.financials.revenue.map((value: number, index: number) => (
                <TableCell key={index} className="text-right">R$ {Math.round(value * 0.05).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Passivo Não Circulante</TableCell>
              {companyData.financials.revenue.map((value: number, index: number) => (
                <TableCell key={index} className="text-right">R$ {Math.round(value * 0.35).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="pl-6">Empréstimos de longo prazo</TableCell>
              {companyData.financials.revenue.map((value: number, index: number) => (
                <TableCell key={index} className="text-right">R$ {Math.round(value * 0.35).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Patrimônio Líquido</TableCell>
              {companyData.financials.revenue.map((value: number, index: number) => (
                <TableCell key={index} className="text-right">R$ {Math.round(value * 0.4).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="pl-6">Capital social</TableCell>
              {companyData.financials.revenue.map((value: number, index: number) => (
                <TableCell key={index} className="text-right">R$ {Math.round(value * 0.25).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="pl-6">Reservas de lucros</TableCell>
              {companyData.financials.revenue.map((value: number, index: number) => (
                <TableCell key={index} className="text-right">R$ {Math.round(value * 0.15).toLocaleString()}</TableCell>
              ))}
            </TableRow>
            <TableRow className="bg-slate-50 dark:bg-slate-800">
              <TableCell className="font-semibold">TOTAL DO PASSIVO E PATRIMÔNIO LÍQUIDO</TableCell>
              {companyData.financials.revenue.map((value: number, index: number) => (
                <TableCell key={index} className="text-right font-semibold">R$ {Math.round(value * 1.0).toLocaleString()}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default BalanceSheet;
