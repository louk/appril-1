import { MainLayout } from "@/components/layout/MainLayout";
import { AppCard, AppCardProps } from "@/components/shared/AppCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { api } from "@/lib/api-client";
import { App } from "@shared/types";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
const categories = ["Photo & Video", "Finance", "Developer Tools", "Music", "Health & Fitness", "Productivity", "Travel", "Lifestyle"];
const badges = ["New", "Trending", "On Sale", "Featured"];
function FiltersSidebar() {
  return (
    <aside className="w-full lg:w-72 lg:flex-shrink-0">
      <div className="sticky top-20 space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input placeholder="Search apps..." className="pl-10" />
        </div>
        <Accordion type="multiple" defaultValue={["category", "badges"]} className="w-full">
          <AccordionItem value="category">
            <AccordionTrigger className="text-base font-semibold">Category</AccordionTrigger>
            <AccordionContent className="space-y-2 pt-2">
              {categories.map(cat => (
                <div key={cat} className="flex items-center space-x-2">
                  <Checkbox id={`cat-${cat}`} />
                  <Label htmlFor={`cat-${cat}`} className="font-normal">{cat}</Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="badges">
            <AccordionTrigger className="text-base font-semibold">Badges</AccordionTrigger>
            <AccordionContent className="space-y-2 pt-2">
              {badges.map(badge => (
                <div key={badge} className="flex items-center space-x-2">
                  <Checkbox id={`badge-${badge}`} />
                  <Label htmlFor={`badge-${badge}`} className="font-normal">{badge}</Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </aside>
  );
}
function AppCardSkeleton() {
  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <CardHeader className="flex flex-row items-start gap-4 p-4">
        <Skeleton className="w-16 h-16 rounded-2xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </CardHeader>
      <CardContent className="flex-1 px-4 pb-4 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 bg-muted/30 dark:bg-muted/20">
        <div className="space-y-1">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-6 w-24" />
        </div>
        <Skeleton className="h-10 w-24" />
      </CardFooter>
    </Card>
  );
}
export function ExplorePage() {
  const [apps, setApps] = useState<App[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchApps = async () => {
      try {
        setIsLoading(true);
        const data = await api<{ items: App[] }>('/api/apps');
        setApps(data.items);
      } catch (error) {
        toast.error("Failed to fetch apps.", {
          description: error instanceof Error ? error.message : "An unknown error occurred.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchApps();
  }, []);
  const appCardProps = (app: App): AppCardProps => ({
    slug: app.slug,
    name: app.name,
    iconUrl: app.iconUrl,
    category: app.category,
    description: app.description,
    badges: app.badges,
    developerId: app.developerId,
    priceFrom: Math.random() * 20 + 5,
    duration: "mo",
  });
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold">Explore Apps</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the next generation of apps with ownable memberships.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 pb-16 md:pb-24">
          <FiltersSidebar />
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {isLoading ? (
                Array.from({ length: 9 }).map((_, i) => <AppCardSkeleton key={i} />)
              ) : apps.length > 0 ? (
                apps.map((app) => (
                  <AppCard key={app.id} {...appCardProps(app)} />
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  <p>No apps found. Check back later!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}