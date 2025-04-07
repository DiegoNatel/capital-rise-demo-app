
import { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { tokens } from "@/data/tokens";

// Components
import MarketOverview from "./components/MarketOverview";
import TokenListFilters from "./components/TokenListFilters";
import TokenList from "./components/TokenList";
import MarketDepth from "./components/MarketDepth";
import TransactionHistory from "./components/TransactionHistory";
import OrderDialog from "./components/OrderDialog";

const Marketplace = () => {
  const { toast } = useToast();
  const [filter, setFilter] = useState({
    search: "",
    industry: "all",
    orderBy: "marketCap",
    orderDir: "desc" as "asc" | "desc",
  });
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const [selectedToken, setSelectedToken] = useState<typeof tokens[0] | null>(null);
  
  const filteredTokens = tokens
    .filter((token) => {
      if (filter.search) {
        const searchLower = filter.search.toLowerCase();
        return (
          token.symbol.toLowerCase().includes(searchLower) ||
          token.name.toLowerCase().includes(searchLower) ||
          token.companyId.toLowerCase().includes(searchLower) ||
          token.category.toLowerCase().includes(searchLower)
        );
      }
      
      if (filter.industry !== "all" && token.category !== filter.industry) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      const orderDir = filter.orderDir === "asc" ? 1 : -1;
      
      if (filter.orderBy === "marketCap") {
        return orderDir * (a.marketCap - b.marketCap);
      } else if (filter.orderBy === "price") {
        return orderDir * (a.price - b.price);
      } else if (filter.orderBy === "volume") {
        return orderDir * (a.volume24h - b.volume24h);
      } else {
        return orderDir * (a.priceChange24h - b.priceChange24h);
      }
    });
  
  const trendingTokens = tokens
    .sort((a, b) => b.priceChange24h - a.priceChange24h)
    .slice(0, 5);
  
  const categories = Array.from(new Set(tokens.map((token) => token.category)));
  
  const handleOpenOrderDialog = (token: typeof tokens[0], type: "buy" | "sell") => {
    setSelectedToken(token);
    setTradeType(type);
  };
  
  const handlePlaceOrder = (quantity: string, price: string) => {
    if (!selectedToken || !quantity || !price) return;
    
    toast({
      title: `Ordem de ${tradeType === "buy" ? "compra" : "venda"} criada com sucesso`,
      description: `${tradeType === "buy" ? "Compra" : "Venda"} de ${quantity} ${selectedToken.symbol} a R$ ${parseFloat(price).toFixed(2)} por token.`,
    });
    
    setSelectedToken(null);
  };
  
  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Marketplace de Tokens</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Negocie tokens de empresas com liquidez e transparência
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Link to="/investor/portfolio">
              <Button variant="outline">Meu Portfólio</Button>
            </Link>
            <Link to="/investor">
              <Button className="bg-gradient-to-r from-brand-blue-500 to-brand-green-500 text-white">
                Oportunidades
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        
        <MarketOverview />
        
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <CardTitle>Lista de Tokens</CardTitle>
                <CardDescription>
                  Tokens disponíveis para negociação na plataforma
                </CardDescription>
              </div>
              
              <TokenListFilters 
                filter={filter} 
                setFilter={setFilter} 
                categories={categories} 
              />
            </div>
          </CardHeader>
          <CardContent>
            <TokenList 
              filteredTokens={filteredTokens} 
              trendingTokens={trendingTokens} 
              onOrderClick={handleOpenOrderDialog} 
            />
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <MarketDepth tokens={tokens} />
          <TransactionHistory />
        </div>
      </div>
      
      <OrderDialog 
        selectedToken={selectedToken}
        tradeType={tradeType}
        isOpen={!!selectedToken}
        onClose={() => setSelectedToken(null)}
        onPlaceOrder={handlePlaceOrder}
      />
    </MainLayout>
  );
};

export default Marketplace;
