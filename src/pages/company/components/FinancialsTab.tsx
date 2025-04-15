
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
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-700">
                      <th className="text-left p-3 text-sm font-medium">Item</th>
                      {companyData.financials.years.map((year, index) => (
                        <th key={index} className="text-right p-3 text-sm font-medium">{year}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-3 font-medium">Receita Bruta</td>
                      {companyData.financials.revenue.map((value, index) => (
                        <td key={index} className="text-right p-3">R$ {value.toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-3">(-) Impostos sobre vendas</td>
                      {companyData.financials.revenue.map((value, index) => (
                        <td key={index} className="text-right p-3">R$ {Math.round(value * 0.12).toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-3">(-) Devoluções e abatimentos</td>
                      {companyData.financials.revenue.map((value, index) => (
                        <td key={index} className="text-right p-3">R$ {Math.round(value * 0.03).toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                      <td className="p-3 font-medium">Receita Líquida</td>
                      {companyData.financials.revenue.map((value, index) => (
                        <td key={index} className="text-right p-3 font-medium">R$ {Math.round(value * 0.85).toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-3">(-) Custo dos produtos/serviços</td>
                      {companyData.financials.revenue.map((value, index) => (
                        <td key={index} className="text-right p-3">R$ {Math.round(value * 0.35).toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                      <td className="p-3 font-medium">Lucro Bruto</td>
                      {companyData.financials.revenue.map((value, index) => (
                        <td key={index} className="text-right p-3 font-medium">R$ {Math.round(value * 0.5).toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-3">(-) Despesas operacionais</td>
                      {companyData.financials.revenue.map((value, index) => (
                        <td key={index} className="text-right p-3">R$ {Math.round(value * 0.25).toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-3">(-) Despesas com vendas</td>
                      {companyData.financials.revenue.map((value, index) => (
                        <td key={index} className="text-right p-3">R$ {Math.round(value * 0.1).toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-3">(-) Despesas administrativas</td>
                      {companyData.financials.revenue.map((value, index) => (
                        <td key={index} className="text-right p-3">R$ {Math.round(value * 0.15).toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                      <td className="p-3 font-medium">EBITDA</td>
                      {companyData.financials.revenue.map((value, index) => (
                        <td key={index} className="text-right p-3 font-medium">R$ {Math.round(value * 0.25).toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-3">(-) Depreciação e amortização</td>
                      {companyData.financials.revenue.map((value, index) => (
                        <td key={index} className="text-right p-3">R$ {Math.round(value * 0.03).toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-3">(+/-) Resultado financeiro</td>
                      {companyData.financials.revenue.map((value, index) => (
                        <td key={index} className="text-right p-3 text-red-500">R$ -{Math.round(value * 0.02).toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-3">(-) IR e CSLL</td>
                      {companyData.financials.revenue.map((value, index) => (
                        <td key={index} className="text-right p-3">R$ {Math.round(value * 0.05).toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                      <td className="p-3 font-semibold">Lucro Líquido</td>
                      {companyData.financials.profit.map((value, index) => (
                        <td key={index} className="text-right p-3 font-semibold">R$ {value.toLocaleString()}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            {/* Balance Sheet */}
            <TabsContent value="balance">
              <h3 className="font-medium text-lg mb-4">Balanço Patrimonial</h3>
              <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-700">
                      <th className="text-left p-3 text-sm font-medium">Item</th>
                      {companyData.financials.years.map((year, index) => (
                        <th key={index} className="text-right p-3 text-sm font-medium">{year}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                      <td className="p-3 font-semibold">ATIVO</td>
                      {companyData.financials.years.map((year, index) => (
                        <td key={index} className="text-right p-3 font-semibold"></td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-3 font-medium">Ativo Circulante</td>
                      {companyData.financials.revenue.map((value, index) => (
                        <td key={index} className="text-right p-3">R$ {Math.round(value * 0.4).toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-3 pl-6">Caixa e equivalentes</td>
                      {companyData.financials.revenue.map((value, index) => (
                        <td key={index} className="text-right p-3">R$ {Math.round(value * 0.15).toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-3 pl-6">Contas a receber</td>
                      {companyData.financials.revenue.map((value, index) => (
                        <td key={index} className="text-right p-3">R$ {Math.round(value * 0.18).toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-3 pl-6">Estoques</td>
                      {companyData.financials.revenue.map((value, index) => (
                        <td key={index} className="text-right p-3">R$ {Math.round(value * 0.07).toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-3 font-medium">Ativo Não Circulante</td>
                      {companyData.financials.revenue.map((value, index) => (
                        <td key={index} className="text-right p-3">R$ {Math.round(value * 0.6).toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-3 pl-6">Imobilizado</td>
                      {companyData.financials.revenue.map((value, index) => (
                        <td key={index} className="text-right p-3">R$ {Math.round(value * 0.4).toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-3 pl-6">Intangível</td>
                      {companyData.financials.revenue.map((value, index) => (
                        <td key={index} className="text-right p-3">R$ {Math.round(value * 0.2).toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                      <td className="p-3 font-semibold">TOTAL DO ATIVO</td>
                      {companyData.financials.revenue.map((value, index) => (
                        <td key={index} className="text-right p-3 font-semibold">R$ {Math.round(value * 1.0).toLocaleString()}</td>
                      ))}
                    </tr>
                    
                    <tr className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                      <td className="p-3 font-semibold">PASSIVO E PATRIMÔNIO LÍQUIDO</td>
                      {companyData.financials.years.map((year, index) => (
                        <td key={index} className="text-right p-3 font-semibold"></td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-3 font-medium">Passivo Circulante</td>
                      {companyData.financials.revenue.map((value, index) => (
                        <td key={index} className="text-right p-3">R$ {Math.round(value * 0.25).toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-3 pl-6">Fornecedores</td>
                      {companyData.financials.revenue.map((value, index) => (
                        <td key={index} className="text-right p-3">R$ {Math.round(value * 0.12).toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-3 pl-6">Empréstimos de curto prazo</td>
                      {companyData.financials.revenue.map((value, index) => (
                        <td key={index} className="text-right p-3">R$ {Math.round(value * 0.08).toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-3 pl-6">Obrigações tributárias</td>
                      {companyData.financials.revenue.map((value, index) => (
                        <td key={index} className="text-right p-3">R$ {Math.round(value * 0.05).toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-3 font-medium">Passivo Não Circulante</td>
                      {companyData.financials.revenue.map((value, index) => (
                        <td key={index} className="text-right p-3">R$ {Math.round(value * 0.35).toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-3 pl-6">Empréstimos de longo prazo</td>
                      {companyData.financials.revenue.map((value, index) => (
                        <td key={index} className="text-right p-3">R$ {Math.round(value * 0.35).toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-3 font-medium">Patrimônio Líquido</td>
                      {companyData.financials.revenue.map((value, index) => (
                        <td key={index} className="text-right p-3">R$ {Math.round(value * 0.4).toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-3 pl-6">Capital social</td>
                      {companyData.financials.revenue.map((value, index) => (
                        <td key={index} className="text-right p-3">R$ {Math.round(value * 0.25).toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-3 pl-6">Reservas de lucros</td>
                      {companyData.financials.revenue.map((value, index) => (
                        <td key={index} className="text-right p-3">R$ {Math.round(value * 0.15).toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                      <td className="p-3 font-semibold">TOTAL DO PASSIVO E PATRIMÔNIO LÍQUIDO</td>
                      {companyData.financials.revenue.map((value, index) => (
                        <td key={index} className="text-right p-3 font-semibold">R$ {Math.round(value * 1.0).toLocaleString()}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            {/* Cash Flow Statement */}
            <TabsContent value="cashflow">
              <h3 className="font-medium text-lg mb-4">Demonstrativo de Fluxo de Caixa</h3>
              <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-700">
                      <th className="text-left p-3 text-sm font-medium">Item</th>
                      {companyData.financials.years.map((year, index) => (
                        <th key={index} className="text-right p-3 text-sm font-medium">{year}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                      <td className="p-3 font-medium">Fluxo de Caixa Operacional</td>
                      {companyData.financials.years.map((year, index) => (
                        <td key={index} className="text-right p-3 font-medium"></td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-3">Lucro líquido</td>
                      {companyData.financials.profit.map((value, index) => (
                        <td key={index} className="text-right p-3">R$ {value.toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-3">(+) Depreciação e amortização</td>
                      {companyData.financials.revenue.map((value, index) => (
                        <td key={index} className="text-right p-3">R$ {Math.round(value * 0.03).toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-3">(+/-) Variação no capital de giro</td>
                      {companyData.financials.revenue.map((value, index) => (
                        <td key={index} className="text-right p-3 text-red-500">R$ -{Math.round(value * 0.04).toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-3 font-medium">Caixa líquido das atividades operacionais</td>
                      {companyData.financials.profit.map((value, index) => (
                        <td key={index} className="text-right p-3 font-medium">R$ {Math.round(value * 1.04).toLocaleString()}</td>
                      ))}
                    </tr>
                    
                    <tr className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                      <td className="p-3 font-medium">Fluxo de Caixa de Investimento</td>
                      {companyData.financials.years.map((year, index) => (
                        <td key={index} className="text-right p-3 font-medium"></td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-3">(-) Aquisição de imobilizado</td>
                      {companyData.financials.revenue.map((value, index) => (
                        <td key={index} className="text-right p-3 text-red-500">R$ -{Math.round(value * 0.08).toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-3">(-) Investimentos em intangíveis</td>
                      {companyData.financials.revenue.map((value, index) => (
                        <td key={index} className="text-right p-3 text-red-500">R$ -{Math.round(value * 0.05).toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-3 font-medium">Caixa líquido das atividades de investimento</td>
                      {companyData.financials.revenue.map((value, index) => (
                        <td key={index} className="text-right p-3 font-medium text-red-500">R$ -{Math.round(value * 0.13).toLocaleString()}</td>
                      ))}
                    </tr>
                    
                    <tr className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                      <td className="p-3 font-medium">Fluxo de Caixa de Financiamento</td>
                      {companyData.financials.years.map((year, index) => (
                        <td key={index} className="text-right p-3 font-medium"></td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-3">(+) Captação de empréstimos</td>
                      {companyData.financials.revenue.map((value, index) => (
                        <td key={index} className="text-right p-3">R$ {Math.round(value * 0.1).toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-3">(-) Amortização de empréstimos</td>
                      {companyData.financials.revenue.map((value, index) => (
                        <td key={index} className="text-right p-3 text-red-500">R$ -{Math.round(value * 0.07).toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-3">(-) Dividendos pagos</td>
                      {companyData.financials.profit.map((value, index) => (
                        <td key={index} className="text-right p-3 text-red-500">R$ -{Math.round(value * 0.3).toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-3 font-medium">Caixa líquido das atividades de financiamento</td>
                      {companyData.financials.profit.map((value, index) => (
                        <td key={index} className="text-right p-3 font-medium text-red-500">R$ -{Math.round(value * 0.2).toLocaleString()}</td>
                      ))}
                    </tr>
                    
                    <tr className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                      <td className="p-3 font-semibold">Aumento/Redução do Caixa</td>
                      {companyData.financials.profit.map((value, index) => {
                        const operacional = value * 1.04;
                        const investimento = -companyData.financials.revenue[index] * 0.13;
                        const financiamento = -value * 0.2;
                        const total = operacional + investimento + financiamento;
                        return (
                          <td key={index} className={`text-right p-3 font-semibold ${total >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {total >= 0 ? 'R$ ' : 'R$ -'}
                            {Math.abs(Math.round(total)).toLocaleString()}
                          </td>
                        );
                      })}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-3">Caixa no início do período</td>
                      {companyData.financials.revenue.map((value, index) => (
                        <td key={index} className="text-right p-3">R$ {Math.round(value * 0.12).toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-3 font-medium">Caixa no fim do período</td>
                      {companyData.financials.profit.map((value, index) => {
                        const operacional = value * 1.04;
                        const investimento = -companyData.financials.revenue[index] * 0.13;
                        const financiamento = -value * 0.2;
                        const variacao = operacional + investimento + financiamento;
                        const inicial = companyData.financials.revenue[index] * 0.12;
                        const final = inicial + variacao;
                        return (
                          <td key={index} className="text-right p-3 font-medium">
                            R$ {Math.round(final).toLocaleString()}
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
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
