
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

interface MobileMenuButtonProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const MobileMenuButton = ({ isOpen, toggleMenu }: MobileMenuButtonProps) => {
  const { theme, setTheme } = useTheme();
  
  return (
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
  );
};

export default MobileMenuButton;
