
import { Link } from "react-router-dom";
import { LogOut, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface MobileNavProps {
  isOpen: boolean;
  isAuthenticated: boolean;
  closeMenu: () => void;
  handleLogout: () => void;
}

const MobileNav = ({ isOpen, isAuthenticated, closeMenu, handleLogout }: MobileNavProps) => {
  const { user } = useAuth();

  return (
    <div className={`sm:hidden ${isOpen ? "block" : "hidden"}`}>
      <div className="pt-2 pb-3 space-y-1">
        {!isAuthenticated && (
          <Link
            to="/"
            className="block pl-3 pr-4 py-2 text-base font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={closeMenu}
          >
            Home
          </Link>
        )}
        
        {isAuthenticated && (
          <>
            <Link
              to="/marketplace"
              className="block pl-3 pr-4 py-2 text-base font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
              onClick={closeMenu}
            >
              Marketplace
            </Link>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="company">
                <AccordionTrigger className="pl-3 pr-4 py-2 text-base font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800">
                  Para Empresas
                </AccordionTrigger>
                <AccordionContent>
                  <Link
                    to="/company"
                    className="block pl-6 pr-4 py-2 text-base font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
                    onClick={closeMenu}
                  >
                    Portal da Empresa
                  </Link>
                  <Link
                    to="/company/create-offer"
                    className="block pl-6 pr-4 py-2 text-base font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
                    onClick={closeMenu}
                  >
                    Criar Oferta
                  </Link>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="investor">
                <AccordionTrigger className="pl-3 pr-4 py-2 text-base font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800">
                  Para Investidores
                </AccordionTrigger>
                <AccordionContent>
                  <Link
                    to="/investor"
                    className="block pl-6 pr-4 py-2 text-base font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
                    onClick={closeMenu}
                  >
                    Portal do Investidor
                  </Link>
                  <Link
                    to="/investor/portfolio"
                    className="block pl-6 pr-4 py-2 text-base font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
                    onClick={closeMenu}
                  >
                    Meu Portfólio
                  </Link>
                  <Link
                    to="/investor/communication"
                    className="block pl-6 pr-4 py-2 text-base font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
                    onClick={closeMenu}
                  >
                    Central de Comunicação
                  </Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </>
        )}
        
        <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
          {isAuthenticated ? (
            <div className="px-4">
              <Button
                onClick={handleLogout}
                className="w-full flex items-center justify-center"
                variant="outline"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center px-4 space-x-2">
                <Link to="/login" className="w-full" onClick={closeMenu}>
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
              </div>
              <div className="mt-3 px-4">
                <Link to="/register" className="w-full" onClick={closeMenu}>
                  <Button className="w-full bg-gradient-to-r from-brand-blue-500 to-brand-green-500 text-white">
                    Get Started
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
