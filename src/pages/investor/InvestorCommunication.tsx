
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  CalendarRange, 
  Bell, 
  HelpCircle, 
  FileText,
  Calendar 
} from "lucide-react";
import AnnouncementsTab from "./components/communication/AnnouncementsTab";
import ReportsTab from "./components/communication/ReportsTab";
import QATab from "./components/communication/QATab";
import EventsTab from "./components/communication/EventsTab";
import NotificationsTab from "./components/communication/NotificationsTab";

const InvestorCommunication = () => {
  const [activeTab, setActiveTab] = useState("announcements");

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Central de Comunicação de Investidores</h1>
          <p className="text-slate-600 mt-2">
            Mantenha-se atualizado com notícias, relatórios e eventos das empresas em que você investiu
          </p>
        </div>

        <Tabs 
          defaultValue="announcements" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
            <TabsTrigger value="announcements" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>Anúncios</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Relatórios</span>
            </TabsTrigger>
            <TabsTrigger value="qa" className="flex items-center space-x-2">
              <HelpCircle className="h-4 w-4" />
              <span>Perguntas</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Eventos</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <CalendarRange className="h-4 w-4" />
              <span>Notificações</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="announcements" className="space-y-4">
            <AnnouncementsTab />
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <ReportsTab />
          </TabsContent>

          <TabsContent value="qa" className="space-y-4">
            <QATab />
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <EventsTab />
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <NotificationsTab />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default InvestorCommunication;
