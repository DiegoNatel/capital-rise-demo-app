import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  AlertTriangle,
  ArrowLeft, 
  ArrowRight, 
  Calculator, 
  Calendar, 
  CheckCircle, 
  DollarSign, 
  FileText, 
  PieChart, 
  Upload,
  CurrencyBitcoin,
  Shield
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Steps in the offer creation process
const steps = [
  { id: "basics", label: "Informações Básicas" },
  { id: "tokenization", label: "Tokenização" },
  { id: "documents", label: "Documentos" },
  { id: "binance", label: "Binance" },
  { id: "terms", label: "Termos" },
  { id: "review", label: "Revisão" },
];

// Binance requirements checklist items
const binanceRequirements = [
  { 
    id: "project_quality", 
    label: "Qualidade do Projeto", 
    description: "Avaliação técnica, equipe, e utilidade do token",
    required: true
  },
  { 
    id: "legal_compliance", 
    label: "Conformidade Legal", 
    description: "Verificação de que o token não é um security não registrado",
    required: true
  },
  { 
    id: "liquidity", 
    label: "Liquidez e Volume de Negociação", 
    description: "Demonstração de interesse e atividade no mercado",
    required: true
  },
  { 
    id: "security_audit", 
    label: "Segurança", 
    description: "Auditoria de smart contracts e avaliação de riscos",
    required: true
  },
  { 
    id: "white_paper", 
    label: "White Paper", 
    description: "Documento detalhado explicando o projeto, tecnologia e tokenomics",
    required: true
  },
  { 
    id: "community", 
    label: "Comunidade Ativa", 
    description: "Base de usuários engajada e presente em redes sociais",
    required: false
  },
  { 
    id: "market_maker", 
    label: "Market Maker", 
    description: "Parceria com um market maker para garantir liquidez",
    required: false
  },
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
    // New fields for Binance integration
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

  // Calculate the number of Binance requirements met
  const binanceRequirementsMet = Object.values(formData.binanceRequirements).filter(Boolean).length;
  const totalBinanceRequirements = binanceRequirements.length;
  const requiredBinanceRequirementsMet = binanceRequirements
    .filter(req => req.required)
    .filter(req => formData.binanceRequirements[req.id])
    .length;
  const totalRequiredBinanceRequirements = binanceRequirements.filter(req => req.required).length;
  
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
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                  ${index < currentStep ? 'bg-green-500 text-white' : 
                    index === currentStep ? 'bg-brand-blue-500 text-white' : 
                    'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
                  {index < currentStep ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span className={`text-xs mt-2 hidden md:block 
                  ${index === currentStep ? 'text-brand-blue-500 font-medium' : 
                    'text-slate-500 dark:text-slate-400'}`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
          <div className="relative mt-2">
            <div className="absolute top-0 h-1 bg-slate-200 dark:bg-slate-700 w-full rounded-full" />
            <div 
              className="absolute top-0 h-1 bg-brand-blue-500 rounded-full" 
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>
        
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
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="title">Título da Oferta</Label>
                    <Input 
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Ex: Rodada Seed, Series A, etc."
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea 
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Descreva o objetivo da captação e como os recursos serão utilizados"
                      className="mt-1"
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Categoria</Label>
                    <Select 
                      name="category" 
                      value={formData.category} 
                      onValueChange={(value) => handleSelectChange("category", value)}
                    >
                      <SelectTrigger id="category" className="mt-1">
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tech">Tecnologia</SelectItem>
                        <SelectItem value="health">Saúde</SelectItem>
                        <SelectItem value="finance">Finanças</SelectItem>
                        <SelectItem value="energy">Energia</SelectItem>
                        <SelectItem value="education">Educação</SelectItem>
                        <SelectItem value="retail">Varejo</SelectItem>
                        <SelectItem value="real-estate">Imobiliário</SelectItem>
                        <SelectItem value="agribusiness">Agronegócio</SelectItem>
                        <SelectItem value="logistics">Logística</SelectItem>
                        <SelectItem value="other">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="goalAmount">
                        <span className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          Valor Total da Captação (R$)
                        </span>
                      </Label>
                      <Input 
                        id="goalAmount"
                        name="goalAmount"
                        value={formData.goalAmount}
                        onChange={handleInputChange}
                        placeholder="5000000"
                        className="mt-1"
                        type="number"
                        min="100000"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="minInvestment">
                        <span className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          Investimento Mínimo (R$)
                        </span>
                      </Label>
                      <Input 
                        id="minInvestment"
                        name="minInvestment"
                        value={formData.minInvestment}
                        onChange={handleInputChange}
                        placeholder="5000"
                        className="mt-1"
                        type="number"
                        min="100"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="startDate">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Data de Início
                        </span>
                      </Label>
                      <Input 
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className="mt-1"
                        type="date"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="endDate">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Data de Encerramento
                        </span>
                      </Label>
                      <Input 
                        id="endDate"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        className="mt-1"
                        type="date"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 2: Tokenization */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="tokenName">Nome do Token</Label>
                    <Input 
                      id="tokenName"
                      name="tokenName"
                      value={formData.tokenName}
                      onChange={handleInputChange}
                      placeholder="Ex: GreenTech Solutions Token"
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="tokenSymbol">Símbolo do Token</Label>
                    <Input 
                      id="tokenSymbol"
                      name="tokenSymbol"
                      value={formData.tokenSymbol}
                      onChange={handleInputChange}
                      placeholder="Ex: GTS"
                      className="mt-1"
                      maxLength={5}
                      required
                    />
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Use 3-5 caracteres maiúsculos para o símbolo do token
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="tokenPrice">
                        <span className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          Preço por Token (R$)
                        </span>
                      </Label>
                      <Input 
                        id="tokenPrice"
                        name="tokenPrice"
                        value={formData.tokenPrice}
                        onChange={handleInputChange}
                        placeholder="5.00"
                        className="mt-1"
                        type="number"
                        step="0.01"
                        min="0.01"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="totalTokens">
                        <span className="flex items-center">
                          <Calculator className="h-4 w-4 mr-1" />
                          Quantidade Total de Tokens
                        </span>
                      </Label>
                      <Input 
                        id="totalTokens"
                        name="totalTokens"
                        value={formData.totalTokens}
                        readOnly
                        className="mt-1 bg-slate-50 dark:bg-slate-800"
                      />
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Calculado automaticamente (Valor da Captação ÷ Preço por Token)
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                    <h4 className="font-medium flex items-center text-blue-800 dark:text-blue-300 mb-2">
                      <PieChart className="h-5 w-5 mr-2" />
                      Resumo da Tokenização
                    </h4>
                    {formData.goalAmount && formData.tokenPrice ? (
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="text-slate-600 dark:text-slate-300">Valor da Captação:</span>{" "}
                          <span className="font-medium">R$ {parseFloat(formData.goalAmount).toLocaleString()}</span>
                        </p>
                        <p>
                          <span className="text-slate-600 dark:text-slate-300">Preço por Token:</span>{" "}
                          <span className="font-medium">R$ {parseFloat(formData.tokenPrice).toFixed(2)}</span>
                        </p>
                        <p>
                          <span className="text-slate-600 dark:text-slate-300">Quantidade de Tokens:</span>{" "}
                          <span className="font-medium">{formData.totalTokens ? parseInt(formData.totalTokens).toLocaleString() : "-"}</span>
                        </p>
                        <p>
                          <span className="text-slate-600 dark:text-slate-300">Investimento Mínimo:</span>{" "}
                          <span className="font-medium">
                            {formData.minInvestment ? 
                              `R$ ${parseFloat(formData.minInvestment).toLocaleString()} (${Math.round(parseFloat(formData.minInvestment) / parseFloat(formData.tokenPrice))} tokens)` : 
                              "-"
                            }
                          </span>
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Preencha o valor da captação e o preço por token para visualizar o resumo da tokenização.
                      </p>
                    )}
                  </div>
                </div>
              )}
              
              {/* Step 3: Documents */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="border border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6">
                    <div className="flex flex-col items-center justify-center text-center">
                      <Upload className="h-10 w-10 text-slate-400 mb-4" />
                      <h3 className="font-medium text-lg mb-1">Pitch Deck / Apresentação</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                        Faça upload da apresentação com informações da empresa e da oportunidade
                      </p>
                      <Button type="button" variant="outline" className="relative">
                        <span>Selecionar Arquivo</span>
                        <input 
                          type="file" 
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                          onChange={(e) => setFormData(prev => ({ ...prev, documentsPitch: e.target.files?.[0] || null }))}
                        />
                      </Button>
                      
                      {formData.documentsPitch && (
                        <div className="mt-4 text-sm">
                          <p className="flex items-center text-green-600 dark:text-green-400">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            {formData.documentsPitch.name}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6">
                      <div className="flex flex-col items-center justify-center text-center">
                        <FileText className="h-8 w-8 text-slate-400 mb-4" />
                        <h3 className="font-medium mb-1">Demonstrações Financeiras</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                          Balanço patrimonial, DRE, projeções
                        </p>
                        <Button type="button" variant="outline" size="sm" className="relative">
                          <span>Selecionar Arquivo</span>
                          <input 
                            type="file" 
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                            onChange={(e) => setFormData(prev => ({ ...prev, documentsFinancial: e.target.files?.[0] || null }))}
                          />
                        </Button>
                        
                        {formData.documentsFinancial && (
                          <div className="mt-4 text-sm">
                            <p className="flex items-center text-green-600 dark:text-green-400">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              {formData.documentsFinancial.name}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="border border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6">
                      <div className="flex flex-col items-center justify-center text-center">
                        <FileText className="h-8 w-8 text-slate-400 mb-4" />
                        <h3 className="font-medium mb-1">Documentos Legais</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                          Contrato social, certidões, autorizações
                        </p>
                        <Button type="button" variant="outline" size="sm" className="relative">
                          <span>Selecionar Arquivo</span>
                          <input 
                            type="file" 
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                            onChange={(e) => setFormData(prev => ({ ...prev, documentsLegal: e.target.files?.[0] || null }))}
                          />
                        </Button>
                        
                        {formData.documentsLegal && (
                          <div className="mt-4 text-sm">
                            <p className="flex items-center text-green-600 dark:text-green-400">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              {formData.documentsLegal.name}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800">
                    <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-2">
                      Importante
                    </h4>
                    <p className="text-sm text-amber-700 dark:text-amber-400">
                      Todos os documentos serão verificados pela equipe de compliance antes da publicação da oferta.
                      Certifique-se de que as informações estão completas e precisas.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 4: Binance Integration */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800 mb-6">
                    <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-2 flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      Integração com Binance
                    </h4>
                    <p className="text-sm text-amber-700 dark:text-amber-400">
                      Listar seu token na Binance requer atender a requisitos específicos e passar por um processo de aprovação.
                      A Binance tem critérios rigorosos para listar novos tokens.
                    </p>
                  </div>

                  <div className="flex items-start mb-6">
                    <input 
                      type="checkbox" 
                      id="listOnBinance" 
                      className="h-4 w-4 mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
                      checked={formData.listOnBinance}
                      onChange={(e) => handleCheckboxChange("listOnBinance", e.target.checked)}
                    />
                    <div className="ml-3">
                      <Label htmlFor="listOnBinance" className="text-lg font-medium flex items-center">
                        <CurrencyBitcoin className="h-5 w-5 mr-2 text-amber-500" />
                        Desejo listar meu token na Binance
                      </Label>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Ao marcar esta opção, você indica interesse em listar seu token na Binance e deve atender aos requisitos abaixo.
                      </p>
                    </div>
                  </div>

                  {formData.listOnBinance && (
                    <>
                      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 mb-6">
                        <h3 className="font-medium text-lg mb-4 flex items-center">
                          <Shield className="h-5 w-5 mr-2 text-blue-500" />
                          Requisitos da Binance
                        </h3>
                        
                        <div className="space-y-4 mb-4">
                          {binanceRequirements.map((requirement) => (
                            <div key={requirement.id} className="flex items-start">
                              <input 
                                type="checkbox" 
                                id={requirement.id} 
                                className="h-4 w-4 mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
                                checked={formData.binanceRequirements[requirement.id] || false}
                                onChange={(e) => handleBinanceRequirementChange(requirement.id, e.target.checked)}
                              />
                              <div className="ml-3">
                                <Label htmlFor={requirement.id} className="font-medium flex items-center">
                                  {requirement.label}
                                  {requirement.required && (
                                    <span className="ml-1 text-red-500">*</span>
                                  )}
                                </Label>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                  {requirement.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-sm font-medium">Progresso dos Requisitos</p>
                            <p className="text-sm font-medium">
                              {requiredBinanceRequirementsMet}/{totalRequiredBinanceRequirements} obrigatórios • 
                              {binanceRequirementsMet}/{totalBinanceRequirements} total
                            </p>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2.5">
                            <div className="bg-blue-500 h-2.5 rounded-full" 
                              style={{ width: `${(binanceRequirementsMet / totalBinanceRequirements) * 100}%` }}></div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="binanceTokenType">
                            Tipo de Token
                          </Label>
                          <Select 
                            name="binanceTokenType" 
                            value={formData.binanceTokenType} 
                            onValueChange={(value) => handleSelectChange("binanceTokenType", value)}
                          >
                            <SelectTrigger id="binanceTokenType" className="mt-1">
                              <SelectValue placeholder="Selecione o tipo de token" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="BEP20">BEP-20 (Binance Smart Chain)</SelectItem>
                              <SelectItem value="BEP2">BEP-2 (Binance Chain)</SelectItem>
                              <SelectItem value="BEP8">BEP-8 (Binance Chain Mini-Tokens)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="binanceComplianceContact">
                            Contato do Responsável por Compliance
                          </Label>
                          <Input 
                            id="binanceComplianceContact"
                            name="binanceComplianceContact"
                            value={formData.binanceComplianceContact}
                            onChange={handleInputChange}
                            placeholder="nome@empresa.com"
                            className="mt-1"
                            type="email"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div className="border border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-4">
                          <div className="flex flex-col items-center justify-center text-center">
                            <FileText className="h-8 w-8 text-slate-400 mb-4" />
                            <h3 className="font-medium mb-1">White Paper</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                              Documento detalhado sobre o projeto, tokenomics e utilidade
                            </p>
                            <Button type="button" variant="outline" size="sm" className="relative">
                              <span>Selecionar Arquivo</span>
                              <input 
                                type="file" 
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                                onChange={(e) => setFormData(prev => ({ ...prev, binanceWhitePaper: e.target.files?.[0] || null }))}
                              />
                            </Button>
                            
                            {formData.binanceWhitePaper && (
                              <div className="mt-4 text-sm">
                                <p className="flex items-center text-green-600 dark:text-green-400">
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  {formData.binanceWhitePaper.name}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="border border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-4">
                          <div className="flex flex-col items-center justify-center text-center">
                            <Shield className="h-8 w-8 text-slate-400 mb-4" />
                            <h3 className="font-medium mb-1">Auditoria de Smart Contract</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                              Relatório de auditoria de segurança do contrato
                            </p>
                            <Button type="button" variant="outline" size="sm" className="relative">
                              <span>Selecionar Arquivo</span>
                              <input 
                                type="file" 
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                                onChange={(e) => setFormData(prev => ({ ...prev, binanceSmartContractAudit: e.target.files?.[0] || null }))}
                              />
                            </Button>
                            
                            {formData.binanceSmartContractAudit && (
                              <div className="mt-4 text-sm">
                                <p className="flex items-center text-green-600 dark:text-green-400">
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  {formData.binanceSmartContractAudit.name}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
              
              {/* Step 5: Terms */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="bg-white dark:bg-slate-800 border border-slate-20
