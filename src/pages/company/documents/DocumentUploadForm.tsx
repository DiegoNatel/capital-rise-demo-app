
import { useState } from "react";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { InvestorDocument } from "@/types/documents";
import FileUploadField from "./components/FileUploadField";
import DocumentFormFields from "./components/DocumentFormFields";

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
          <FileText className="mr-2 h-5 w-5" />
          Adicionar Novo Documento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DocumentFormFields 
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            type={type}
            setType={setType}
            category={category}
            setCategory={setCategory}
            accessLevel={accessLevel}
            setAccessLevel={setAccessLevel}
          />
          
          <FileUploadField file={file} setFile={setFile} />
          
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
