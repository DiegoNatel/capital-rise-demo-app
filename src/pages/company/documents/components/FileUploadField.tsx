
import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploadFieldProps {
  file: File | null;
  setFile: (file: File | null) => void;
}

const FileUploadField = ({ file, setFile }: FileUploadFieldProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-2">
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
  );
};

export default FileUploadField;
