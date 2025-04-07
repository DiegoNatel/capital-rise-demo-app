
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency } from "../utils/formatters";
import { Token } from "@/data/tokens";

interface MarketDepthProps {
  tokens: Token[];
}

const MarketDepth = ({ tokens }: MarketDepthProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Livro de Ofertas</CardTitle>
        <CardDescription>
          Ordens de compra e venda pendentes no mercado
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Token</span>
            <Select defaultValue="GTS">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Selecione o token" />
              </SelectTrigger>
              <SelectContent>
                {tokens.map((token) => (
                  <SelectItem key={token.id} value={token.symbol}>
                    {token.symbol} - {token.companyName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-green-600">Ordens de Compra</h3>
              <span className="text-sm text-slate-500 dark:text-slate-400">Quantidade</span>
            </div>
            <div className="space-y-2">
              {[
                { price: 3.42, quantity: 500 },
                { price: 3.40, quantity: 750 },
                { price: 3.38, quantity: 1200 },
                { price: 3.35, quantity: 2000 },
                { price: 3.30, quantity: 3500 },
              ].map((order, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-900/10 rounded"
                >
                  <span className="font-medium text-green-600">
                    {formatCurrency(order.price)}
                  </span>
                  <span>{order.quantity.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-blue-600">Ordens de Venda</h3>
              <span className="text-sm text-slate-500 dark:text-slate-400">Quantidade</span>
            </div>
            <div className="space-y-2">
              {[
                { price: 3.50, quantity: 800 },
                { price: 3.55, quantity: 650 },
                { price: 3.60, quantity: 1500 },
                { price: 3.65, quantity: 2200 },
                { price: 3.70, quantity: 3000 },
              ].map((order, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900/10 rounded"
                >
                  <span className="font-medium text-blue-600">
                    {formatCurrency(order.price)}
                  </span>
                  <span>{order.quantity.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketDepth;
