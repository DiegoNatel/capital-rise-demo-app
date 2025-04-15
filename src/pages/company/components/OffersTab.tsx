
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FilePlus } from "lucide-react";
import { offersWithCompanyData } from "@/data/offers";

interface OffersTabProps {
  companyData: any;
}

const OffersTab = ({ companyData }: OffersTabProps) => {
  return (
    <div className="space-y-8 mt-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Todas as Ofertas</CardTitle>
            <CardDescription>
              Histórico completo de captações
            </CardDescription>
          </div>
          <Button asChild>
            <Link to="/company/create-offer">
              <FilePlus className="mr-2 h-4 w-4" />
              Nova Oferta
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {offersWithCompanyData
              .filter(offer => offer.companyId === companyData.id)
              .map((offer) => (
                <div key={offer.id} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-lg">{offer.title}</h3>
                    <div className={`px-2 py-1 text-xs rounded-full ${
                      offer.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' :
                      offer.status === 'completed' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400' :
                      offer.status === 'upcoming' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400' :
                      'bg-slate-100 text-slate-700 dark:bg-slate-900/40 dark:text-slate-400'
                    }`}>
                      {offer.status === 'active' ? 'Ativa' :
                       offer.status === 'completed' ? 'Concluída' :
                       offer.status === 'upcoming' ? 'Em breve' :
                       'Cancelada'}
                    </div>
                  </div>
                  
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
                      <p className="text-xs text-slate-500 dark:text-slate-400">Período</p>
                      <p className="font-medium">
                        {new Date(offer.startDate).toLocaleDateString('pt-BR')} - {new Date(offer.endDate).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  
                  {offer.status !== 'upcoming' && (
                    <>
                      <div className="mb-1 flex justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span>Progresso:</span>
                        <span>{Math.round((offer.raisedAmount / offer.goalAmount) * 100)}%</span>
                      </div>
                      <Progress 
                        value={Math.round((offer.raisedAmount / offer.goalAmount) * 100)} 
                        className="h-2 mb-4"
                      />
                    </>
                  )}
                  
                  <div className="flex justify-end mt-2">
                    <Button variant="outline" size="sm">
                      {offer.status === 'active' ? 'Gerenciar' : 'Ver Detalhes'}
                    </Button>
                  </div>
                </div>
              ))
            }
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OffersTab;
