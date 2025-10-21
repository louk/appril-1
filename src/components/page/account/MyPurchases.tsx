import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";
import { Purchase } from "@shared/types";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
function PurchaseSkeleton() {
  return (
    <Card className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4">
      <div className="flex items-center gap-4 w-full">
        <Skeleton className="w-12 h-12 rounded-lg" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </Card>
  );
}
export function MyPurchases() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        setIsLoading(true);
        const data = await api<Purchase[]>('/api/users/me/purchases');
        setPurchases(data);
      } catch (error) {
        toast.error("Failed to fetch purchases.", {
          description: error instanceof Error ? error.message : "An unknown error occurred.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchPurchases();
  }, []);
  const getExpiryText = (expiresAt: string | null) => {
    if (expiresAt === null) return "Never";
    const expiryDate = new Date(expiresAt);
    if (expiryDate < new Date()) return "Expired";
    return `in ${formatDistanceToNow(expiryDate)}`;
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Purchases</CardTitle>
        <CardDescription>View and manage your active memberships and subscriptions.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <PurchaseSkeleton key={i} />)
        ) : purchases.length > 0 ? (
          purchases.map((purchase) => (
            <Card key={purchase.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <img src={purchase.appIconUrl} alt={purchase.appName} className="w-12 h-12 rounded-lg" />
                <div>
                  <h3 className="font-semibold">{purchase.appName} - <span className="text-primary">{purchase.productName}</span></h3>
                  <p className="text-sm text-muted-foreground">Expires: {getExpiryText(purchase.expiresAt)}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4 sm:mt-0 self-end sm:self-center">
                <Button variant="outline" size="sm">Manage</Button>
                <Button variant="secondary" size="sm">List for Sale</Button>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center text-muted-foreground py-12">
            <p>You haven't made any purchases yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}