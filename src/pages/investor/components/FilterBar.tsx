
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DollarSign, Filter, Search, Sliders } from "lucide-react";

export interface FilterOptions {
  status: string;
  industry: string;
  minInvestment: string;
  search: string;
}

interface FilterBarProps {
  filter: FilterOptions;
  setFilter: (filter: FilterOptions) => void;
  industries: string[];
}

const FilterBar = ({ filter, setFilter, industries }: FilterBarProps) => {
  const resetFilters = () => {
    setFilter({
      status: "all",
      industry: "all",
      minInvestment: "all",
      search: "",
    });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
            <Input
              placeholder="Buscar empresas, setores, ofertas..."
              className="pl-9"
              value={filter.search}
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="w-full md:w-auto">
            <Select
              value={filter.status}
              onValueChange={(value) => setFilter({ ...filter, status: value })}
            >
              <SelectTrigger className="w-full md:w-[160px]">
                <span className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  Status
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Ativos</SelectItem>
                <SelectItem value="upcoming">Em breve</SelectItem>
                <SelectItem value="completed">Concluídos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-auto">
            <Select
              value={filter.industry}
              onValueChange={(value) => setFilter({ ...filter, industry: value })}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <span className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  Setor
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os setores</SelectItem>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-auto">
            <Select
              value={filter.minInvestment}
              onValueChange={(value) => setFilter({ ...filter, minInvestment: value })}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <span className="flex items-center">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Investimento mín.
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Qualquer valor</SelectItem>
                <SelectItem value="1000">Até R$ 1.000</SelectItem>
                <SelectItem value="5000">Até R$ 5.000</SelectItem>
                <SelectItem value="10000">Até R$ 10.000</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="ghost" size="icon" onClick={resetFilters}>
            <Sliders className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        <div className="flex items-center">
          <span className="mr-2 text-slate-500 dark:text-slate-400">Filtros:</span>
          
          {filter.status !== "all" && (
            <span className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-700 px-2.5 py-0.5 text-xs">
              Status: {filter.status === "active" ? "Ativos" : 
                      filter.status === "upcoming" ? "Em breve" : 
                      filter.status === "completed" ? "Concluídos" : filter.status}
            </span>
          )}
          
          {filter.industry !== "all" && (
            <span className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-700 px-2.5 py-0.5 text-xs ml-2">
              Setor: {filter.industry}
            </span>
          )}
          
          {filter.minInvestment !== "all" && (
            <span className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-700 px-2.5 py-0.5 text-xs ml-2">
              Investimento: Até R$ {parseInt(filter.minInvestment).toLocaleString()}
            </span>
          )}
          
          {filter.search && (
            <span className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-700 px-2.5 py-0.5 text-xs ml-2">
              Busca: "{filter.search}"
            </span>
          )}
          
          {(filter.status === "all" && filter.industry === "all" && 
            filter.minInvestment === "all" && !filter.search) && (
            <span className="text-slate-500 dark:text-slate-400">Nenhum filtro aplicado</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
