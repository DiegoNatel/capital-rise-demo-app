
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Token } from "@/data/tokens";
import { useState, useEffect } from "react";
import { formatCurrency } from "../utils/formatters";

interface OrderDialogProps {
  selectedToken: Token | null;
  tradeType: "buy" | "sell";
  isOpen: boolean;
  onClose: () => void;
  onPlaceOrder: (quantity: string, price: string) => void;
}

const OrderDialog = ({
  selectedToken,
  tradeType,
  isOpen,
  onClose,
  onPlaceOrder,
}: OrderDialogProps) => {
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (selectedToken && isOpen) {
      setQuantity("");
      setPrice(
        tradeType === "buy"
          ? selectedToken.price.toString()
          : (selectedToken.price * 1.05).toFixed(2)
      );
    }
  }, [selectedToken, isOpen, tradeType]);

  const handleSubmit = () => {
    onPlaceOrder(quantity, price);
    setQuantity("");
    setPrice("");
  };

  if (!selectedToken) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {tradeType === "buy" ? "Comprar" : "Vender"} Tokens
          </DialogTitle>
          <DialogDescription>
            {tradeType === "buy"
              ? "Crie uma ordem de compra para adquirir tokens"
              : "Crie uma ordem de venda para seus tokens"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mr-3">
              <span className="font-bold">{selectedToken.symbol}</span>
            </div>
            <div>
              <h3 className="font-medium">{selectedToken.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {selectedToken.companyName}
              </p>
            </div>
          </div>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Preço por Token (R$)</Label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-slate-500 dark:text-slate-400">
                      R$
                    </span>
                  </div>
                  <Input
                    id="price"
                    className="pl-10"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                    step="0.01"
                    min="0.01"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="quantity">Quantidade</Label>
                <Input
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  type="number"
                  min="1"
                />
              </div>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                Resumo:
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span className="font-medium">
                    {quantity && price
                      ? formatCurrency(parseFloat(quantity) * parseFloat(price))
                      : "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Taxa da plataforma (0.5%):</span>
                  <span className="font-medium">
                    {quantity && price
                      ? formatCurrency(
                          parseFloat(quantity) *
                            parseFloat(price) *
                            0.005
                        )
                      : "-"}
                  </span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200 dark:border-slate-700">
                  <span>Total {tradeType === "buy" ? "a pagar" : "a receber"}:</span>
                  <span className="font-medium">
                    {quantity && price
                      ? formatCurrency(
                          parseFloat(quantity) *
                            parseFloat(price) *
                            (tradeType === "buy" ? 1.005 : 0.995)
                        )
                      : "-"}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="text-sm text-slate-500 dark:text-slate-400">
              {tradeType === "buy"
                ? "A ordem será executada quando houver vendedores disponíveis no preço especificado ou inferior."
                : "A ordem será executada quando houver compradores disponíveis no preço especificado ou superior."}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!quantity || !price}
              className={
                tradeType === "buy"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }
            >
              Criar Ordem de {tradeType === "buy" ? "Compra" : "Venda"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDialog;
