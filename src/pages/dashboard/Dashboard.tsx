
import { User, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/components/layout/MainLayout";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-slate-500 mb-4">
              Bem-vindo ao seu painel de controle
            </p>
          </div>
          
          <Button asChild>
            <Link to="/company/audits">
              Ver Todos os Registros
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Informações da Conta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center">
                  <User className="h-6 w-6 text-slate-600" />
                </div>
                <div>
                  <p className="font-medium">Usuário Corporativo</p>
                  <p className="text-sm text-slate-500">admin@empresa.com.br</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Auditorias Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Auditoria Financeira</p>
                    <p className="text-sm text-slate-500">Aprovada em 15/03/2025</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Verificação de Conformidade</p>
                    <p className="text-sm text-slate-500">Aprovada em 02/04/2025</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Auditoria Pendente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium">Auditoria Semestral</p>
                  <p className="text-sm text-slate-500">Prazo: 30/04/2025</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Submeter Documentos
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Registros de Auditoria Recentes</h2>
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Atualização de Documentos Financeiros</h3>
                  <p className="text-sm text-slate-500">07/04/2025 às 14:32</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Aprovado</span>
              </div>
            </div>
            
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Submissão de Balanço Trimestral</h3>
                  <p className="text-sm text-slate-500">01/04/2025 às 10:15</p>
                </div>
                <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">Em revisão</span>
              </div>
            </div>
            
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Verificação de Compliance</h3>
                  <p className="text-sm text-slate-500">15/03/2025 às 09:45</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Aprovado</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Suas Ofertas</h2>
            <Button asChild>
              <Link to="/company/create-offer">
                Criar Nova Oferta
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">Series A Investment Round</h3>
                <div className="flex items-center text-sm text-slate-500 mb-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full mr-2">Ativa</span>
                  <span>Encerra em 30/04/2025</span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">Meta:</span>
                    <span className="font-medium">R$ 5.000.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">Arrecadado:</span>
                    <span className="font-medium">R$ 3.250.000 (65%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">Investidores:</span>
                    <span className="font-medium">142</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Gerenciar Oferta
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">Expansion Funding Round</h3>
                <div className="flex items-center text-sm text-slate-500 mb-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mr-2">Concluída</span>
                  <span>Encerrada em 01/12/2023</span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">Meta:</span>
                    <span className="font-medium">R$ 4.500.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">Arrecadado:</span>
                    <span className="font-medium">R$ 4.500.000 (100%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">Investidores:</span>
                    <span className="font-medium">103</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Ver Relatórios
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
