
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
  // Check if financials data exists
  if (!companyData?.financials?.revenue) {
    return (
      <div className="p-4 text-center">
        <p className="text-slate-500">Dados do balanço não disponíveis.</p>
      </div>
    );
  }
  
  // Use the current year for the balance sheet
  const currentYear = new Date().getFullYear();
  
  // Calculate some basic balance sheet items based on existing data
  const totalAssets = companyData.financials.revenue[2] * 1.5;
  const currentAssets = totalAssets * 0.35;
  const fixedAssets = totalAssets * 0.65;
  const totalLiabilities = totalAssets * 0.4;
  const currentLiabilities = totalLiabilities * 0.3;
  const longTermLiabilities = totalLiabilities * 0.7;
  const equity = totalAssets - totalLiabilities;
  
  return (
    <div>
      <h3 className="font-medium text-lg mb-4">Balanço Patrimonial</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
        Data de referência: 31/12/{currentYear}
      </p>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 dark:bg-slate-800">
              <TableHead>Item</TableHead>
              <TableHead className="text-right">Valor (R$)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Assets */}
            <TableRow className="bg-slate-50 dark:bg-slate-800">
              <TableCell className="font-medium">ATIVOS</TableCell>
              <TableCell className="text-right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pl-6">Ativos Circulantes</TableCell>
              <TableCell className="text-right">{currentAssets.toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pl-10">Caixa e Equivalentes</TableCell>
              <TableCell className="text-right">{(currentAssets * 0.45).toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pl-10">Contas a Receber</TableCell>
              <TableCell className="text-right">{(currentAssets * 0.35).toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pl-10">Estoques</TableCell>
              <TableCell className="text-right">{(currentAssets * 0.2).toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pl-6">Ativos Não Circulantes</TableCell>
              <TableCell className="text-right">{fixedAssets.toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pl-10">Imobilizado</TableCell>
              <TableCell className="text-right">{(fixedAssets * 0.7).toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pl-10">Intangível</TableCell>
              <TableCell className="text-right">{(fixedAssets * 0.3).toLocaleString()}</TableCell>
            </TableRow>
            <TableRow className="bg-slate-50 dark:bg-slate-800">
              <TableCell className="font-medium">Total de Ativos</TableCell>
              <TableCell className="text-right font-medium">{totalAssets.toLocaleString()}</TableCell>
            </TableRow>
            
            {/* Liabilities and Equity */}
            <TableRow className="bg-slate-50 dark:bg-slate-800">
              <TableCell className="font-medium">PASSIVOS E PATRIMÔNIO LÍQUIDO</TableCell>
              <TableCell className="text-right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pl-6">Passivos Circulantes</TableCell>
              <TableCell className="text-right">{currentLiabilities.toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pl-10">Contas a Pagar</TableCell>
              <TableCell className="text-right">{(currentLiabilities * 0.6).toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pl-10">Empréstimos de Curto Prazo</TableCell>
              <TableCell className="text-right">{(currentLiabilities * 0.4).toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pl-6">Passivos Não Circulantes</TableCell>
              <TableCell className="text-right">{longTermLiabilities.toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pl-10">Empréstimos de Longo Prazo</TableCell>
              <TableCell className="text-right">{(longTermLiabilities * 0.8).toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pl-10">Provisões</TableCell>
              <TableCell className="text-right">{(longTermLiabilities * 0.2).toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pl-6">Patrimônio Líquido</TableCell>
              <TableCell className="text-right">{equity.toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pl-10">Capital Social</TableCell>
              <TableCell className="text-right">{(equity * 0.7).toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pl-10">Reservas de Lucro</TableCell>
              <TableCell className="text-right">{(equity * 0.3).toLocaleString()}</TableCell>
            </TableRow>
            <TableRow className="bg-slate-50 dark:bg-slate-800">
              <TableCell className="font-medium">Total de Passivos e Patrimônio Líquido</TableCell>
              <TableCell className="text-right font-medium">{totalAssets.toLocaleString()}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BalanceSheet;
