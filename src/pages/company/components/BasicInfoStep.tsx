
import React from "react";
import { Calendar, DollarSign } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BasicInfoStepProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

const BasicInfoStep = ({ formData, handleInputChange, handleSelectChange }: BasicInfoStepProps) => {
  return (
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
  );
};

export default BasicInfoStep;
