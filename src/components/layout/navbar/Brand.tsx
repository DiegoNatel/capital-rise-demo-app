
import { Link } from "react-router-dom";

interface BrandProps {
  isAuthenticated: boolean;
  closeMenu: () => void;
}

const Brand = ({ isAuthenticated, closeMenu }: BrandProps) => {
  // Define the target route - if authenticated, send to investor portal, otherwise to homepage
  const targetRoute = isAuthenticated ? "/investor" : "/";
  
  return (
    <Link 
      to={targetRoute}
      className="flex-shrink-0 flex items-center" 
      onClick={closeMenu}
    >
      <div className="bg-gradient-to-r from-brand-blue-500 to-brand-green-500 p-1.5 rounded-md mr-2">
        <span className="font-bold text-white text-lg">CR</span>
      </div>
      <span className="bg-gradient-to-r from-brand-blue-500 to-brand-green-500 bg-clip-text text-transparent font-bold text-xl">
        CapitalRise
      </span>
    </Link>
  );
};

export default Brand;
