
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon, ChevronDown, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    closeMenu();
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center" onClick={closeMenu}>
              <span className="bg-gradient-to-r from-brand-blue-500 to-brand-green-500 bg-clip-text text-transparent font-bold text-xl">
                CapitalRise
              </span>
            </Link>
            
            {/* Desktop navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-slate-900 dark:text-slate-100 hover:text-brand-blue-500 dark:hover:text-brand-blue-400"
                onClick={closeMenu}
              >
                Home
              </Link>
              
              {isAuthenticated && (
                <>
                  <div className="relative inline-block text-left">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="inline-flex items-center px-1 pt-1 text-sm font-medium text-slate-900 dark:text-slate-100 hover:text-brand-blue-500 dark:hover:text-brand-blue-400">
                          For Companies <ChevronDown size={16} className="ml-1" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuItem asChild>
                          <Link to="/company" className="w-full">Company Portal</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/company/create-offer" className="w-full">Create Offering</Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="relative inline-block text-left">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="inline-flex items-center px-1 pt-1 text-sm font-medium text-slate-900 dark:text-slate-100 hover:text-brand-blue-500 dark:hover:text-brand-blue-400">
                          For Investors <ChevronDown size={16} className="ml-1" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuItem asChild>
                          <Link to="/investor" className="w-full">Investor Portal</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/investor/portfolio" className="w-full">My Portfolio</Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <Link
                    to="/marketplace"
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-slate-900 dark:text-slate-100 hover:text-brand-blue-500 dark:hover:text-brand-blue-400"
                    onClick={closeMenu}
                  >
                    Marketplace
                  </Link>
                </>
              )}
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    {user?.name || "User"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                
                <Link to="/register">
                  <Button className="bg-gradient-to-r from-brand-blue-500 to-brand-green-500 text-white">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="mr-2"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`sm:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="block pl-3 pr-4 py-2 text-base font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={closeMenu}
          >
            Home
          </Link>
          
          {isAuthenticated && (
            <>
              <Link
                to="/company"
                className="block pl-3 pr-4 py-2 text-base font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={closeMenu}
              >
                Company Portal
              </Link>
              
              <Link
                to="/investor"
                className="block pl-3 pr-4 py-2 text-base font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={closeMenu}
              >
                Investor Portal
              </Link>
              
              <Link
                to="/marketplace"
                className="block pl-3 pr-4 py-2 text-base font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={closeMenu}
              >
                Marketplace
              </Link>
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
    </nav>
  );
};

export default Navbar;
