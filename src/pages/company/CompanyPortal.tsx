
import MainLayout from "@/components/layout/MainLayout";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { companies } from "@/data/companies";

// Import our component files
import CompanyHeader from "./components/CompanyHeader";
import OverviewTab from "./components/OverviewTab";
import OffersTab from "./components/OffersTab";
import FinancialsTab from "./components/FinancialsTab";
import InvestorsTab from "./components/InvestorsTab";
import { Company } from "./components/types";

// Sample company for demo purposes
// Cast the company to our Company interface
const companyData = companies[0] as unknown as Company;

const CompanyPortal = () => {
  return (
    <MainLayout>
      <div className="container py-8">
        {/* Company Header */}
        <CompanyHeader companyData={companyData} />
        
        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="mt-8">
          <TabsList className="grid grid-cols-4 w-full max-w-3xl">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="offers">Ofertas</TabsTrigger>
            <TabsTrigger value="financials">Financeiro</TabsTrigger>
            <TabsTrigger value="investors">Investidores</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview">
            <OverviewTab companyData={companyData} />
          </TabsContent>
          
          {/* Offers Tab */}
          <TabsContent value="offers">
            <OffersTab companyData={companyData} />
          </TabsContent>
          
          {/* Financials Tab */}
          <TabsContent value="financials">
            <FinancialsTab companyData={companyData} />
          </TabsContent>
          
          {/* Investors Tab */}
          <TabsContent value="investors">
            <InvestorsTab companyData={companyData} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default CompanyPortal;
