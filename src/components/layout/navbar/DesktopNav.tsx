
import { Link } from "react-router-dom";
import { ChevronDown, MessageSquare } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface DesktopNavProps {
  isAuthenticated: boolean;
  closeMenu: () => void;
}

const DesktopNav = ({ isAuthenticated, closeMenu }: DesktopNavProps) => {
  const [feedback, setFeedback] = useState("");
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmitFeedback = () => {
    if (feedback.trim()) {
      toast({
        title: "Feedback enviado",
        description: "Obrigado por seu feedback! Vamos analisá-lo com atenção.",
      });
      setFeedback("");
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="hidden sm:ml-6 sm:flex sm:items-center">
      <nav className="flex space-x-8 items-center h-16">
        {!isAuthenticated && (
          <Link
            to="/"
            className="text-sm font-medium text-slate-900 hover:text-brand-blue-500"
            onClick={closeMenu}
          >
            Home
          </Link>
        )}
        
        {isAuthenticated && (
          <>
            <Link
              to="/marketplace"
              className="text-sm font-medium text-slate-900 hover:text-brand-blue-500"
              onClick={closeMenu}
            >
              Marketplace
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="inline-flex items-center text-sm font-medium text-slate-900 hover:text-brand-blue-500">
                  Para Empresas <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <Link to="/company" className="w-full" onClick={closeMenu}>
                    Portal da Empresa
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/company/create-offer" className="w-full" onClick={closeMenu}>
                    Criar Oferta
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="inline-flex items-center text-sm font-medium text-slate-900 hover:text-brand-blue-500">
                  Para Investidores <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <Link to="/investor" className="w-full" onClick={closeMenu}>
                    Portal do Investidor
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/investor/portfolio" className="w-full" onClick={closeMenu}>
                    Meu Portfólio
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/investor/communication" className="w-full" onClick={closeMenu}>
                    Central de Comunicação
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-sm font-medium text-slate-900 hover:text-brand-blue-500 hover:bg-transparent"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Feedback
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Envie seu feedback</DialogTitle>
                  <DialogDescription>
                    Nos ajude a melhorar sua experiência na plataforma.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                  <Textarea
                    placeholder="Digite sua mensagem aqui..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <Button onClick={handleSubmitFeedback} className="w-full">
                    Enviar Feedback
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </>
        )}
      </nav>
    </div>
  );
};

export default DesktopNav;
