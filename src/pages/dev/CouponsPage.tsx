import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { CreateCouponDialog } from "@/components/page/dev/CreateCouponDialog";
import { api } from "@/lib/api-client";
import { Coupon } from "@shared/types";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
export function CouponsPage() {
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchCoupons = async () => {
    try {
      setIsLoading(true);
      const data = await api<{ items: Coupon[] }>('/api/coupons');
      setCoupons(data.items);
    } catch (error) {
      toast.error("Failed to fetch coupons.", {
        description: error instanceof Error ? error.message : "An unknown error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchCoupons();
  }, []);
  const getStatusBadgeClass = (coupon: Coupon) => {
    const now = new Date();
    if (coupon.validTo && new Date(coupon.validTo) < now) {
      return "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300";
    }
    if (coupon.validFrom && new Date(coupon.validFrom) > now) {
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300";
    }
    return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300";
  };
  const getStatusText = (coupon: Coupon) => {
    const now = new Date();
    if (coupon.validTo && new Date(coupon.validTo) < now) return "Expired";
    if (coupon.validFrom && new Date(coupon.validFrom) > now) return "Scheduled";
    return "Active";
  };
  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Coupons</h1>
            <p className="text-muted-foreground">Create and manage promotional codes.</p>
          </div>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Coupon
          </Button>
        </div>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-8 w-8" /></TableCell>
                    </TableRow>
                  ))
                ) : coupons.length > 0 ? (
                  coupons.map((coupon) => (
                    <TableRow key={coupon.id}>
                      <TableCell className="font-mono font-medium">{coupon.code}</TableCell>
                      <TableCell>{coupon.type === 'percent' ? `${coupon.value}%` : `$${coupon.value.toFixed(2)}`} off</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn("border-none", getStatusBadgeClass(coupon))}>
                          {getStatusText(coupon)}
                        </Badge>
                      </TableCell>
                      <TableCell>0 / {coupon.maxUses || 'Unlimited'}</TableCell>
                      <TableCell>{coupon.validTo ? new Date(coupon.validTo).toLocaleDateString() : 'Never'}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Deactivate</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No coupons found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <CreateCouponDialog open={isCreateDialogOpen} onOpenChange={setCreateDialogOpen} onCouponCreated={fetchCoupons} />
    </>
  );
}