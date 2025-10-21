import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { App, Product } from "@shared/types";
import { api } from "@/lib/api-client";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";
type ConfirmPurchaseDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product;
  app: App;
  onPurchaseSuccess: () => void;
};
export function ConfirmPurchaseDialog({ open, onOpenChange, product, app, onPurchaseSuccess }: ConfirmPurchaseDialogProps) {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const handleConfirm = async () => {
    setIsPurchasing(true);
    try {
      await api(`/api/products/${product.id}/purchase`, {
        method: 'POST',
        body: JSON.stringify({ userId: 'user_me' }), // In a real app, this would come from auth state
      });
      toast.success("Purchase successful!", {
        description: `You now own ${product.name} for ${app.name}.`,
      });
      onPurchaseSuccess();
      onOpenChange(false);
    } catch (error) {
      toast.error("Purchase failed.", {
        description: error instanceof Error ? error.message : "An unknown error occurred.",
      });
    } finally {
      setIsPurchasing(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Your Purchase</DialogTitle>
          <DialogDescription>
            You are about to purchase the following item. Please review the details below.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="flex items-center gap-4">
            <img src={app.iconUrl} alt={app.name} className="w-16 h-16 rounded-xl" />
            <div>
              <h3 className="font-bold text-lg">{app.name}</h3>
              <p className="text-primary font-medium">{product.name}</p>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Benefits</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {product.benefits.map((benefit, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t pt-4 flex justify-between items-center">
            <span className="text-muted-foreground">Total Price</span>
            <span className="text-2xl font-bold">${product.price.amount.toFixed(2)}</span>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} disabled={isPurchasing}>
            Cancel
          </Button>
          <Button type="button" onClick={handleConfirm} disabled={isPurchasing}>
            {isPurchasing ? "Processing..." : "Confirm Purchase"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}