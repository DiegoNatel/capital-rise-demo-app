
import { Link } from "react-router-dom";
import { LogOut, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

interface UserActionsProps {
  handleLogout: () => void;
}

const UserActions = ({ handleLogout }: UserActionsProps) => {
  const { user, isAuthenticated } = useAuth();

  const handleConnectWallet = () => {
    // Here we'll just show an alert for now
    alert("Wallet connection feature coming soon!");
  };

  return (
    <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
      <Button 
        variant="outline" 
        onClick={handleConnectWallet}
        className="bg-gradient-to-r from-brand-blue-500 to-brand-green-500 text-white hover:from-brand-blue-600 hover:to-brand-green-600"
      >
        <Wallet className="mr-2 h-4 w-4" />
        Connect Wallet
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
