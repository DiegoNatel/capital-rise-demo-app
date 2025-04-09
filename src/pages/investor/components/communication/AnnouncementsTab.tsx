
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bell, Search, Filter, AlertCircle } from "lucide-react";
import { announcements, Announcement } from "@/data/investorCommunication";

const AnnouncementsTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  // Filter announcements based on search query and category filter
  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = 
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      categoryFilter === "all" || 
      announcement.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  // Sort announcements by date (newest first) and importance
  const sortedAnnouncements = [...filteredAnnouncements].sort((a, b) => {
    if (a.important && !b.important) return -1;
    if (!a.important && b.important) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'general': return "bg-blue-100 text-blue-800 border-blue-200";
      case 'financial': return "bg-green-100 text-green-800 border-green-200";
      case 'corporate': return "bg-purple-100 text-purple-800 border-purple-200";
      case 'product': return "bg-amber-100 text-amber-800 border-amber-200";
      default: return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };
  
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'general': return "Geral";
      case 'financial': return "Financeiro";
      case 'corporate': return "Corporativo";
      case 'product': return "Produto";
      default: return category;
    }
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <Input
            placeholder="Buscar anúncios..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="w-full md:w-64">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filtrar por categoria" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              <SelectItem value="general">Geral</SelectItem>
              <SelectItem value="financial">Financeiro</SelectItem>
              <SelectItem value="corporate">Corporativo</SelectItem>
              <SelectItem value="product">Produto</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {sortedAnnouncements.length === 0 ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Nenhum anúncio encontrado</AlertTitle>
          <AlertDescription>
            Não encontramos anúncios correspondentes aos filtros selecionados. Tente ajustar seus critérios de busca.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="space-y-4">
          {sortedAnnouncements.map((announcement) => (
            <Card key={announcement.id} className={announcement.important ? "border-l-4 border-l-red-500" : ""}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{announcement.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <span>{announcement.companyName}</span>
                      <span className="text-sm text-slate-400">•</span>
                      <span>{formatDate(announcement.date)}</span>
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {announcement.important && (
                      <Badge variant="destructive" className="ml-2">
                        Importante
                      </Badge>
                    )}
                    <Badge className={getCategoryColor(announcement.category)}>
                      {getCategoryLabel(announcement.category)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">{announcement.content}</p>
              </CardContent>
              <CardFooter className="flex justify-end gap-4 pt-2">
                <Button variant="outline" size="sm">
                  Compartilhar
                </Button>
                <Button size="sm">
                  Ler completo
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnnouncementsTab;
