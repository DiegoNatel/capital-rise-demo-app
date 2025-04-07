
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "../utils/formatters";

const TransactionHistory = () => {
  const transactions = [
    {
      time: "14:32:15",
      pair: "GTS",
      type: "buy",
      price: 3.47,
      quantity: 500,
    },
    {
      time: "14:28:42",
      pair: "HST",
      type: "sell",
      price: 2.65,
      quantity: 750,
    },
    {
      time: "14:25:18",
      pair: "FFT",
      type: "buy",
      price: 1.82,
      quantity: 1200,
    },
    {
      time: "14:20:03",
      pair: "AST",
      type: "sell",
      price: 3.94,
      quantity: 300,
    },
    {
      time: "14:15:27",
      pair: "LFT",
      type: "buy",
      price: 4.18,
      quantity: 450,
    },
    {
      time: "14:10:55",
      pair: "GTS",
      type: "sell",
      price: 3.45,
      quantity: 600,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Transações</CardTitle>
        <CardDescription>
          Negociações recentes concluídas na plataforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Horário</TableHead>
                <TableHead>Par</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Preço</TableHead>
                <TableHead className="text-right">Quantidade</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx, index) => (
                <TableRow key={index}>
                  <TableCell className="text-sm">{tx.time}</TableCell>
                  <TableCell className="font-medium">{tx.pair}</TableCell>
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
                  <TableCell className="text-right">
                    {formatCurrency(tx.price)}
                  </TableCell>
                  <TableCell className="text-right">
                    {tx.quantity.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(tx.price * tx.quantity)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
