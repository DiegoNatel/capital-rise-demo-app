
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";

// Components
import Brand from "./navbar/Brand";
import DesktopNav from "./navbar/DesktopNav";
import UserActions from "./navbar/UserActions";
import MobileMenuButton from "./navbar/MobileMenuButton";
import MobileNav from "./navbar/MobileNav";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
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
            <Brand isAuthenticated={isAuthenticated} closeMenu={closeMenu} />
            <DesktopNav isAuthenticated={isAuthenticated} closeMenu={closeMenu} />
          </div>
          
          <UserActions handleLogout={handleLogout} />
          <MobileMenuButton isOpen={isOpen} toggleMenu={toggleMenu} />
        </div>
      </div>

      <MobileNav 
        isOpen={isOpen} 
        isAuthenticated={isAuthenticated} 
        closeMenu={closeMenu} 
        handleLogout={handleLogout} 
      />
    </nav>
  );
};

export default Navbar;
