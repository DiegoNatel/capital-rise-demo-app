
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DocumentFormFieldsProps {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  type: string;
  setType: (type: string) => void;
  category: string;
  setCategory: (category: string) => void;
  accessLevel: string;
  setAccessLevel: (accessLevel: string) => void;
}

const DocumentFormFields = ({
  title, setTitle,
  description, setDescription,
  type, setType,
  category, setCategory,
  accessLevel, setAccessLevel
}: DocumentFormFieldsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">Título do Documento</Label>
        <Input
          id="title"
          placeholder="Ex: Relatório Financeiro Q1 2024"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Input
          id="description"
          placeholder="Breve descrição do documento"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Tipo</Label>
          <Select value={type} onValueChange={setType} required>
            <SelectTrigger id="type">
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="financial">Financeiro</SelectItem>
              <SelectItem value="legal">Legal</SelectItem>
              <SelectItem value="presentations">Apresentação</SelectItem>
              <SelectItem value="reports">Relatório</SelectItem>
              <SelectItem value="other">Outro</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Categoria</Label>
          <Select value={category} onValueChange={setCategory} required>
            <SelectTrigger id="category">
              <SelectValue placeholder="Selecione a categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="annual">Anual</SelectItem>
              <SelectItem value="quarterly">Trimestral</SelectItem>
              <SelectItem value="monthly">Mensal</SelectItem>
              <SelectItem value="prospectus">Prospecto</SelectItem>
              <SelectItem value="legal">Documento Legal</SelectItem>
              <SelectItem value="presentation">Apresentação</SelectItem>
              <SelectItem value="other">Outro</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="accessLevel">Nível de Acesso</Label>
        <Select value={accessLevel} onValueChange={setAccessLevel} required>
          <SelectTrigger id="accessLevel">
            <SelectValue placeholder="Selecione o nível de acesso" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="public">Público - Todos os investidores</SelectItem>
            <SelectItem value="registered">Registrado - Investidores cadastrados</SelectItem>
            <SelectItem value="private">Privado - Somente investidores atuais</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default DocumentFormFields;
