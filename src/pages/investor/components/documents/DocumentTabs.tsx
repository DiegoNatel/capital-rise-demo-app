
import { FileText, FileCheck, Folder, FileCog } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DocumentTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const DocumentTabs = ({ activeTab, onTabChange }: DocumentTabsProps) => {
  return (
    <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
      <div className="flex overflow-x-auto">
        <TabsTrigger 
          value="financial" 
          onClick={() => onTabChange("financial")}
          className="flex items-center data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:shadow-none"
        >
          <FileText className="h-4 w-4 mr-2" />
          <span>Financeiros</span>
        </TabsTrigger>
        <TabsTrigger 
          value="legal"
          onClick={() => onTabChange("legal")}
          className="flex items-center data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:shadow-none"
        >
          <FileCheck className="h-4 w-4 mr-2" />
          <span>Legais</span>
        </TabsTrigger>
        <TabsTrigger 
          value="presentations"
          onClick={() => onTabChange("presentations")}
          className="flex items-center data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:shadow-none"
        >
          <Folder className="h-4 w-4 mr-2" />
          <span>Apresentações</span>
        </TabsTrigger>
        <TabsTrigger 
          value="others"
          onClick={() => onTabChange("others")}
          className="flex items-center data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:shadow-none"
        >
          <FileCog className="h-4 w-4 mr-2" />
          <span>Outros</span>
        </TabsTrigger>
      </div>
    </TabsList>
  );
};

export default DocumentTabs;
