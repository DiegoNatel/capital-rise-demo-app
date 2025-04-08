
interface PortfolioHeaderProps {
  title: string;
  subtitle: string;
}

const PortfolioHeader = ({ title, subtitle }: PortfolioHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default PortfolioHeader;
