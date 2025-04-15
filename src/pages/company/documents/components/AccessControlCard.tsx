
import { Users } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import AccessControl from "../../../investor/components/documents/AccessControl";

const AccessControlCard = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <Users className="mr-2 h-5 w-5 text-blue-600" />
          Controle de Acesso a Documentos
        </CardTitle>
        <CardDescription>
          Defina quais tipos de investidores podem acessar os documentos da sua empresa
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AccessControl />
      </CardContent>
    </Card>
  );
};

export default AccessControlCard;
