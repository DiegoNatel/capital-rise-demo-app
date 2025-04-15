
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  Building,
  Briefcase,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Globe,
  User,
  Save,
  Lock,
  Info,
} from "lucide-react";
import { companies } from "@/data/companies";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Use the first company as example data (in a real app, this would be fetched based on the logged in user)
const companyData = { ...companies[0] };

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: companyData.name,
    industry: companyData.industry,
    description: companyData.description,
    foundedYear: companyData.foundedYear,
    location: companyData.location,
    employees: companyData.employees,
    valuation: companyData.valuation / 1000000, // Convert to millions for easier editing
    growth: companyData.growth,
    website: companyData.website,
    // Team members
    team: companyData.team.map(member => ({
      name: member.name,
      position: member.position,
    })),
    // Highlights
    highlights: companyData.highlights.join('\n'),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTeamMemberChange = (index: number, field: 'name' | 'position', value: string) => {
    setFormData(prev => {
      const updatedTeam = [...prev.team];
      updatedTeam[index] = {
        ...updatedTeam[index],
        [field]: value
      };
      return {
        ...prev,
        team: updatedTeam
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the data to your backend
    console.log("Saving company profile:", formData);
    
    // Show success message
    toast.success("Perfil da empresa atualizado com sucesso");
    
    // Navigate back to company portal
    navigate("/company");
  };

  // Helper component for locked fields
  const LockedFieldTooltip = ({ children, message }: { children: React.ReactNode, message: string }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center">
            {children}
            <Lock className="ml-2 h-4 w-4 text-slate-400" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs">{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <MainLayout>
      <div className="container py-8">
        <Button 
          variant="ghost" 
          className="flex items-center mb-6" 
          onClick={() => navigate("/company")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar ao Portal
        </Button>

        <div className="flex items-center mb-8">
          <div className="h-16 w-16 bg-white shadow rounded-xl flex items-center justify-center mr-4">
            <span className="text-xl font-bold text-brand-blue-500">{formData.name.substring(0, 2)}</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold">Editar Perfil da Empresa</h1>
            <p className="text-slate-500 dark:text-slate-400">
              Atualize as informações da sua empresa
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" /> 
                Informações Básicas
              </CardTitle>
              <CardDescription>
                Dados gerais da empresa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <LockedFieldTooltip message="O nome da empresa não pode ser alterado pois está associado a documentos legais e registros oficiais.">
                    <Label htmlFor="name">Nome da Empresa</Label>
                  </LockedFieldTooltip>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    readOnly
                    className="bg-slate-100"
                  />
                </div>
                
                <div className="space-y-2">
                  <LockedFieldTooltip message="O setor da empresa não pode ser alterado pois está associado a classificações regulatórias.">
                    <Label htmlFor="industry">Indústria / Setor</Label>
                  </LockedFieldTooltip>
                  <Input 
                    id="industry" 
                    name="industry" 
                    value={formData.industry} 
                    readOnly
                    className="bg-slate-100"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Localização</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input 
                      id="location" 
                      name="location" 
                      className="pl-10" 
                      value={formData.location} 
                      onChange={handleInputChange} 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <LockedFieldTooltip message="O ano de fundação não pode ser alterado pois é um dado verificado durante o processo de listagem.">
                    <Label htmlFor="foundedYear">Ano de Fundação</Label>
                  </LockedFieldTooltip>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input 
                      id="foundedYear" 
                      name="foundedYear" 
                      type="number" 
                      className="pl-10 bg-slate-100" 
                      value={formData.foundedYear} 
                      readOnly
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="employees">Número de Funcionários</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input 
                      id="employees" 
                      name="employees" 
                      type="number" 
                      className="pl-10" 
                      value={formData.employees} 
                      onChange={handleInputChange} 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input 
                      id="website" 
                      name="website" 
                      className="pl-10" 
                      value={formData.website} 
                      onChange={handleInputChange} 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <LockedFieldTooltip message="A valuation é calculada automaticamente com base na última rodada de financiamento.">
                    <Label htmlFor="valuation">Valuation (R$ milhões)</Label>
                  </LockedFieldTooltip>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input 
                      id="valuation" 
                      name="valuation" 
                      type="number" 
                      step="0.1" 
                      className="pl-10 bg-slate-100" 
                      value={formData.valuation} 
                      readOnly
                    />
                  </div>
                  <p className="text-xs text-slate-500 italic mt-1">
                    <Info className="inline h-3 w-3 mr-1" />
                    Valor calculado automaticamente com base na última rodada de financiamento
                  </p>
                </div>
                
                <div className="space-y-2">
                  <LockedFieldTooltip message="O crescimento anual é calculado automaticamente com base na variação de valuation entre rodadas de financiamento.">
                    <Label htmlFor="growth">Crescimento Anual (%)</Label>
                  </LockedFieldTooltip>
                  <div className="relative">
                    <TrendingUp className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input 
                      id="growth" 
                      name="growth" 
                      type="number" 
                      className="pl-10 bg-slate-100" 
                      value={formData.growth} 
                      readOnly
                    />
                  </div>
                  <p className="text-xs text-slate-500 italic mt-1">
                    <Info className="inline h-3 w-3 mr-1" />
                    Calculado automaticamente com base na variação de valuation entre rodadas
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Descrição da Empresa</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  rows={5} 
                  value={formData.description} 
                  onChange={handleInputChange} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="highlights">Destaques (um por linha)</Label>
                <Textarea 
                  id="highlights" 
                  name="highlights" 
                  rows={4} 
                  value={formData.highlights} 
                  onChange={handleInputChange} 
                  placeholder="Digite um destaque por linha"
                />
                <p className="text-sm text-slate-500">Adicione os principais destaques da sua empresa, um por linha.</p>
              </div>
            </CardContent>
          </Card>

          {/* Team Members */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" /> 
                Equipe de Liderança
              </CardTitle>
              <CardDescription>
                Integrantes chave da equipe
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {formData.team.map((member, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-slate-200 dark:border-slate-700 rounded-md">
                    <div className="space-y-2">
                      <Label htmlFor={`team-name-${index}`}>Nome</Label>
                      <Input 
                        id={`team-name-${index}`} 
                        value={member.name} 
                        onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`team-position-${index}`}>Cargo</Label>
                      <Input 
                        id={`team-position-${index}`} 
                        value={member.position} 
                        onChange={(e) => handleTeamMemberChange(index, 'position', e.target.value)} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate("/company")}
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex items-center">
              <Save className="mr-2 h-4 w-4" />
              Salvar Alterações
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default EditProfile;
