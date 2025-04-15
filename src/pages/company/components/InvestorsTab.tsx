
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface InvestorsTabProps {
  companyData: any;
}

const InvestorsTab = ({ companyData }: InvestorsTabProps) => {
  return (
    <div className="space-y-8 mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Base de Investidores</CardTitle>
          <CardDescription>
            Perfil e distribuição dos investidores
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
              <p className="text-sm text-slate-500 dark:text-slate-400">Total de Investidores</p>
              <p className="text-3xl font-bold mt-1">142</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
              <p className="text-sm text-slate-500 dark:text-slate-400">Ticket Médio</p>
              <p className="text-3xl font-bold mt-1">R$ 22.887</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
              <p className="text-sm text-slate-500 dark:text-slate-400">Retenção</p>
              <p className="text-3xl font-bold mt-1">94%</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Cap Table</h3>
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-700">
                    <th className="text-left p-3 text-sm font-medium">Acionista</th>
                    <th className="text-right p-3 text-sm font-medium">Percentual</th>
                    <th className="text-right p-3 text-sm font-medium">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-200 dark:border-slate-700">
                    <td className="p-3">Fundadores</td>
                    <td className="text-right p-3">65%</td>
                    <td className="text-right p-3">R$ {(companyData.valuation * 0.65).toLocaleString()}</td>
                  </tr>
                  <tr className="border-t border-slate-200 dark:border-slate-700">
                    <td className="p-3">Investidores Anjo</td>
                    <td className="text-right p-3">15%</td>
                    <td className="text-right p-3">R$ {(companyData.valuation * 0.15).toLocaleString()}</td>
                  </tr>
                  <tr className="border-t border-slate-200 dark:border-slate-700">
                    <td className="p-3">Tokenholders</td>
                    <td className="text-right p-3">12%</td>
                    <td className="text-right p-3">R$ {(companyData.valuation * 0.12).toLocaleString()}</td>
                  </tr>
                  <tr className="border-t border-slate-200 dark:border-slate-700">
                    <td className="p-3">Pool de Opções</td>
                    <td className="text-right p-3">8%</td>
                    <td className="text-right p-3">R$ {(companyData.valuation * 0.08).toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Principais Investidores</h3>
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-700">
                    <th className="text-left p-3 text-sm font-medium">Investidor</th>
                    <th className="text-right p-3 text-sm font-medium">Participação</th>
                    <th className="text-right p-3 text-sm font-medium">Valor Investido</th>
                    <th className="text-right p-3 text-sm font-medium">Data de Entrada</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-200 dark:border-slate-700">
                    <td className="p-3">Renato Freitas</td>
                    <td className="text-right p-3">5.2%</td>
                    <td className="text-right p-3">R$ 780.000</td>
                    <td className="text-right p-3">12/03/2023</td>
                  </tr>
                  <tr className="border-t border-slate-200 dark:border-slate-700">
                    <td className="p-3">Fundo Inovação Capital</td>
                    <td className="text-right p-3">4.8%</td>
                    <td className="text-right p-3">R$ 720.000</td>
                    <td className="text-right p-3">28/03/2023</td>
                  </tr>
                  <tr className="border-t border-slate-200 dark:border-slate-700">
                    <td className="p-3">André Maciel</td>
                    <td className="text-right p-3">3.5%</td>
                    <td className="text-right p-3">R$ 525.000</td>
                    <td className="text-right p-3">15/04/2023</td>
                  </tr>
                  <tr className="border-t border-slate-200 dark:border-slate-700">
                    <td className="p-3">Startup Brasil Ventures</td>
                    <td className="text-right p-3">3.2%</td>
                    <td className="text-right p-3">R$ 480.000</td>
                    <td className="text-right p-3">07/05/2023</td>
                  </tr>
                  <tr className="border-t border-slate-200 dark:border-slate-700">
                    <td className="p-3">Carolina Medeiros</td>
                    <td className="text-right p-3">2.8%</td>
                    <td className="text-right p-3">R$ 420.000</td>
                    <td className="text-right p-3">22/05/2023</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Tipos de Investidores</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                <p className="font-medium mb-1">Pessoa Física</p>
                <div className="w-full h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand-blue-500 rounded-full" 
                    style={{ width: '82%' }}
                  />
                </div>
                <div className="flex justify-between mt-1 text-sm">
                  <span>82%</span>
                  <span>116 investidores</span>
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                <p className="font-medium mb-1">Pessoa Jurídica</p>
                <div className="w-full h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand-green-500 rounded-full" 
                    style={{ width: '13%' }}
                  />
                </div>
                <div className="flex justify-between mt-1 text-sm">
                  <span>13%</span>
                  <span>19 investidores</span>
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                <p className="font-medium mb-1">Institucional</p>
                <div className="w-full h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-500 rounded-full" 
                    style={{ width: '5%' }}
                  />
                </div>
                <div className="flex justify-between mt-1 text-sm">
                  <span>5%</span>
                  <span>7 investidores</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestorsTab;
