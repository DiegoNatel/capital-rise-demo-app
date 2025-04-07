
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
  ArrowLeft, 
  ArrowRight, 
  Calculator, 
  Calendar, 
  CheckCircle, 
  DollarSign, 
  FileText, 
  PieChart, 
  Upload 
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Steps in the offer creation process
const steps = [
  { id: "basics", label: "Informações Básicas" },
  { id: "tokenization", label: "Tokenização" },
  { id: "documents", label: "Documentos" },
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
  
  const handleNextStep = () => {
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
              {currentStep === 3 && "Defina os termos e condições para os investidores"}
              {currentStep === 4 && "Revise todos os dados antes de criar a oferta"}
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
              
              {/* Step 4: Terms */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                    <h3 className="font-medium text-lg mb-4">Direitos dos Tokenholders</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <input 
                          type="checkbox" 
                          id="rightToDividends" 
                          className="h-4 w-4 mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
                          checked={formData.termsRightToDividends}
                          onChange={(e) => setFormData(prev => ({ ...prev, termsRightToDividends: e.target.checked }))}
                        />
                        <div className="ml-3">
                          <Label htmlFor="rightToDividends" className="font-medium">Direito a Dividendos</Label>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Os tokenholders terão direito a receber dividendos proporcionais à sua participação.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <input 
                          type="checkbox" 
                          id="votingRights" 
                          className="h-4 w-4 mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
                          checked={formData.termsVotingRights}
                          onChange={(e) => setFormData(prev => ({ ...prev, termsVotingRights: e.target.checked }))}
                        />
                        <div className="ml-3">
                          <Label htmlFor="votingRights" className="font-medium">Direito a Voto</Label>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Os tokenholders terão direito a voto em decisões importantes da empresa, proporcionalmente à sua participação.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                    <h3 className="font-medium text-lg mb-4">Restrições e Condições</h3>
                    
                    <div>
                      <Label htmlFor="lockupPeriod">Período de Lockup</Label>
                      <Select 
                        name="lockupPeriod" 
                        value={formData.termsLockupPeriod} 
                        onValueChange={(value) => handleSelectChange("termsLockupPeriod", value)}
                      >
                        <SelectTrigger id="lockupPeriod" className="mt-1">
                          <SelectValue placeholder="Selecione o período de lockup" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 meses</SelectItem>
                          <SelectItem value="6">6 meses</SelectItem>
                          <SelectItem value="12">12 meses</SelectItem>
                          <SelectItem value="18">18 meses</SelectItem>
                          <SelectItem value="24">24 meses</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Período durante o qual os tokens não poderão ser vendidos após a conclusão da oferta.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                    <h3 className="font-medium text-lg mb-4">Taxas e Custos</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Taxa de Listagem</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Taxa única para criar a oferta na plataforma.
                          </p>
                        </div>
                        <span className="font-medium">R$ 5.000,00</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Taxa de Sucesso</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Percentual cobrado sobre o valor captado.
                          </p>
                        </div>
                        <span className="font-medium">3%</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Custo de Tokenização</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Custos de emissão e distribuição dos tokens.
                          </p>
                        </div>
                        <span className="font-medium">R$ 10.000,00</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 5: Review */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-700">
                      <h3 className="font-medium">Informações Básicas</h3>
                    </div>
                    <div className="p-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Título</p>
                          <p className="font-medium">{formData.title || "Não informado"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Categoria</p>
                          <p className="font-medium">{formData.category || "Não informada"}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Descrição</p>
                        <p className="font-medium">{formData.description || "Não informada"}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Valor da Captação</p>
                          <p className="font-medium">
                            {formData.goalAmount ? `R$ ${parseFloat(formData.goalAmount).toLocaleString()}` : "Não informado"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Investimento Mínimo</p>
                          <p className="font-medium">
                            {formData.minInvestment ? `R$ ${parseFloat(formData.minInvestment).toLocaleString()}` : "Não informado"}
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Data de Início</p>
                          <p className="font-medium">
                            {formData.startDate ? new Date(formData.startDate).toLocaleDateString('pt-BR') : "Não informada"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Data de Encerramento</p>
                          <p className="font-medium">
                            {formData.endDate ? new Date(formData.endDate).toLocaleDateString('pt-BR') : "Não informada"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-700">
                      <h3 className="font-medium">Tokenização</h3>
                    </div>
                    <div className="p-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Nome do Token</p>
                          <p className="font-medium">{formData.tokenName || "Não informado"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Símbolo</p>
                          <p className="font-medium">{formData.tokenSymbol || "Não informado"}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Preço por Token</p>
                          <p className="font-medium">
                            {formData.tokenPrice ? `R$ ${parseFloat(formData.tokenPrice).toFixed(2)}` : "Não informado"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Quantidade Total</p>
                          <p className="font-medium">
                            {formData.totalTokens ? parseInt(formData.totalTokens).toLocaleString() : "Não informada"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-700">
                      <h3 className="font-medium">Documentos</h3>
                    </div>
                    <div className="p-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Pitch Deck</p>
                          <p className="font-medium">
                            {formData.documentsPitch ? 
                              <span className="flex items-center text-green-600 dark:text-green-400">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Carregado
                              </span> : 
                              "Não carregado"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Demonstrações Financeiras</p>
                          <p className="font-medium">
                            {formData.documentsFinancial ? 
                              <span className="flex items-center text-green-600 dark:text-green-400">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Carregado
                              </span> : 
                              "Não carregado"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Documentos Legais</p>
                          <p className="font-medium">
                            {formData.documentsLegal ? 
                              <span className="flex items-center text-green-600 dark:text-green-400">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Carregado
                              </span> : 
                              "Não carregado"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-700">
                      <h3 className="font-medium">Termos e Condições</h3>
                    </div>
                    <div className="p-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Direito a Dividendos</p>
                          <p className="font-medium">
                            {formData.termsRightToDividends ? "Sim" : "Não"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Direito a Voto</p>
                          <p className="font-medium">
                            {formData.termsVotingRights ? "Sim" : "Não"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Período de Lockup</p>
                          <p className="font-medium">
                            {formData.termsLockupPeriod} meses
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-800">
                    <input 
                      type="checkbox" 
                      id="confirmTerms" 
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mr-3" 
                      required
                    />
                    <Label htmlFor="confirmTerms" className="text-sm text-amber-700 dark:text-amber-400">
                      Confirmo que as informações fornecidas são precisas e que estou autorizado a criar esta oferta em nome da empresa.
                    </Label>
                  </div>
                </div>
              )}
              
              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6">
                {currentStep > 0 ? (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handlePrevStep}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar
                  </Button>
                ) : (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate('/company')}
                  >
                    Cancelar
                  </Button>
                )}
                
                {currentStep < steps.length - 1 ? (
                  <Button type="submit">
                    Próximo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" className="bg-gradient-to-r from-brand-blue-500 to-brand-green-500 text-white">
                    Criar Oferta
                    <CheckCircle className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default CreateOffer;
