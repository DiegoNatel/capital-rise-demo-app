
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CompaniesTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const CompaniesTabs = ({ activeTab, setActiveTab }: CompaniesTabsProps) => {
  return (
    <TabsList className="flex flex-row md:flex-col h-auto w-full bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
      <TabsTrigger value="all" className="flex-1 md:flex-none" onClick={() => setActiveTab("all")}>
        Todas
      </TabsTrigger>
      <TabsTrigger value="active" className="flex-1 md:flex-none" onClick={() => setActiveTab("active")}>
        Ativas
      </TabsTrigger>
      <TabsTrigger value="upcoming" className="flex-1 md:flex-none" onClick={() => setActiveTab("upcoming")}>
        Em breve
      </TabsTrigger>
      <TabsTrigger value="completed" className="flex-1 md:flex-none" onClick={() => setActiveTab("completed")}>
        Concluídas
      </TabsTrigger>
    </TabsList>
  );
};

export default CompaniesTabs;
