
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 dark:bg-slate-700">
                    <TableHead>Acionista</TableHead>
                    <TableHead className="text-right">Percentual</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Fundadores</TableCell>
                    <TableCell className="text-right">65%</TableCell>
                    <TableCell className="text-right">R$ {(companyData.valuation * 0.65).toLocaleString()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Investidores Anjo</TableCell>
                    <TableCell className="text-right">15%</TableCell>
                    <TableCell className="text-right">R$ {(companyData.valuation * 0.15).toLocaleString()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tokenholders</TableCell>
                    <TableCell className="text-right">12%</TableCell>
                    <TableCell className="text-right">R$ {(companyData.valuation * 0.12).toLocaleString()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Pool de Opções</TableCell>
                    <TableCell className="text-right">8%</TableCell>
                    <TableCell className="text-right">R$ {(companyData.valuation * 0.08).toLocaleString()}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Principais Investidores</h3>
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 dark:bg-slate-700">
                    <TableHead>Investidor</TableHead>
                    <TableHead className="text-right">Participação</TableHead>
                    <TableHead className="text-right">Valor Investido</TableHead>
                    <TableHead className="text-right">Data de Entrada</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Renato Freitas</TableCell>
                    <TableCell className="text-right">5.2%</TableCell>
                    <TableCell className="text-right">R$ 780.000</TableCell>
                    <TableCell className="text-right">12/03/2023</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Fundo Inovação Capital</TableCell>
                    <TableCell className="text-right">4.8%</TableCell>
                    <TableCell className="text-right">R$ 720.000</TableCell>
                    <TableCell className="text-right">28/03/2023</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>André Maciel</TableCell>
                    <TableCell className="text-right">3.5%</TableCell>
                    <TableCell className="text-right">R$ 525.000</TableCell>
                    <TableCell className="text-right">15/04/2023</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Startup Brasil Ventures</TableCell>
                    <TableCell className="text-right">3.2%</TableCell>
                    <TableCell className="text-right">R$ 480.000</TableCell>
                    <TableCell className="text-right">07/05/2023</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Carolina Medeiros</TableCell>
                    <TableCell className="text-right">2.8%</TableCell>
                    <TableCell className="text-right">R$ 420.000</TableCell>
                    <TableCell className="text-right">22/05/2023</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
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
