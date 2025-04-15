
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Save, UserCheck, UserX } from "lucide-react";
import { documentAccessLevels } from "@/data/documents";

interface AccessControlProps {
  documentId?: string;
}

const AccessControl = ({ documentId }: AccessControlProps) => {
  const [accessLevels, setAccessLevels] = useState(documentAccessLevels);

  const handleAccessChange = (id: string, access: string) => {
    setAccessLevels(
      accessLevels.map((level) =>
        level.id === id ? { ...level, access } : level
      )
    );
  };

  const handleToggleEnabled = (id: string) => {
    setAccessLevels(
      accessLevels.map((level) =>
        level.id === id ? { ...level, enabled: !level.enabled } : level
      )
    );
  };

  const handleSave = () => {
    console.log("Saving access control settings:", accessLevels);
    // Here you would typically make an API call to save the changes
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Controle de Acesso a Documentos</h3>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>

      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo de Investidor</TableHead>
              <TableHead>Nível de Acesso</TableHead>
              <TableHead>Habilitado</TableHead>
              <TableHead>Última Atualização</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accessLevels.map((level) => (
              <TableRow key={level.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {level.enabled ? (
                      <UserCheck className="h-4 w-4 text-green-500" />
                    ) : (
                      <UserX className="h-4 w-4 text-red-500" />
                    )}
                    {level.investorType}
                  </div>
                </TableCell>
                <TableCell>
                  <Select
                    value={level.access}
                    onValueChange={(value) => handleAccessChange(level.id, value)}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Selecionar acesso" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="read">Leitura</SelectItem>
                      <SelectItem value="download">Download</SelectItem>
                      <SelectItem value="none">Sem Acesso</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={level.enabled}
                    onCheckedChange={() => handleToggleEnabled(level.id)}
                  />
                </TableCell>
                <TableCell>
                  {new Date(level.lastUpdated).toLocaleDateString("pt-BR")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AccessControl;
