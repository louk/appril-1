import { useEffect, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";
import { Listing } from "@shared/types";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
const chains = ["EVM", "Solana", "Flow"];
function FiltersSidebar() {
  return (
    <aside className="w-full lg:w-72 lg:flex-shrink-0">
      <div className="sticky top-20 space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input placeholder="Search by app or product..." className="pl-10" />
        </div>
        <Accordion type="multiple" defaultValue={["chain"]} className="w-full">
          <AccordionItem value="chain">
            <AccordionTrigger className="text-base font-semibold">Chain</AccordionTrigger>
            <AccordionContent className="space-y-2 pt-2">
              {chains.map(chain => (
                <div key={chain} className="flex items-center space-x-2">
                  <Checkbox id={`chain-${chain}`} />
                  <Label htmlFor={`chain-${chain}`} className="font-normal">{chain}</Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </aside>
  );
}
function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="flex flex-row items-start gap-4 p-4">
        <img src={listing.appIconUrl} alt={`${listing.appName} icon`} className="w-16 h-16 rounded-2xl" />
        <div className="flex-1">
          <h3 className="text-lg font-bold">{listing.appName}</h3>
          <p className="text-sm text-primary">{listing.productName}</p>
          <p className="text-xs text-muted-foreground mt-1">Token ID: #{listing.tokenId}</p>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 text-sm text-muted-foreground">
        <p>Time remaining: {listing.expiresAt ? formatDistanceToNow(new Date(listing.expiresAt)) : 'Lifetime'}</p>
        <p>Seller: {listing.seller.slice(0, 6)}...{listing.seller.slice(-4)}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 bg-muted/30 dark:bg-muted/20">
        <p className="font-bold text-lg">${listing.price.amount.toFixed(2)} <span className="text-sm font-normal">{listing.price.currency}</span></p>
        <Button>Buy Now</Button>
      </CardFooter>
    </Card>
  );
}
function ListingCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start gap-4 p-4">
        <Skeleton className="w-16 h-16 rounded-2xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 bg-muted/30 dark:bg-muted/20">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-10 w-24" />
      </CardFooter>
    </Card>
  );
}
export function SecondaryMarketPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchListings = async () => {
      try {
        setIsLoading(true);
        const data = await api<Listing[]>('/api/market/listings');
        setListings(data);
      } catch (error) {
        toast.error("Failed to fetch market listings.", {
          description: error instanceof Error ? error.message : "An unknown error occurred.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchListings();
  }, []);
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold">Secondary Market</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Buy and sell app memberships from other users.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 pb-16 md:pb-24">
          <FiltersSidebar />
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => <ListingCardSkeleton key={i} />)
              ) : listings.length > 0 ? (
                listings.map((listing) => <ListingCard key={listing.id} listing={listing} />)
              ) : (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  <p>No listings found on the market right now.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}