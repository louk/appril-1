import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { AppCard, AppCardProps } from "@/components/shared/AppCard";
import { Globe, Twitter } from "lucide-react";
import { api } from "@/lib/api-client";
import { Developer, App } from "@shared/types";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
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
export function DeveloperDetailPage() {
  const { id } = useParams();
  const [developer, setDeveloper] = useState<Developer | null>(null);
  const [apps, setApps] = useState<App[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [devData, appsData] = await Promise.all([
          api<Developer>(`/api/developers/${id}`),
          api<{ items: App[] }>(`/api/apps`),
        ]);
        setDeveloper(devData);
        setApps(appsData.items.filter(app => app.developerId === id));
      } catch (error) {
        toast.error("Failed to fetch developer details.", {
          description: error instanceof Error ? error.message : "An unknown error occurred.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);
  if (isLoading) {
    return (
      <MainLayout>
        <div className="bg-secondary/50 dark:bg-secondary/20 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <Skeleton className="w-32 h-32 rounded-full" />
              <div className="space-y-3 text-center md:text-left">
                <Skeleton className="h-12 w-72" />
                <Skeleton className="h-6 w-48" />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => <AppCardSkeleton key={i} />)}
          </div>
        </div>
      </MainLayout>
    );
  }
  if (!developer) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-bold">Developer not found</h1>
          <p className="mt-4 text-muted-foreground">The developer you are looking for does not exist.</p>
        </div>
      </MainLayout>
    );
  }
  const appCardProps = (app: App): AppCardProps => ({
    slug: app.slug,
    name: app.name,
    iconUrl: app.iconUrl,
    category: app.category,
    description: app.description,
    badges: app.badges,
    priceFrom: Math.random() * 20 + 5,
    duration: "mo",
  });
  return (
    <MainLayout>
      <div className="bg-secondary/50 dark:bg-secondary/20 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img src={developer.logoUrl} alt={`${developer.orgName} logo`} className="w-32 h-32 rounded-full shadow-lg" />
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-display font-bold">{developer.orgName}</h1>
              <p className="text-xl text-muted-foreground mt-2">{developer.country}</p>
              <div className="flex items-center justify-center md:justify-start gap-4 mt-4">
                <Button variant="ghost" size="icon" asChild><a href={developer.site} target="_blank" rel="noopener noreferrer"><Globe className="w-5 h-5" /></a></Button>
                <Button variant="ghost" size="icon"><Twitter className="w-5 h-5" /></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h2 className="text-3xl font-bold mb-8">Apps by {developer.orgName}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.length > 0 ? (
            apps.map((app) => <AppCard key={app.id} {...appCardProps(app)} />)
          ) : (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              <p>This developer hasn't published any apps yet.</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}