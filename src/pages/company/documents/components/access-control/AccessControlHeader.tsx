
import { Users } from "lucide-react";
import { 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";

const AccessControlHeader = () => {
  return (
    <>
      <CardTitle className="flex items-center">
        <Users className="mr-2 h-5 w-5 text-blue-600" />
        Controle de Acesso a Documentos
      </CardTitle>
      <CardDescription>
        Defina quais tipos de investidores podem acessar os documentos da sua empresa
      </CardDescription>
    </>
  );
};

export default AccessControlHeader;
