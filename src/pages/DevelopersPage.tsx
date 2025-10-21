import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/lib/api-client";
import { Developer } from "@shared/types";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
function DeveloperCardSkeleton() {
  return (
    <Card>
      <CardHeader className="items-center text-center">
        <Skeleton className="w-24 h-24 rounded-full mb-4" />
        <Skeleton className="h-6 w-40" />
      </CardHeader>
      <CardContent className="text-center space-y-2">
        <Skeleton className="h-4 w-24 mx-auto" />
        <Skeleton className="h-4 w-32 mx-auto" />
      </CardContent>
    </Card>
  );
}
export function DevelopersPage() {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        setIsLoading(true);
        const data = await api<{ items: Developer[] }>('/api/developers');
        setDevelopers(data.items);
      } catch (error) {
        toast.error("Failed to fetch developers.", {
          description: error instanceof Error ? error.message : "An unknown error occurred.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchDevelopers();
  }, []);
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold">
            For Developers
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Turn your users into owners. Launch tokenized memberships in minutes with our powerful and simple APIs.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg">Become a Developer</Button>
            <Button size="lg" variant="outline">
              View API Docs
            </Button>
          </div>
        </div>
        <div className="pb-16 md:pb-24">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Developers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading ? (
              Array.from({ length: 8 }).map((_, i) => <DeveloperCardSkeleton key={i} />)
            ) : developers.length > 0 ? (
              developers.map((dev) => (
                <Link to={`/developers/${dev.id}`} key={dev.id} className="block group">
                  <Card className="h-full transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                    <CardHeader className="items-center text-center">
                      <img src={dev.logoUrl} alt={`${dev.orgName} logo`} className="w-24 h-24 rounded-full mb-4" />
                      <h3 className="text-xl font-bold">{dev.orgName}</h3>
                    </CardHeader>
                    <CardContent className="text-center text-sm text-muted-foreground">
                      <div className="flex justify-center items-center gap-2">
                        <Globe className="w-4 h-4" />
                        <span>{dev.country}</span>
                      </div>
                      <p className="mt-2">{dev.appCount} apps on Appril</p>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                <p>No developers found. Be the first!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}