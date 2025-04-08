import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Company } from "@/data/companies";

export interface OfferWithCompany {
  id: string;
  companyId: string;
  title: string;
  description: string;
  goalAmount: number;
  raisedAmount: number;
  minInvestment: number;
  tokenSymbol: string;
  tokenPrice: number;
  totalTokens: number;
  soldTokens: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'upcoming' | 'cancelled';
  category: string;
  highlights: string[];
  documents: {
    name: string;
    type: string;
    url: string;
  }[];
  risks: string[];
  updates: {
    date: string;
    title: string;
    content: string;
  }[];
  investors: number;
  company: Company | null;
}

interface OfferCardProps {
  offer: OfferWithCompany;
}

const OfferCard = ({ offer }: OfferCardProps) => {
  return (
    <Card key={offer.id} className="overflow-hidden">
      <div className="bg-slate-50 dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center mb-2">
          <div className="h-10 w-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center mr-3 border border-slate-200 dark:border-slate-600">
            <span className="font-bold">{offer.company?.name.substring(0, 2)}</span>
          </div>
          <div className="overflow-hidden">
            <h3 className="font-medium text-lg truncate">{offer.company?.name}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{offer.company?.industry}</p>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h4 className="font-medium truncate">{offer.title}</h4>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 line-clamp-2">
          {offer.description}
        </p>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Meta</p>
            <p className="font-medium">R$ {offer.goalAmount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Captado</p>
            <p className="font-medium">R$ {offer.raisedAmount.toLocaleString()}</p>
          </div>
        </div>
        
        {offer.status !== 'upcoming' && (
          <>
            <div className="mt-4 mb-1 flex justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Progresso:</span>
              <span>{Math.round((offer.raisedAmount / offer.goalAmount) * 100)}%</span>
            </div>
            <Progress 
              value={Math.round((offer.raisedAmount / offer.goalAmount) * 100)} 
              className="h-2"
            />
          </>
        )}
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Token</p>
            <p className="font-medium">{offer.tokenSymbol} (R$ {offer.tokenPrice.toFixed(2)})</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Mín. Investimento</p>
            <p className="font-medium">R$ {offer.minInvestment.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
          {offer.status === 'active' && (
            <div className="flex justify-between items-center">
              <span>Encerra em:</span>
              <span>{Math.ceil((new Date(offer.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} dias</span>
            </div>
          )}
          {offer.status === 'upcoming' && (
            <div className="flex justify-between items-center">
              <span>Inicia em:</span>
              <span>{Math.ceil((new Date(offer.startDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} dias</span>
            </div>
          )}
          {offer.status === 'completed' && (
            <div className="flex justify-between items-center">
              <span>Concluída em:</span>
              <span>{new Date(offer.endDate).toLocaleDateString('pt-BR')}</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" asChild>
          <Link to={`/offer/${offer.id}`}>
            {offer.status === 'active' ? (
              <>
                Investir
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Ver Detalhes
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OfferCard;
