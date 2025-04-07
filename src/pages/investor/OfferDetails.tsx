
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { 
  ArrowRight, 
  FileText, 
  Shield, 
  CheckCircle, 
  Download, 
  AlertCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import MainLayout from "@/components/layout/MainLayout";
import { offers } from "@/data/offers";

const OfferDetails = () => {
  const { id } = useParams();
  const [offer, setOffer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the offer from the data
    const foundOffer = offers.find(offer => offer.id === id);
    if (foundOffer) {
      setOffer(foundOffer);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <div className="container py-8">
          <p>Carregando detalhes da oferta...</p>
        </div>
      </MainLayout>
    );
  }

  if (!offer) {
    return (
      <MainLayout>
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-6">Oferta não encontrada</h1>
          <p className="text-slate-500">
            A oferta que você está procurando não foi encontrada.
          </p>
        </div>
      </MainLayout>
    );
  }

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Calculate progress percentage
  const progressPercentage = (offer.raisedAmount / offer.goalAmount) * 100;

  // Audit data (mock data)
  const auditData = {
    financialAudit: {
      status: "verified",
      date: "15/02/2025",
      auditor: "Deloitte Brasil",
      report: "#"
    },
    complianceCheck: {
      status: "verified",
      date: "20/02/2025",
      auditor: "PwC Compliance",
      report: "#"
    },
    legalVerification: {
      status: "verified",
      date: "25/02/2025",
      auditor: "Legal Partners Associados",
      report: "#"
    }
  };

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-2">{offer.title}</h1>
            <p className="text-slate-600 mb-6">{offer.description}</p>

            <Tabs defaultValue="details" className="mb-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Detalhes</TabsTrigger>
                <TabsTrigger value="documents">Documentos</TabsTrigger>
                <TabsTrigger value="updates">Atualizações</TabsTrigger>
                <TabsTrigger value="audit">Auditoria</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="mt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Destaques</h3>
                    <ul className="space-y-2">
                      {offer.highlights.map((highlight: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">Riscos</h3>
                    <ul className="space-y-2">
                      {offer.risks.map((risk: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="documents" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mb-4">Documentos da Oferta</h3>
                  {offer.documents.map((doc: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-slate-600 mr-3" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-slate-500">{doc.type}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="updates" className="mt-6">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold mb-4">Atualizações do Projeto</h3>
                  {offer.updates.length > 0 ? (
                    <div className="space-y-4">
                      {offer.updates.map((update: any, index: number) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold">{update.title}</h4>
                            <span className="text-sm text-slate-500">{update.date}</span>
                          </div>
                          <p>{update.content}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500">Nenhuma atualização disponível no momento.</p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="audit" className="mt-6">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold mb-4">Verificações e Auditorias</h3>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 text-green-500 mr-2" />
                        <CardTitle className="text-lg">Informações Verificadas</CardTitle>
                      </div>
                      <CardDescription>
                        Esta oferta passou por verificações independentes
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            <div>
                              <p className="font-medium">Auditoria Financeira</p>
                              <p className="text-sm text-slate-500">Verificado em {auditData.financialAudit.date} por {auditData.financialAudit.auditor}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Relatório
                          </Button>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            <div>
                              <p className="font-medium">Verificação de Compliance</p>
                              <p className="text-sm text-slate-500">Verificado em {auditData.complianceCheck.date} por {auditData.complianceCheck.auditor}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Relatório
                          </Button>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            <div>
                              <p className="font-medium">Verificação Legal</p>
                              <p className="text-sm text-slate-500">Verificado em {auditData.legalVerification.date} por {auditData.legalVerification.auditor}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Relatório
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div>
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-500">Captação</span>
                    <span className="text-sm font-medium">{Math.round(progressPercentage)}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full" 
                      style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Meta</span>
                    <span className="font-medium">{formatCurrency(offer.goalAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Captado</span>
                    <span className="font-medium">{formatCurrency(offer.raisedAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Investidores</span>
                    <span className="font-medium">{offer.investors}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Investimento mínimo</span>
                    <span className="font-medium">{formatCurrency(offer.minInvestment)}</span>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Token</span>
                    <span className="font-medium">{offer.tokenSymbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Preço</span>
                    <span className="font-medium">{formatCurrency(offer.tokenPrice)}</span>
                  </div>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      Investir Agora
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Investir em {offer.title}</DialogTitle>
                      <DialogDescription>
                        Preencha os detalhes do seu investimento nesta oferta.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Quantidade de tokens</label>
                        <input 
                          type="number"
                          className="w-full p-2 border rounded-md"
                          placeholder="Quantidade"
                          min="1"
                        />
                        <p className="text-sm text-slate-500">
                          Mínimo: {Math.ceil(offer.minInvestment / offer.tokenPrice)} tokens ({formatCurrency(offer.minInvestment)})
                        </p>
                      </div>
                      
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <div className="flex justify-between mb-2">
                          <span className="text-slate-500">Valor por token</span>
                          <span>{formatCurrency(offer.tokenPrice)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-slate-500">Quantidade</span>
                          <span>0 {offer.tokenSymbol}</span>
                        </div>
                        <div className="flex justify-between font-medium">
                          <span>Total</span>
                          <span>{formatCurrency(0)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button variant="outline" className="w-full sm:w-auto">Cancelar</Button>
                      <Button className="w-full sm:w-auto">Confirmar Investimento</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OfferDetails;
