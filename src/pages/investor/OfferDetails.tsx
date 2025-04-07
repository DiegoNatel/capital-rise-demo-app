
// Create a placeholder OfferDetails component to fix build errors
// This is a minimal implementation to resolve the build error
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/MainLayout";

const OfferDetails = () => {
  return (
    <MainLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Detalhes da Oferta</h1>
        <p className="text-slate-500 mb-8">
          Informações sobre esta oportunidade de investimento
        </p>
        
        <div className="flex justify-end">
          <Button>
            Investir Agora
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default OfferDetails;
