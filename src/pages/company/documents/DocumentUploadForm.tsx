
import { useState } from "react";
import { FileSpreadsheet, FileText, FilePlus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { InvestorDocument } from "@/types/documents";

interface DocumentUploadFormProps {
  onDocumentUploaded: (document: InvestorDocument) => void;
}

const DocumentUploadForm = ({ onDocumentUploaded }: DocumentUploadFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [accessLevel, setAccessLevel] = useState("public");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !type || !category || !file) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setIsUploading(true);
    
    // In a real application, this would upload the file to a server/storage
    // For demo purposes, we'll simulate the upload
    setTimeout(() => {
      const newDocument: InvestorDocument = {
        id: `doc-${Date.now()}`,
        title,
        description,
        company: "TechVision Brasil", // This would come from the current company
        type,
        category,
        publishedAt: new Date().toISOString(),
        version: "1.0",
        url: "#", // In a real app, this would be the URL to the uploaded file
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        accessLevel
      };
      
      onDocumentUploaded(newDocument);
      
      // Reset form
      setTitle("");
      setDescription("");
      setType("");
      setCategory("");
      setAccessLevel("public");
      setFile(null);
      setIsUploading(false);
      
      toast.success("Documento enviado com sucesso!");
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FilePlus className="mr-2 h-5 w-5" />
          Adicionar Novo Documento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          
          <div className="space-y-2">
            <Label htmlFor="file">Arquivo</Label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6">
              <div className="flex flex-col items-center justify-center text-center">
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm font-medium mb-1">
                  {file ? file.name : "Arraste e solte ou clique para selecionar"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Suporta PDF, DOC, XLS, PPT (max 50MB)
                </p>
                <div className="relative">
                  <Button type="button" variant="outline" size="sm" className="relative">
                    Selecionar Arquivo
                    <input
                      id="file"
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                      onChange={handleFileChange}
                      required
                    />
                  </Button>
                </div>
                {file && (
                  <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                    {file.name} ({(file.size / (1024 * 1024)).toFixed(2)}MB)
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button
              type="submit"
              className="flex items-center"
              disabled={isUploading}
            >
              {isUploading ? (
                <>Enviando...</>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Enviar Documento
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DocumentUploadForm;
