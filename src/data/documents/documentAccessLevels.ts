
import { v4 as uuidv4 } from 'uuid';

// Document access control data
export const documentAccessLevels = [
  {
    id: uuidv4(),
    investorType: "Investidor Individual",
    access: "read",
    enabled: true,
    lastUpdated: "2024-03-01"
  },
  {
    id: uuidv4(),
    investorType: "Investidor Institucional",
    access: "download",
    enabled: true,
    lastUpdated: "2024-03-01"
  },
  {
    id: uuidv4(),
    investorType: "Investidor Qualificado",
    access: "download",
    enabled: true,
    lastUpdated: "2024-03-01"
  },
  {
    id: uuidv4(),
    investorType: "Parceiro Estratégico",
    access: "download",
    enabled: true,
    lastUpdated: "2024-03-01"
  },
  {
    id: uuidv4(),
    investorType: "Visitante Não Registrado",
    access: "none",
    enabled: false,
    lastUpdated: "2024-03-01"
  }
];
