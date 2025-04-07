
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { formatCurrency, formatNumber } from "../utils/formatters";
import { Token } from "@/data/tokens";

interface TokenListProps {
  filteredTokens: Token[];
  trendingTokens?: Token[];
  onOrderClick: (token: Token, type: "buy" | "sell") => void;
}

const TokenList = ({ filteredTokens, trendingTokens, onOrderClick }: TokenListProps) => {
  const renderTokenRow = (token: Token, index: number) => (
    <TableRow key={token.id}>
      <TableCell className="font-medium">{index + 1}</TableCell>
      <TableCell>
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mr-3">
            <span className="font-bold text-xs">{token.symbol}</span>
          </div>
          <div>
            <Link to={`/company/${token.companyId}`} className="font-medium hover:underline">
              {token.name}
            </Link>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {token.symbol} • {token.category}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-right font-medium">
        {formatCurrency(token.price)}
      </TableCell>
      <TableCell
        className={`text-right ${
          token.priceChange24h >= 0
            ? "text-green-500"
            : "text-red-500"
        }`}
      >
        <span className="flex items-center justify-end">
          {token.priceChange24h >= 0 ? (
            <ArrowUpRight className="h-3 w-3 mr-1" />
          ) : (
            <ArrowDownRight className="h-3 w-3 mr-1" />
          )}
          {token.priceChange24h.toFixed(2)}%
        </span>
      </TableCell>
      <TableCell className="text-right">
        {formatCurrency(token.marketCap)}
      </TableCell>
      <TableCell className="text-right">
        {formatCurrency(token.volume24h)}
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
            onClick={() => onOrderClick(token, "buy")}
          >
            Comprar
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            onClick={() => onOrderClick(token, "sell")}
          >
            Vender
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <Tabs defaultValue="all">
      <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
        <TabsTrigger value="all">Todos os Tokens</TabsTrigger>
        <TabsTrigger value="trending">Em Alta</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all">
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Token</TableHead>
                <TableHead className="text-right">Preço</TableHead>
                <TableHead className="text-right">24h</TableHead>
                <TableHead className="text-right">Market Cap</TableHead>
                <TableHead className="text-right">Volume 24h</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTokens.map((token, index) => renderTokenRow(token, index))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
      
      <TabsContent value="trending">
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Token</TableHead>
                <TableHead className="text-right">Preço</TableHead>
                <TableHead className="text-right">24h</TableHead>
                <TableHead className="text-right">Market Cap</TableHead>
                <TableHead className="text-right">Volume 24h</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(trendingTokens || [])
                .map((token, index) => renderTokenRow(token, index))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default TokenList;
