import { useParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, Globe, Twitter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { api } from "@/lib/api-client";
import { App, Product } from "@shared/types";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { ConfirmPurchaseDialog } from "@/components/page/app-detail/ConfirmPurchaseDialog";
export function AppDetailPage() {
  const { slug } = useParams();
  const [app, setApp] = useState<App | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const fetchAppAndProducts = async () => {
    if (!slug) return;
    try {
      setIsLoading(true);
      const appsData = await api<{ items: App[] }>('/api/apps');
      const foundApp = appsData.items.find(a => a.slug === slug);
      if (foundApp) {
        setApp(foundApp);
        const productsData = await api<{ items: Product[] }>(`/api/products?appId=${foundApp.id}`);
        setProducts(productsData.items);
      } else {
        setApp(null);
      }
    } catch (error) {
      toast.error("Failed to fetch app details.", {
        description: error instanceof Error ? error.message : "An unknown error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAppAndProducts();
  }, [slug]);
  const handleBuyClick = (product: Product) => {
    setSelectedProduct(product);
    setConfirmOpen(true);
  };
  if (isLoading) {
    return (
      <MainLayout>
        <div className="bg-secondary/50 dark:bg-secondary/20 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <Skeleton className="w-32 h-32 rounded-3xl" />
              <div className="space-y-3 text-center md:text-left">
                <Skeleton className="h-12 w-72" />
                <Skeleton className="h-6 w-48" />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <Skeleton className="h-10 w-full max-w-lg mx-auto" />
          <Card className="mt-8">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead><Skeleton className="h-5 w-24" /></TableHead>
                  <TableHead><Skeleton className="h-5 w-20" /></TableHead>
                  <TableHead><Skeleton className="h-5 w-16" /></TableHead>
                  <TableHead><Skeleton className="h-5 w-24" /></TableHead>
                  <TableHead className="text-right"><Skeleton className="h-5 w-16 ml-auto" /></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-28" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-9 w-20 ml-auto" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </MainLayout>
    );
  }
  if (!app) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-bold">App not found</h1>
          <p className="mt-4 text-muted-foreground">
            The app you are looking for does not exist.
          </p>
        </div>
      </MainLayout>
    );
  }
  return (
    <>
      <MainLayout>
        <div className="bg-secondary/50 dark:bg-secondary/20 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <img src={app.iconUrl} alt={`${app.name} icon`} className="w-32 h-32 rounded-3xl shadow-lg" />
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-display font-bold">{app.name}</h1>
                <p className="text-xl text-muted-foreground mt-2">{app.category}</p>
                <div className="flex items-center justify-center md:justify-start gap-4 mt-4">
                  <Badge variant="outline">EVM</Badge>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon"><Globe className="w-5 h-5" /></Button>
                    <Button variant="ghost" size="icon"><Twitter className="w-5 h-5" /></Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <Tabs defaultValue="products">
            <TabsList className="grid w-full grid-cols-4 max-w-lg mx-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-8">
              <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-2xl font-semibold mb-4">About {app.name}</h2>
                <p>{app.description}</p>
                <p>More details about the app's features and benefits will be displayed here, providing users with a comprehensive understanding of what they are purchasing.</p>
              </div>
            </TabsContent>
            <TabsContent value="products" className="mt-8">
              <Card className="overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Supply</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.length > 0 ? products.map((product) =>
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">
                          <p>{product.name}</p>
                          {product.benefits[0] && (
                            <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              {product.benefits[0]}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>{product.durationDays === -1 ? 'Lifetime' : `${product.durationDays} days`}</TableCell>
                        <TableCell>${product.price.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          {product.supply.cap === null ? 'Unlimited' : `${product.supply.remaining} / ${product.supply.cap}`}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" onClick={() => handleBuyClick(product)}>Buy Now</Button>
                        </TableCell>
                      </TableRow>
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          No products available for this app yet.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>
            <TabsContent value="activity" className="mt-8 text-center text-muted-foreground">
              <p>Activity feed coming soon.</p>
            </TabsContent>
            <TabsContent value="reviews" className="mt-8 text-center text-muted-foreground">
              <p>User reviews coming soon.</p>
            </TabsContent>
          </Tabs>
        </div>
      </MainLayout>
      {selectedProduct && app && (
        <ConfirmPurchaseDialog
          open={isConfirmOpen}
          onOpenChange={setConfirmOpen}
          product={selectedProduct}
          app={app}
          onPurchaseSuccess={() => {
            // Refetch products to show updated supply
            fetchAppAndProducts();
          }}
        />
      )}
    </>
  );
}