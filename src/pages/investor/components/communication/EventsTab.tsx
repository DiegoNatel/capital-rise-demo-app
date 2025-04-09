
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
import { 
  CalendarDays, 
  Clock, 
  MapPin, 
  ExternalLink, 
  Calendar,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { events, Event } from "@/data/investorCommunication";

const EventsTab = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<"calendar" | "list">("list");
  
  // Format date strings to Date objects
  const eventsWithDates = events.map(event => ({
    ...event,
    dateObj: new Date(event.date)
  }));
  
  // Filter events based on selected date in calendar view
  const filteredEvents = viewMode === "calendar" && date
    ? eventsWithDates.filter(event => 
        event.dateObj.getDate() === date.getDate() &&
        event.dateObj.getMonth() === date.getMonth() &&
        event.dateObj.getFullYear() === date.getFullYear()
      )
    : eventsWithDates;
  
  // Sort events by date (upcoming first)
  const sortedEvents = [...filteredEvents].sort((a, b) => 
    a.dateObj.getTime() - b.dateObj.getTime()
  );
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };
  
  const getEventTypeLabel = (type: Event['type']) => {
    switch (type) {
      case 'earnings_call': return "Chamada de Resultados";
      case 'shareholder_meeting': return "Assembleia de Acionistas";
      case 'product_launch': return "Lançamento de Produto";
      case 'conference': return "Conferência";
      default: return type;
    }
  };
  
  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'earnings_call': return "bg-blue-100 text-blue-800 border-blue-200";
      case 'shareholder_meeting': return "bg-amber-100 text-amber-800 border-amber-200";
      case 'product_launch': return "bg-green-100 text-green-800 border-green-200";
      case 'conference': return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };
  
  // Function to highlight dates with events on the calendar
  const getDaysWithEvents = () => {
    const days: Date[] = [];
    
    events.forEach(event => {
      days.push(new Date(event.date));
    });
    
    return days;
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Próximos Eventos</h3>
        <div className="flex gap-2">
          <Button 
            variant={viewMode === "list" ? "default" : "outline"} 
            size="sm"
            onClick={() => setViewMode("list")}
          >
            Lista
          </Button>
          <Button 
            variant={viewMode === "calendar" ? "default" : "outline"} 
            size="sm"
            onClick={() => setViewMode("calendar")}
          >
            Calendário
          </Button>
        </div>
      </div>
      
      {viewMode === "calendar" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Calendário de Eventos</CardTitle>
              <CardDescription>
                Selecione uma data para ver os eventos agendados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                modifiers={{
                  hasEvent: getDaysWithEvents()
                }}
                modifiersStyles={{
                  hasEvent: { 
                    fontWeight: 'bold',
                    backgroundColor: '#e0f2fe',
                    color: '#0369a1',
                    borderRadius: '50%' 
                  }
                }}
                footer={
                  <div className="mt-3 text-center text-sm">
                    Datas com fundo azul têm eventos agendados
                  </div>
                }
              />
            </CardContent>
          </Card>
          
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>
                    {date ? formatDate(date.toISOString()) : "Eventos selecionados"}
                  </span>
                  <div className="flex gap-1">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => {
                        const newDate = new Date(date || new Date());
                        newDate.setDate(newDate.getDate() - 1);
                        setDate(newDate);
                      }}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => {
                        const newDate = new Date(date || new Date());
                        newDate.setDate(newDate.getDate() + 1);
                        setDate(newDate);
                      }}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {sortedEvents.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 mx-auto text-slate-300" />
                    <h3 className="mt-4 text-lg font-medium">Nenhum evento nesta data</h3>
                    <p className="mt-1 text-slate-500">
                      Selecione outra data ou visualize a lista completa de eventos
                    </p>
                    <Button 
                      className="mt-4" 
                      variant="outline"
                      onClick={() => setViewMode("list")}
                    >
                      Ver lista completa
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sortedEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

// Separate EventCard component
const EventCard = ({ event }: { event: Event & { dateObj?: Date } }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };
  
  const getEventTypeLabel = (type: Event['type']) => {
    switch (type) {
      case 'earnings_call': return "Chamada de Resultados";
      case 'shareholder_meeting': return "Assembleia de Acionistas";
      case 'product_launch': return "Lançamento de Produto";
      case 'conference': return "Conferência";
      default: return type;
    }
  };
  
  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'earnings_call': return "bg-blue-100 text-blue-800 border-blue-200";
      case 'shareholder_meeting': return "bg-amber-100 text-amber-800 border-amber-200";
      case 'product_launch': return "bg-green-100 text-green-800 border-green-200";
      case 'conference': return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };
  
  // Check if event is in the past
  const isPast = new Date(event.date) < new Date();
  
  return (
    <Card className={isPast ? "opacity-70" : ""}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{event.title}</CardTitle>
            <CardDescription>{event.companyName}</CardDescription>
          </div>
          <Badge className={getEventTypeColor(event.type)}>
            {getEventTypeLabel(event.type)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center text-slate-600">
            <CalendarDays className="h-4 w-4 mr-2" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center text-slate-600">
            <Clock className="h-4 w-4 mr-2" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-slate-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{event.location}</span>
          </div>
          <p className="mt-2 text-slate-700">{event.description}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {isPast ? (
          <Button variant="outline" disabled>Evento passado</Button>
        ) : (
          <>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Adicionar ao calendário
            </Button>
            {event.registrationUrl && (
              <Button>
                <ExternalLink className="h-4 w-4 mr-2" />
                Registrar
              </Button>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default EventsTab;
