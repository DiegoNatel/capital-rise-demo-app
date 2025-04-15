
import { FileText, FileSpreadsheet, BarChart3 } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import IncomeStatement from "./IncomeStatement";
import BalanceSheet from "./BalanceSheet";
import CashFlowStatement from "./CashFlowStatement";

interface FinancialStatementTabsProps {
  companyData: any;
}

const FinancialStatementTabs = ({ companyData }: FinancialStatementTabsProps) => {
  return (
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
