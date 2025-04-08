
import { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CompaniesTabs from "./CompaniesTabs";
import CompaniesGrid from "./CompaniesGrid";
import { CompanyWithOffers } from "./CompanyCard";
import { FilterOptions } from "./FilterBar";
import { filterCompanies } from "../utils/filterCompanies";

interface CompaniesSectionProps {
  companies: CompanyWithOffers[];
  filter: FilterOptions;
}

const CompaniesSection = ({ companies, filter }: CompaniesSectionProps) => {
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter companies based on tabs and filter options
  const filteredCompanies = filterCompanies(companies, filter, activeTab);
  
  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Empresas Disponíveis</CardTitle>
          <CardDescription>
            Explore as empresas disponíveis para investimento
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-52">
            <Tabs value={activeTab} orientation="vertical" className="w-full">
              <CompaniesTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            </Tabs>
          </div>
          
          <div className="flex-1">
            <CompaniesGrid companies={filteredCompanies} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompaniesSection;
