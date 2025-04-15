
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
  // Check if we have the minimal financial data required
  const hasFinancialData = companyData && companyData.financials;

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
          {hasFinancialData ? (
            <>
              {/* Financial Statement Tabs */}
              <FinancialStatementTabs companyData={companyData} />
              
              {/* Financial Indicators */}
              <FinancialIndicators companyData={companyData} />
            </>
          ) : (
            <div className="py-8 text-center">
              <p className="text-slate-500 mb-4">Não há dados financeiros disponíveis para esta empresa.</p>
            </div>
          )}
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
