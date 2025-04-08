
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import StepIndicator from "./components/StepIndicator";
import BasicInfoStep from "./components/BasicInfoStep";
import TokenizationStep from "./components/TokenizationStep";
import DocumentsStep from "./components/DocumentsStep";
import BinanceStep from "./components/BinanceStep";
import TermsStep from "./components/TermsStep";
import ReviewStep from "./components/ReviewStep";
import { binanceRequirements } from "./data/binanceRequirements";

// Steps in the offer creation process
const steps = [
  { id: "basics", label: "Informações Básicas" },
  { id: "tokenization", label: "Tokenização" },
  { id: "documents", label: "Documentos" },
  { id: "binance", label: "Binance" },
  { id: "terms", label: "Termos" },
  { id: "review", label: "Revisão" },
];

const CreateOffer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    goalAmount: "",
    minInvestment: "",
    startDate: "",
    endDate: "",
    tokenName: "",
    tokenSymbol: "",
    tokenPrice: "",
    totalTokens: "",
    documentsPitch: null,
    documentsFinancial: null,
    documentsLegal: null,
    termsRightToDividends: false,
    termsVotingRights: false,
    termsLockupPeriod: "6",
    // Binance integration fields
    listOnBinance: false,
    binanceRequirements: binanceRequirements.reduce((acc, req) => {
      acc[req.id] = false;
      return acc;
    }, {} as Record<string, boolean>),
    binanceTokenType: "",
    binanceComplianceContact: "",
    binanceSmartContractAudit: null,
    binanceWhitePaper: null,
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Calculate total tokens if price and goal amount are set
    if ((name === "goalAmount" || name === "tokenPrice") && formData.tokenPrice && formData.goalAmount) {
      const goal = name === "goalAmount" ? parseFloat(value) : parseFloat(formData.goalAmount);
      const price = name === "tokenPrice" ? parseFloat(value) : parseFloat(formData.tokenPrice);
      
      if (goal && price) {
        setFormData((prev) => ({ 
          ...prev, 
          totalTokens: Math.round(goal / price).toString()
        }));
      }
    }
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleBinanceRequirementChange = (requirementId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      binanceRequirements: {
        ...prev.binanceRequirements,
        [requirementId]: checked
      }
    }));
  };
  
  const handleNextStep = () => {
    // Validate Binance requirements if moving from the Binance step
    if (currentStep === 3 && formData.listOnBinance) {
      const requiredRequirements = binanceRequirements.filter(req => req.required);
      const allRequiredMet = requiredRequirements.every(req => formData.binanceRequirements[req.id]);
      
      if (!allRequiredMet) {
        toast({
          title: "Requisitos da Binance não atendidos",
          description: "Você precisa atender a todos os requisitos obrigatórios da Binance para continuar.",
          variant: "destructive"
        });
        return;
      }
    }
    
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };
  
  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Oferta criada com sucesso!",
      description: "Sua oferta foi enviada para revisão e será publicada em breve.",
    });
    
    setTimeout(() => {
      navigate("/company");
    }, 2000);
  };
  
  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Criar Nova Oferta</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Configure os detalhes da sua captação de recursos
            </p>
          </div>
        </div>
        
        {/* Steps indicator */}
        <StepIndicator steps={steps} currentStep={currentStep} />
        
        {/* Form Content */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>{steps[currentStep].label}</CardTitle>
            <CardDescription>
              {currentStep === 0 && "Informe os detalhes básicos da sua oferta"}
              {currentStep === 1 && "Configure as características dos tokens"}
              {currentStep === 2 && "Faça upload dos documentos necessários"}
              {currentStep === 3 && "Configure a integração com a Binance"}
              {currentStep === 4 && "Defina os termos e condições para os investidores"}
              {currentStep === 5 && "Revise todos os dados antes de criar a oferta"}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={currentStep === steps.length - 1 ? handleSubmit : (e) => { e.preventDefault(); handleNextStep(); }}>
              {/* Step 1: Basic Information */}
              {currentStep === 0 && (
                <BasicInfoStep 
                  formData={formData} 
                  handleInputChange={handleInputChange} 
                  handleSelectChange={handleSelectChange} 
                />
              )}
              
              {/* Step 2: Tokenization */}
              {currentStep === 1 && (
                <TokenizationStep 
                  formData={formData} 
                  handleInputChange={handleInputChange} 
                />
              )}
              
              {/* Step 3: Documents */}
              {currentStep === 2 && (
                <DocumentsStep 
                  formData={formData} 
                  setFormData={setFormData} 
                />
              )}

              {/* Step 4: Binance Integration */}
              {currentStep === 3 && (
                <BinanceStep 
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleCheckboxChange={handleCheckboxChange}
                  handleBinanceRequirementChange={handleBinanceRequirementChange}
                  handleSelectChange={handleSelectChange}
                  setFormData={setFormData}
                  binanceRequirements={binanceRequirements}
                />
              )}
              
              {/* Step 5: Terms */}
              {currentStep === 4 && (
                <TermsStep 
                  formData={formData}
                  handleCheckboxChange={handleCheckboxChange}
                  handleSelectChange={handleSelectChange}
                />
              )}
              
              {/* Step 6: Review */}
              {currentStep === 5 && (
                <ReviewStep 
                  formData={formData}
                  binanceRequirements={binanceRequirements}
                />
              )}
              
              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handlePrevStep}
                  disabled={currentStep === 0}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Anterior
                </Button>
                
                <Button type={currentStep === steps.length - 1 ? "submit" : "button"}>
                  {currentStep === steps.length - 1 ? (
                    "Criar Oferta"
                  ) : (
                    <>
                      Próximo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default CreateOffer;
