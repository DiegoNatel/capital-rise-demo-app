
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Bell,
  BellOff,
  Mail,
  CalendarClock,
  FileText,
  MessageSquare,
  RefreshCw,
  ChevronRight
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const NotificationsTab = () => {
  const [email, setEmail] = useState("investor@example.com");
  const [verifyingEmail, setVerifyingEmail] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  
  const notificationPreferences = [
    { id: "announcements", label: "Anúncios de empresas", enabled: true, icon: Bell },
    { id: "financials", label: "Novos relatórios financeiros", enabled: true, icon: FileText },
    { id: "questions", label: "Respostas às suas perguntas", enabled: true, icon: MessageSquare },
    { id: "events", label: "Lembretes de eventos", enabled: true, icon: CalendarClock },
    { id: "price_alerts", label: "Alertas de preço", enabled: false, icon: RefreshCw },
  ];
  
  const notificationHistory = [
    { id: "1", type: "email", content: "Novo relatório financeiro da TechVentures", date: "2025-04-08", status: "delivered" },
    { id: "2", type: "email", content: "Lembrete: Chamada de resultados amanhã", date: "2025-04-14", status: "delivered" },
    { id: "3", type: "push", content: "Sua pergunta foi respondida por GreenEnergy", date: "2025-04-05", status: "delivered" },
    { id: "4", type: "email", content: "Novo anúncio importante da HealthInnovate", date: "2025-04-01", status: "opened" },
    { id: "5", type: "push", content: "Anúncio importante: Expansão da GreenEnergy", date: "2025-03-28", status: "delivered" },
  ];
  
  const handleUpdateEmail = () => {
    setVerifyingEmail(true);
  };
  
  const handleVerifyEmail = () => {
    setVerifyingEmail(false);
    // Here you would normally verify the OTP with an API
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
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Configurações de Email</CardTitle>
          <CardDescription>
            Gerencie o email onde você deseja receber notificações
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!verifyingEmail ? (
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <label htmlFor="email" className="text-sm font-medium mb-1 block">
                  Email para notificações
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                />
              </div>
              <Button 
                onClick={handleUpdateEmail} 
                className="md:self-end"
              >
                Atualizar Email
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-1">Verifique seu email</h3>
                <p className="text-sm text-slate-500">
                  Enviamos um código de verificação para {email}
                </p>
              </div>
              
              <div className="flex flex-col items-center space-y-4">
                <InputOTP
                  maxLength={6}
                  value={otpValue}
                  onChange={setOtpValue}
                  render={({ slots }) => (
                    <InputOTPGroup>
                      {slots.map((slot, index) => (
                        <InputOTPSlot key={index} {...slot} index={index} />
                      ))}
                    </InputOTPGroup>
                  )}
                />
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setVerifyingEmail(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleVerifyEmail} disabled={otpValue.length !== 6}>
                    Verificar
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Preferências de Notificação</CardTitle>
          <CardDescription>
            Escolha quais tipos de notificações você deseja receber
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notificationPreferences.map((pref) => (
              <div key={pref.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-slate-100 p-2 rounded-full">
                    <pref.icon className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>{pref.label}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id={`${pref.id}-switch`} defaultChecked={pref.enabled} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Notificações</CardTitle>
          <CardDescription>
            Últimas notificações enviadas para você
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Conteúdo</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notificationHistory.map((notification) => (
                <TableRow key={notification.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {notification.type === "email" ? (
                        <Mail className="h-4 w-4 text-slate-500" />
                      ) : (
                        <Bell className="h-4 w-4 text-slate-500" />
                      )}
                      <span className="capitalize">{notification.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{notification.content}</TableCell>
                  <TableCell>{formatDate(notification.date)}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`
                        ${notification.status === 'delivered' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                        ${notification.status === 'opened' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                      `}
                    >
                      {notification.status === 'delivered' ? 'Entregue' : 'Lido'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="mt-4 flex justify-center">
            <Button variant="outline" size="sm">
              Ver mais notificações
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsTab;
