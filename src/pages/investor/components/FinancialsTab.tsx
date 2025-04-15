
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import FinancialStatementTabs from "./financials/FinancialStatementTabs";
import FinancialIndicators from "./financials/FinancialIndicators";

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
          {/* Financial Statement Tabs */}
          <FinancialStatementTabs companyData={companyData} />
          
          {/* Financial Indicators */}
          <FinancialIndicators companyData={companyData} />
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
