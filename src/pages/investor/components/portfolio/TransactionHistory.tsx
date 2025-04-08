
import { useState } from "react";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PortfolioItem } from "@/data/portfolio";

interface TransactionHistoryProps {
  portfolioItems: PortfolioItem[];
  formatCurrency: (value: number) => string;
}

const TransactionHistory = ({ portfolioItems, formatCurrency }: TransactionHistoryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Transações</CardTitle>
        <CardDescription>
          Registro de todas as suas operações de compra e venda
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="buy">Compras</TabsTrigger>
            <TabsTrigger value="sell">Vendas</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            {["all", "buy", "sell"].map((tabValue) => (
              <TabsContent key={tabValue} value={tabValue} className="space-y-4">
                <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Token</TableHead>
                        <TableHead>Empresa</TableHead>
                        <TableHead className="text-right">Quantidade</TableHead>
                        <TableHead className="text-right">Preço</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {portfolioItems
                        .flatMap((item) =>
                          item.transactions
                            .filter(
                              (tx) =>
                                tabValue === "all" || tx.type === tabValue
                            )
                            .map((tx) => ({
                              ...tx,
                              tokenSymbol: item.tokenSymbol,
                              companyName: item.companyName,
                            }))
                        )
                        .sort(
                          (a, b) =>
                            new Date(b.date).getTime() -
                            new Date(a.date).getTime()
                        )
                        .map((tx) => (
                          <TableRow key={tx.id}>
                            <TableCell>
                              {new Date(tx.date).toLocaleDateString(
                                "pt-BR"
                              )}
                            </TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  tx.type === "buy"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                    : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                }`}
                              >
                                {tx.type === "buy" ? "Compra" : "Venda"}
                              </span>
                            </TableCell>
                            <TableCell className="font-medium">
                              {tx.tokenSymbol}
                            </TableCell>
                            <TableCell>{tx.companyName}</TableCell>
                            <TableCell className="text-right">
                              {tx.quantity.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right">
                              {formatCurrency(tx.price)}
                            </TableCell>
                            <TableCell className="text-right">
                              {formatCurrency(tx.total)}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
