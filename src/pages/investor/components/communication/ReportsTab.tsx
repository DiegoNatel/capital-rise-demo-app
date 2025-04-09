
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Download, 
  FileText, 
  Search, 
  Calendar, 
  ArrowUpDown, 
  CheckCircle,
  ExternalLink
} from "lucide-react";
import { financialReports, FinancialReport } from "@/data/investorCommunication";

const ReportsTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "company">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  
  // Filter reports based on search query
  const filteredReports = financialReports.filter(report => 
    report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Sort reports based on sortBy and sortOrder
  const sortedReports = [...filteredReports].sort((a, b) => {
    if (sortBy === "date") {
      return sortOrder === "asc" 
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return sortOrder === "asc"
        ? a.companyName.localeCompare(b.companyName)
        : b.companyName.localeCompare(a.companyName);
    }
  });
  
  const toggleSort = (field: "date" | "company") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };
  
  return (
    <div>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <Input
            placeholder="Buscar relatórios financeiros..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Relatórios Financeiros</CardTitle>
          <CardDescription>
            Acesse os relatórios financeiros das empresas em que você investiu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Relatório</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => toggleSort("company")}
                    className="hover:bg-transparent p-0 h-auto font-medium flex items-center gap-1"
                  >
                    Empresa
                    <ArrowUpDown size={14} />
                  </Button>
                </TableHead>
                <TableHead>Período</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => toggleSort("date")}
                    className="hover:bg-transparent p-0 h-auto font-medium flex items-center gap-1"
                  >
                    Data de Publicação
                    <ArrowUpDown size={14} />
                  </Button>
                </TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">{report.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>{report.companyName}</TableCell>
                  <TableCell>{report.period}</TableCell>
                  <TableCell>{formatDate(report.date)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                      <Button size="sm">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Visualizar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="mt-6 space-y-4">
        <h3 className="text-lg font-medium">Destaques dos últimos relatórios</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedReports.slice(0, 2).map((report) => (
            <Card key={`highlights-${report.id}`}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{report.title}</CardTitle>
                <CardDescription>{report.companyName} • {report.period}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {report.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Baixar relatório completo
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsTab;
