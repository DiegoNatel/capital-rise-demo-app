
import { FileText, FileSpreadsheet, BarChart3, TrendingUp } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import IncomeStatement from "./IncomeStatement";
import BalanceSheet from "./BalanceSheet";
import CashFlowStatement from "./CashFlowStatement";
import MainIndicators from "./MainIndicators";

interface FinancialStatementTabsProps {
  companyData: any;
}

const FinancialStatementTabs = ({ companyData }: FinancialStatementTabsProps) => {
  return (
    <Tabs defaultValue="indicators" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="indicators" className="flex items-center">
          <TrendingUp className="h-4 w-4 mr-2" />
          Indicadores Principais
        </TabsTrigger>
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
      
      {/* Main Indicators */}
      <TabsContent value="indicators">
        <MainIndicators companyData={companyData} />
      </TabsContent>
      
      {/* Income Statement (DRE) */}
      <TabsContent value="income">
        <IncomeStatement companyData={companyData} />
      </TabsContent>
      
      {/* Balance Sheet */}
      <TabsContent value="balance">
        <BalanceSheet companyData={companyData} />
      </TabsContent>
      
      {/* Cash Flow Statement */}
      <TabsContent value="cashflow">
        <CashFlowStatement companyData={companyData} />
      </TabsContent>
    </Tabs>
  );
};

export default FinancialStatementTabs;
