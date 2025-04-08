
import { Link } from "react-router-dom";
import { LogOut, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
import { useAuth } from "@/contexts/AuthContext";

interface UserActionsProps {
  handleLogout: () => void;
}

const UserActions = ({ handleLogout }: UserActionsProps) => {
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated } = useAuth();

  return (
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
  );
};

export default UserActions;
