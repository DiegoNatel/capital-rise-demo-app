
import { FileSpreadsheet, FileText, FileImage, FileCode } from "lucide-react";

export const getDocumentIcon = (type: string) => {
  switch (type) {
    case 'financial':
      return <FileSpreadsheet className="h-4 w-4 text-green-600" />;
    case 'legal':
      return <FileText className="h-4 w-4 text-blue-600" />;
    case 'presentations':
      return <FileImage className="h-4 w-4 text-purple-600" />;
    default:
      return <FileText className="h-4 w-4 text-gray-600" />;
  }
};

export const getAccessLevelIcon = (accessLevel: string) => {
  switch (accessLevel) {
    case 'public':
      return <Globe className="h-4 w-4 text-green-600" />;
    case 'registered':
      return <Users className="h-4 w-4 text-blue-600" />;
    case 'private':
      return <Lock className="h-4 w-4 text-amber-600" />;
    default:
      return <Lock className="h-4 w-4 text-gray-600" />;
  }
};

import { Globe, Lock, Users } from "lucide-react";

export const getAccessLevelBadge = (accessLevel: string) => {
  switch (accessLevel) {
    case 'public':
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Público</Badge>;
    case 'registered':
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Registrado</Badge>;
    case 'private':
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Privado</Badge>;
    default:
      return <Badge variant="outline">Desconhecido</Badge>;
  }
};

import { Badge } from "@/components/ui/badge";
