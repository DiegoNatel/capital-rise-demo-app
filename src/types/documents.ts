
export interface InvestorDocument {
  id: string;
  title: string;
  description: string;
  company: string;
  type: string;
  category: string;
  publishedAt: string;
  version: string;
  url: string;
  fileSize: string;
  accessLevel: string;
}

export interface DocumentVersion {
  id: string;
  documentId: string;
  version: number;
  modifiedAt: string;
  modifiedBy: string;
  changeDescription: string;
  url: string;
}

export interface AccessLevel {
  id: string;
  investorType: string;
  access: string;
  enabled: boolean;
  lastUpdated: string;
}

export interface DocumentAnalyticsData {
  viewsByDocument: { name: string; views: number }[];
  downloadsByType: { name: string; value: number }[];
  accessByInvestorType: { name: string; value: number }[];
  topDocuments: { name: string; views: number }[];
}
