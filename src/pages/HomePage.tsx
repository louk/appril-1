import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { HowItWorks } from "@/components/page/home/HowItWorks";
import { AppCard, AppCardProps } from "@/components/shared/AppCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { api } from "@/lib/api-client";
import { toast } from "sonner";
import { App } from "@shared/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-transparent dark:from-purple-900/20 dark:via-blue-900/20"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-24 md:py-32 lg:py-40 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-foreground"
          >
            Own your app membership.
            <br />
            <span className="text-gradient">Pay once, keep the perks.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            NFT memberships & subscriptions that work with your favorite iOS & Android apps. Buy, use, and resell your access freely.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex justify-center gap-4"
          >
            <Button size="lg" asChild>
              <Link to="/explore">Explore Apps</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/developers">List Your App</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
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
function AppCarousel({ title, apps, isLoading }: { title: string; apps: AppCardProps[]; isLoading: boolean }) {
  if (!isLoading && apps.length === 0) {
    return null; // Don't render the carousel if there are no apps for this category
  }
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">{title}</h2>
        <Carousel opts={{ align: "start", loop: true }}>
          <CarouselContent className="-ml-4">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <CarouselItem key={i} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <AppCardSkeleton />
                </CarouselItem>
              ))
            ) : (
              apps.map((app) => (
                <CarouselItem key={app.slug} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <AppCard {...app} />
                </CarouselItem>
              ))
            )}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}
export function HomePage() {
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
    // Mock price for now as it's not on the App model
    priceFrom: Math.random() * 20 + 5,
    duration: "mo",
  });
  const featuredApps = apps.filter(a => a.badges?.includes("Featured")).map(appCardProps);
  const newApps = apps.filter(a => a.badges?.includes("New")).map(appCardProps);
  const trendingApps = apps.filter(a => a.badges?.includes("Trending")).map(appCardProps);
  return (
    <MainLayout>
      <HeroSection />
      <HowItWorks />
      <AppCarousel title="Featured Apps" apps={featuredApps} isLoading={isLoading} />
      <AppCarousel title="New on Appril" apps={newApps} isLoading={isLoading} />
      <AppCarousel title="Trending" apps={trendingApps} isLoading={isLoading} />
    </MainLayout>
  );
}