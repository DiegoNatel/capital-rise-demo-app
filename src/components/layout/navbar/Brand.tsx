
import { Link } from "react-router-dom";

interface BrandProps {
  isAuthenticated: boolean;
  closeMenu: () => void;
}

const Brand = ({ isAuthenticated, closeMenu }: BrandProps) => {
  return (
    <Link 
      to={isAuthenticated ? "/marketplace" : "/"} 
      className="flex-shrink-0 flex items-center" 
      onClick={closeMenu}
    >
      <span className="bg-gradient-to-r from-brand-blue-500 to-brand-green-500 bg-clip-text text-transparent font-bold text-xl">
        CapitalRise
      </span>
    </Link>
  );
};

export default Brand;
