
// Create a placeholder Dashboard component to fix build errors
// This is a minimal implementation to resolve the build error
import { User } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <p className="text-slate-500 mb-8">
          Bem-vindo ao seu painel de controle
        </p>
        
        <div className="flex items-center gap-2 text-slate-500">
          <User className="h-5 w-5" />
          <span>Usuário conectado</span>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
