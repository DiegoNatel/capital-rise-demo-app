
import { Filter, Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TokenListFiltersProps {
  filter: {
    search: string;
    industry: string;
    orderBy: string;
    orderDir: "asc" | "desc";
  };
  setFilter: (filter: any) => void;
  categories: string[];
}

const TokenListFilters = ({ filter, setFilter, categories }: TokenListFiltersProps) => {
  return (
    <div className="w-full md:w-auto flex flex-col md:flex-row gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
        <Input
          placeholder="Buscar tokens..."
          className="pl-9"
          value={filter.search}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
        />
      </div>
      
      <Select
        value={filter.industry}
        onValueChange={(value) => setFilter({ ...filter, industry: value })}
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <span className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Categoria
          </span>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as categorias</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select
        value={`${filter.orderBy}-${filter.orderDir}`}
        onValueChange={(value) => {
          const [orderBy, orderDir] = value.split("-");
          setFilter({
            ...filter,
            orderBy,
            orderDir: orderDir as "asc" | "desc",
          });
        }}
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <span className="flex items-center">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Ordenar por
          </span>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="marketCap-desc">Market Cap (maior)</SelectItem>
          <SelectItem value="marketCap-asc">Market Cap (menor)</SelectItem>
          <SelectItem value="price-desc">Preço (maior)</SelectItem>
          <SelectItem value="price-asc">Preço (menor)</SelectItem>
          <SelectItem value="volume-desc">Volume (maior)</SelectItem>
          <SelectItem value="volume-asc">Volume (menor)</SelectItem>
          <SelectItem value="priceChange-desc">Variação (maior)</SelectItem>
          <SelectItem value="priceChange-asc">Variação (menor)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TokenListFilters;
