
import { 
  Card, 
  CardContent, 
  CardHeader
} from "@/components/ui/card";
import AccessControl from "../../../../investor/components/documents/AccessControl";
import AccessControlHeader from "./AccessControlHeader";

const AccessControlCard = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <AccessControlHeader />
      </CardHeader>
      <CardContent>
        <AccessControl />
      </CardContent>
    </Card>
  );
};

export default AccessControlCard;
