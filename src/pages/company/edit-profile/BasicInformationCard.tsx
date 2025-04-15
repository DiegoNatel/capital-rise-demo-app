
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Building,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Globe,
  Info,
} from "lucide-react";
import LockedFieldTooltip from "./LockedFieldTooltip";
import { EditProfileFormData } from "./types";

interface BasicInformationCardProps {
  formData: EditProfileFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const BasicInformationCard = ({ formData, handleInputChange }: BasicInformationCardProps) => {
  return (
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
  );
};

export default BasicInformationCard;

