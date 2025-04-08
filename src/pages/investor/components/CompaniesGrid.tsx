
import CompanyCard, { CompanyWithOffers } from "./CompanyCard";

interface CompaniesGridProps {
  companies: CompanyWithOffers[];
}

const CompaniesGrid = ({ companies }: CompaniesGridProps) => {
  if (companies.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-2">
          Nenhuma empresa encontrada
        </h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Não encontramos empresas que correspondam aos seus filtros. 
          Tente ajustar os critérios de busca.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {companies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  );
};

export default CompaniesGrid;
