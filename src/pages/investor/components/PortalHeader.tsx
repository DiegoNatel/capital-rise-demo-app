
import { Link } from "react-router-dom";

const PortalHeader = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold">Oportunidades de Investimento</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Explore ofertas de empresas inovadoras em diversos setores
        </p>
      </div>
    </div>
  );
};

export default PortalHeader;
