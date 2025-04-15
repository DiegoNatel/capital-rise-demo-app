
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight, CheckCircle, Users, TrendingUp, DollarSign, BarChart3 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { offersWithCompanyData } from "@/data/offers";

interface OverviewTabProps {
  companyData: any;
}

const OverviewTab = ({ companyData }: OverviewTabProps) => {
  const activeOffers = offersWithCompanyData.filter(offer => 
    offer.companyId === companyData.id && offer.status === "active"
  );

  return (
    <div className="space-y-8 mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Resumo da Empresa</CardTitle>
          <CardDescription>
            Informações gerais e destaques da operação
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium text-lg mb-2">Sobre nós</h3>
            <p className="text-slate-600 dark:text-slate-300">{companyData.description}</p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-2">Destaques</h3>
            <ul className="grid md:grid-cols-2 gap-2">
              {companyData.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Equipe de Liderança</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {companyData.team.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="h-20 w-20 mx-auto rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mb-3">
                    <Users className="h-8 w-8 text-slate-500" />
                  </div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{member.position}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Active Offerings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Ofertas Ativas</CardTitle>
            <CardDescription>
              Captações em andamento
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/marketplace">
              Ver Todas
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {activeOffers.length > 0 ? (
            <div className="space-y-6">
              {activeOffers.map((offer) => (
                <div key={offer.id} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                  <h3 className="font-medium text-lg mb-2">{offer.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
                    {offer.description}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Meta</p>
                      <p className="font-medium">R$ {offer.goalAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Captado</p>
                      <p className="font-medium">R$ {offer.raisedAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Investidores</p>
                      <p className="font-medium">{offer.investors}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Token</p>
                      <p className="font-medium">{offer.tokenSymbol} (R$ {offer.tokenPrice.toFixed(2)})</p>
                    </div>
                  </div>
                  
                  <div className="mb-1 flex justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>Progresso:</span>
                    <span>{Math.round((offer.raisedAmount / offer.goalAmount) * 100)}%</span>
                  </div>
                  <Progress 
                    value={Math.round((offer.raisedAmount / offer.goalAmount) * 100)} 
                    className="h-2 mb-4"
                  />
                  
                  <div className="text-sm text-slate-500 dark:text-slate-400 flex justify-between items-center">
                    <span>Início: {new Date(offer.startDate).toLocaleDateString('pt-BR')}</span>
                    <span>Término: {new Date(offer.endDate).toLocaleDateString('pt-BR')}</span>
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <Button asChild>
                      <Link to={`/offer/${offer.id}`}>
                        Investir
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-slate-500 dark:text-slate-400">
                Esta empresa não tem ofertas ativas no momento
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Desempenho Financeiro</CardTitle>
          <CardDescription>
            Visão geral dos principais indicadores financeiros
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-5">
              <div className="mb-3 flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                </div>
                <h3 className="font-medium">Receita Anual</h3>
              </div>
              <p className="text-2xl font-bold">
                R$ {companyData.financials.revenue[companyData.financials.revenue.length - 1].toLocaleString()}
              </p>
              <p className="text-sm text-green-500 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{Math.round((companyData.financials.revenue[companyData.financials.revenue.length - 1] / companyData.financials.revenue[companyData.financials.revenue.length - 2] - 1) * 100)}% vs. ano anterior
              </p>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-5">
              <div className="mb-3 flex items-center">
                <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                  <DollarSign className="h-5 w-5 text-green-500" />
                </div>
                <h3 className="font-medium">Lucro Líquido</h3>
              </div>
              <p className="text-2xl font-bold">
                R$ {companyData.financials.profit[companyData.financials.profit.length - 1].toLocaleString()}
              </p>
              <p className="text-sm text-green-500 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                Margem de {Math.round((companyData.financials.profit[companyData.financials.profit.length - 1] / companyData.financials.revenue[companyData.financials.revenue.length - 1]) * 100)}%
              </p>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-5">
              <div className="mb-3 flex items-center">
                <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3">
                  <BarChart3 className="h-5 w-5 text-purple-500" />
                </div>
                <h3 className="font-medium">Valor por Ação</h3>
              </div>
              <p className="text-2xl font-bold">
                R$ 3.47
              </p>
              <p className="text-sm text-green-500 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +17.2% nos últimos 12 meses
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;
