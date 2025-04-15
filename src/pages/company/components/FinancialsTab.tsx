
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, TrendingUp, Briefcase, BarChart3, FileSpreadsheet, FileText } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface FinancialsTabProps {
  companyData: any;
}

const FinancialsTab = ({ companyData }: FinancialsTabProps) => {
  return (
    <div className="space-y-8 mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações Financeiras</CardTitle>
          <CardDescription>
            Demonstrações financeiras e indicadores
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <Tabs defaultValue="income" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="income" className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                DRE
              </TabsTrigger>
              <TabsTrigger value="balance" className="flex items-center">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Balanço
              </TabsTrigger>
              <TabsTrigger value="cashflow" className="flex items-center">
                <BarChart3 className="h-4 w-4 mr-2" />
                Fluxo de Caixa
              </TabsTrigger>
            </TabsList>
            
            {/* Income Statement (DRE) */}
            <TabsContent value="income">
              <h3 className="font-medium text-lg mb-4">Demonstrativo de Resultados</h3>
              <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      {companyData.financials.years.map((year, index) => (
                        <TableHead key={index} className="text-right">{year}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Receita Bruta</TableCell>
                      {companyData.financials.revenue.map((value, index) => (
                        <TableCell key={index} className="text-right">R$ {value.toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell>(-) Impostos sobre vendas</TableCell>
                      {companyData.financials.revenue.map((value, index) => (
                        <TableCell key={index} className="text-right">R$ {Math.round(value * 0.12).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell>(-) Devoluções e abatimentos</TableCell>
                      {companyData.financials.revenue.map((value, index) => (
                        <TableCell key={index} className="text-right">R$ {Math.round(value * 0.03).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow className="bg-slate-50 dark:bg-slate-800">
                      <TableCell className="font-medium">Receita Líquida</TableCell>
                      {companyData.financials.revenue.map((value, index) => (
                        <TableCell key={index} className="text-right font-medium">R$ {Math.round(value * 0.85).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell>(-) Custo dos produtos/serviços</TableCell>
                      {companyData.financials.revenue.map((value, index) => (
                        <TableCell key={index} className="text-right">R$ {Math.round(value * 0.35).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow className="bg-slate-50 dark:bg-slate-800">
                      <TableCell className="font-medium">Lucro Bruto</TableCell>
                      {companyData.financials.revenue.map((value, index) => (
                        <TableCell key={index} className="text-right font-medium">R$ {Math.round(value * 0.5).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell>(-) Despesas operacionais</TableCell>
                      {companyData.financials.revenue.map((value, index) => (
                        <TableCell key={index} className="text-right">R$ {Math.round(value * 0.25).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell>(-) Despesas com vendas</TableCell>
                      {companyData.financials.revenue.map((value, index) => (
                        <TableCell key={index} className="text-right">R$ {Math.round(value * 0.1).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell>(-) Despesas administrativas</TableCell>
                      {companyData.financials.revenue.map((value, index) => (
                        <TableCell key={index} className="text-right">R$ {Math.round(value * 0.15).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow className="bg-slate-50 dark:bg-slate-800">
                      <TableCell className="font-medium">EBITDA</TableCell>
                      {companyData.financials.revenue.map((value, index) => (
                        <TableCell key={index} className="text-right font-medium">R$ {Math.round(value * 0.25).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell>(-) Depreciação e amortização</TableCell>
                      {companyData.financials.revenue.map((value, index) => (
                        <TableCell key={index} className="text-right">R$ {Math.round(value * 0.03).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell>(+/-) Resultado financeiro</TableCell>
                      {companyData.financials.revenue.map((value, index) => (
                        <TableCell key={index} className="text-right text-red-500">R$ -{Math.round(value * 0.02).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell>(-) IR e CSLL</TableCell>
                      {companyData.financials.revenue.map((value, index) => (
                        <TableCell key={index} className="text-right">R$ {Math.round(value * 0.05).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow className="bg-slate-50 dark:bg-slate-800">
                      <TableCell className="font-semibold">Lucro Líquido</TableCell>
                      {companyData.financials.profit.map((value, index) => (
                        <TableCell key={index} className="text-right font-semibold">R$ {value.toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            {/* Balance Sheet */}
            <TabsContent value="balance">
              <h3 className="font-medium text-lg mb-4">Balanço Patrimonial</h3>
              <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      {companyData.financials.years.map((year, index) => (
                        <TableHead key={index} className="text-right">{year}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="bg-slate-50 dark:bg-slate-800">
                      <TableCell className="font-semibold">ATIVO</TableCell>
                      {companyData.financials.years.map((year, index) => (
                        <TableCell key={index} className="text-right font-semibold"></TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Ativo Circulante</TableCell>
                      {companyData.financials.revenue.map((value, index) => (
                        <TableCell key={index} className="text-right">R$ {Math.round(value * 0.4).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="pl-6">Caixa e equivalentes</TableCell>
                      {companyData.financials.revenue.map((value, index) => (
                        <TableCell key={index} className="text-right">R$ {Math.round(value * 0.15).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="pl-6">Contas a receber</TableCell>
                      {companyData.financials.revenue.map((value, index) => (
                        <TableCell key={index} className="text-right">R$ {Math.round(value * 0.18).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="pl-6">Estoques</TableCell>
                      {companyData.financials.revenue.map((value, index) => (
                        <TableCell key={index} className="text-right">R$ {Math.round(value * 0.07).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Ativo Não Circulante</TableCell>
                      {companyData.financials.revenue.map((value, index) => (
                        <TableCell key={index} className="text-right">R$ {Math.round(value * 0.6).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="pl-6">Imobilizado</TableCell>
                      {companyData.financials.revenue.map((value, index) => (
                        <TableCell key={index} className="text-right">R$ {Math.round(value * 0.4).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="pl-6">Intangível</TableCell>
                      {companyData.financials.revenue.map((value, index) => (
                        <TableCell key={index} className="text-right">R$ {Math.round(value * 0.2).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow className="bg-slate-50 dark:bg-slate-800">
                      <TableCell className="font-semibold">TOTAL DO ATIVO</TableCell>
                      {companyData.financials.revenue.map((value, index) => (
                        <TableCell key={index} className="text-right font-semibold">R$ {Math.round(value * 1.0).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    
                    <TableRow className="bg-slate-50 dark:bg-slate-800">
                      <TableCell className="font-semibold">PASSIVO E PATRIMÔNIO LÍQUIDO</TableCell>
                      {companyData.financials.years.map((year, index) => (
                        <TableCell key={index} className="text-right font-semibold"></TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Passivo Circulante</TableCell>
                      {companyData.financials.revenue.map((value, index) => (
                        <TableCell key={index} className="text-right">R$ {Math.round(value * 0.25).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="pl-6">Fornecedores</TableCell>
                      {companyData.financials.revenue.map((value, index) => (
                        <TableCell key={index} className="text-right">R$ {Math.round(value * 0.12).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="pl-6">Empréstimos de curto prazo</TableCell>
                      {companyData.financials.revenue.map((value, index) => (
                        <TableCell key={index} className="text-right">R$ {Math.round(value * 0.08).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="pl-6">Obrigações tributárias</TableCell>
                      {companyData.financials.revenue.map((value, index) => (
                        <TableCell key={index} className="text-right">R$ {Math.round(value * 0.05).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Passivo Não Circulante</TableCell>
                      {companyData.financials.revenue.map((value, index) => (
                        <TableCell key={index} className="text-right">R$ {Math.round(value * 0.35).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="pl-6">Empréstimos de longo prazo</TableCell>
                      {companyData.financials.revenue.map((value, index) => (
                        <TableCell key={index} className="text-right">R$ {Math.round(value * 0.35).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Patrimônio Líquido</TableCell>
                      {companyData.financials.revenue.map((value, index) => (
                        <TableCell key={index} className="text-right">R$ {Math.round(value * 0.4).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="pl-6">Capital social</TableCell>
                      {companyData.financials.revenue.map((value, index) => (
                        <TableCell key={index} className="text-right">R$ {Math.round(value * 0.25).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="pl-6">Reservas de lucros</TableCell>
                      {companyData.financials.revenue.map((value, index) => (
                        <TableCell key={index} className="text-right">R$ {Math.round(value * 0.15).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow className="bg-slate-50 dark:bg-slate-800">
                      <TableCell className="font-semibold">TOTAL DO PASSIVO E PATRIMÔNIO LÍQUIDO</TableCell>
                      {companyData.financials.revenue.map((value, index) => (
                        <TableCell key={index} className="text-right font-semibold">R$ {Math.round(value * 1.0).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            {/* Cash Flow Statement */}
            <TabsContent value="cashflow">
              <h3 className="font-medium text-lg mb-4">Demonstrativo de Fluxo de Caixa</h3>
              <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      {companyData.financials.years.map((year, index) => (
                        <TableHead key={index} className="text-right">{year}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="bg-slate-50 dark:bg-slate-800">
                      <TableCell className="font-medium">Fluxo de Caixa Operacional</TableCell>
                      {companyData.financials.years.map((year, index) => (
                        <TableCell key={index} className="text-right font-medium"></TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell>Lucro líquido</TableCell>
                      {companyData.financials.profit.map((value, index) => (
                        <TableCell key={index} className="text-right">R$ {value.toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell>(+) Depreciação e amortização</TableCell>
                      {companyData.financials.revenue.map((value, index) => (
                        <TableCell key={index} className="text-right">R$ {Math.round(value * 0.03).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell>(+/-) Variação no capital de giro</TableCell>
                      {companyData.financials.revenue.map((value, index) => (
                        <TableCell key={index} className="text-right text-red-500">R$ -{Math.round(value * 0.04).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Caixa líquido das atividades operacionais</TableCell>
                      {companyData.financials.profit.map((value, index) => (
                        <TableCell key={index} className="text-right font-medium">R$ {Math.round(value * 1.04).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    
                    <TableRow className="bg-slate-50 dark:bg-slate-800">
                      <TableCell className="font-medium">Fluxo de Caixa de Investimento</TableCell>
                      {companyData.financials.years.map((year, index) => (
                        <TableCell key={index} className="text-right font-medium"></TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell>(-) Aquisição de imobilizado</TableCell>
                      {companyData.financials.revenue.map((value, index) => (
                        <TableCell key={index} className="text-right text-red-500">R$ -{Math.round(value * 0.08).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell>(-) Investimentos em intangíveis</TableCell>
                      {companyData.financials.revenue.map((value, index) => (
                        <TableCell key={index} className="text-right text-red-500">R$ -{Math.round(value * 0.05).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Caixa líquido das atividades de investimento</TableCell>
                      {companyData.financials.revenue.map((value, index) => (
                        <TableCell key={index} className="text-right font-medium text-red-500">R$ -{Math.round(value * 0.13).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    
                    <TableRow className="bg-slate-50 dark:bg-slate-800">
                      <TableCell className="font-medium">Fluxo de Caixa de Financiamento</TableCell>
                      {companyData.financials.years.map((year, index) => (
                        <TableCell key={index} className="text-right font-medium"></TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell>(+) Captação de empréstimos</TableCell>
                      {companyData.financials.revenue.map((value, index) => (
                        <TableCell key={index} className="text-right">R$ {Math.round(value * 0.1).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell>(-) Amortização de empréstimos</TableCell>
                      {companyData.financials.revenue.map((value, index) => (
                        <TableCell key={index} className="text-right text-red-500">R$ -{Math.round(value * 0.07).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell>(-) Dividendos pagos</TableCell>
                      {companyData.financials.profit.map((value, index) => (
                        <TableCell key={index} className="text-right text-red-500">R$ -{Math.round(value * 0.3).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Caixa líquido das atividades de financiamento</TableCell>
                      {companyData.financials.profit.map((value, index) => (
                        <TableCell key={index} className="text-right font-medium text-red-500">R$ -{Math.round(value * 0.2).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    
                    <TableRow className="bg-slate-50 dark:bg-slate-800">
                      <TableCell className="font-semibold">Aumento/Redução do Caixa</TableCell>
                      {companyData.financials.profit.map((value, index) => {
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
                      {companyData.financials.revenue.map((value, index) => (
                        <TableCell key={index} className="text-right">R$ {Math.round(value * 0.12).toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Caixa no fim do período</TableCell>
                      {companyData.financials.profit.map((value, index) => {
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
            </TabsContent>
          </Tabs>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Indicadores Financeiros</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Calendar className="h-5 w-5 text-slate-500 mr-2" />
                  <h4 className="font-medium">Margem Líquida</h4>
                </div>
                <p className="text-2xl font-semibold">
                  {Math.round((companyData.financials.profit[companyData.financials.profit.length - 1] / companyData.financials.revenue[companyData.financials.revenue.length - 1]) * 100)}%
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Último ano fiscal
                </p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <TrendingUp className="h-5 w-5 text-slate-500 mr-2" />
                  <h4 className="font-medium">Taxa de Crescimento</h4>
                </div>
                <p className="text-2xl font-semibold">
                  {companyData.growth}%
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  CAGR 3 anos
                </p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Briefcase className="h-5 w-5 text-slate-500 mr-2" />
                  <h4 className="font-medium">ROI Projetado</h4>
                </div>
                <p className="text-2xl font-semibold">
                  32%
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  5 anos (estimativa)
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full flex justify-end space-x-4">
            <Button variant="outline">Atualizar Dados</Button>
            <Button variant="outline">Fazer Upload de Documentos</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FinancialsTab;
