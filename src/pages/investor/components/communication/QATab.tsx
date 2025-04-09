
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
import { Textarea } from "@/components/ui/textarea";
import { 
  HelpCircle, 
  Search, 
  Plus, 
  MessageSquare, 
  User,
  SendHorizontal,
  CheckCircle,
  Clock
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { questions, Question } from "@/data/investorCommunication";

const QATab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [newQuestion, setNewQuestion] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Filter questions based on search query and status filter
  const filteredQuestions = questions.filter(question => {
    const matchesSearch = 
      question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (question.answer?.content.toLowerCase().includes(searchQuery.toLowerCase()) || false);
    
    const matchesStatus = 
      statusFilter === "all" || 
      question.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Sort questions by date (newest first)
  const sortedQuestions = [...filteredQuestions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };
  
  const handleSubmitQuestion = () => {
    // Here you would normally submit the question to an API
    // For now we just close the dialog and reset the form
    setIsDialogOpen(false);
    setNewQuestion("");
    setSelectedCompany("");
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <Input
            placeholder="Buscar perguntas e respostas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="pending">Pendentes</SelectItem>
              <SelectItem value="answered">Respondidas</SelectItem>
            </SelectContent>
          </Select>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Nova Pergunta
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Enviar pergunta para empresa</DialogTitle>
                <DialogDescription>
                  Envie uma pergunta diretamente para a equipe de relações com investidores da empresa.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium">Empresa</label>
                  <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                    <SelectTrigger id="company">
                      <SelectValue placeholder="Selecione a empresa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">TechVentures</SelectItem>
                      <SelectItem value="2">GreenEnergy</SelectItem>
                      <SelectItem value="3">HealthInnovate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="question" className="text-sm font-medium">Sua pergunta</label>
                  <Textarea
                    id="question"
                    placeholder="Digite sua pergunta aqui..."
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    rows={4}
                  />
                  <p className="text-xs text-slate-500">
                    Sua pergunta será revisada pela equipe de RI e respondida o mais breve possível.
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button 
                  type="button" 
                  onClick={handleSubmitQuestion}
                  disabled={!newQuestion.trim() || !selectedCompany}
                >
                  <SendHorizontal className="mr-2 h-4 w-4" />
                  Enviar Pergunta
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="space-y-6">
        {sortedQuestions.map((question) => (
          <Card key={question.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <div className="bg-slate-100 rounded-full p-2 mt-1">
                    <User className="h-4 w-4 text-slate-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{question.userName}</CardTitle>
                    <CardDescription className="mt-1">
                      {formatDate(question.date)}
                    </CardDescription>
                  </div>
                </div>
                <Badge className={
                  question.status === "answered" 
                    ? "bg-green-100 text-green-800 border-green-200" 
                    : "bg-amber-100 text-amber-800 border-amber-200"
                }>
                  <div className="flex items-center gap-1">
                    {question.status === "answered" ? (
                      <CheckCircle className="h-3 w-3" />
                    ) : (
                      <Clock className="h-3 w-3" />
                    )}
                    <span>{question.status === "answered" ? "Respondida" : "Pendente"}</span>
                  </div>
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                  <p className="text-slate-800 font-medium">{question.question}</p>
                </div>
                
                {question.answer && (
                  <div className="mt-4 pl-6 border-l-2 border-slate-200 ml-2">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="text-slate-800">{question.answer.content}</p>
                        <div className="mt-2 text-sm text-slate-500 flex items-center justify-between">
                          <span>{question.answer.answeredBy}</span>
                          <span>{formatDate(question.answer.date)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            {question.status === "answered" && (
              <CardFooter className="justify-end">
                <Button variant="outline" size="sm">
                  Fazer pergunta de acompanhamento
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QATab;
