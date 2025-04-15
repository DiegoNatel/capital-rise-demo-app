
import { useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { companies } from "@/data/companies";
import InvestorsTab from "./components/InvestorsTab";
import OverviewTab from "./components/OverviewTab";
import OffersTab from "./components/OffersTab";
import CompanyHeader from "./components/CompanyHeader";
import FinancialsTab from "./components/FinancialsTab";

const CompanyProfile = () => {
  const { id } = useParams();
  // Find company by ID, or use the first company as a fallback for demo
  const companyData = companies.find(company => company.id === id) || companies[0];

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

export default CompanyProfile;
