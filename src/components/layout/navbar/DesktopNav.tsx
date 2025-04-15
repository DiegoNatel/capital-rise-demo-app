
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DesktopNavProps {
  isAuthenticated: boolean;
  closeMenu: () => void;
}

const DesktopNav = ({ isAuthenticated, closeMenu }: DesktopNavProps) => {
  return (
    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
      {!isAuthenticated && (
        <Link
          to="/"
          className="inline-flex items-center px-1 pt-1 text-sm font-medium text-slate-900 dark:text-slate-100 hover:text-brand-blue-500 dark:hover:text-brand-blue-400"
          onClick={closeMenu}
        >
          Home
        </Link>
      )}
      
      {isAuthenticated && (
        <>
          <Link
            to="/marketplace"
            className="inline-flex items-center px-1 pt-1 text-sm font-medium text-slate-900 dark:text-slate-100 hover:text-brand-blue-500 dark:hover:text-brand-blue-400"
            onClick={closeMenu}
          >
            Marketplace
          </Link>
          
          <div className="relative inline-block text-left">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="inline-flex items-center px-1 pt-1 text-sm font-medium text-slate-900 dark:text-slate-100 hover:text-brand-blue-500 dark:hover:text-brand-blue-400">
                  Para Empresas <ChevronDown size={16} className="ml-1" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/company" className="w-full" onClick={closeMenu}>Portal da Empresa</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/company/create-offer" className="w-full" onClick={closeMenu}>Criar Oferta</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/company/documents" className="w-full" onClick={closeMenu}>Repositório de Documentos</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="relative inline-block text-left">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="inline-flex items-center px-1 pt-1 text-sm font-medium text-slate-900 dark:text-slate-100 hover:text-brand-blue-500 dark:hover:text-brand-blue-400">
                  Para Investidores <ChevronDown size={16} className="ml-1" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/investor" className="w-full" onClick={closeMenu}>Portal do Investidor</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/investor/portfolio" className="w-full" onClick={closeMenu}>Meu Portfólio</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/investor/communication" className="w-full" onClick={closeMenu}>Central de Comunicação</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      )}
    </div>
  );
};

export default DesktopNav;
