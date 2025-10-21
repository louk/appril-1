import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
export type AppCardBadge = "New" | "Trending" | "On Sale" | "Featured";
export interface AppCardProps {
  slug: string;
  iconUrl: string;
  name: string;
  category: string;
  description: string;
  priceFrom?: number;
  duration?: string;
  badges?: AppCardBadge[];
  developerId?: string;
}
export function AppCard({
  slug,
  iconUrl,
  name,
  category,
  description,
  priceFrom,
  duration,
  badges,
}: AppCardProps) {
  const badgeColors: Record<AppCardBadge, string> = {
    New: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
    Trending: "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300",
    "On Sale": "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
    Featured: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
  };
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="h-full flex flex-col overflow-hidden bg-white/30 dark:bg-black/30 backdrop-blur-lg border-white/20 dark:border-white/10 shadow-glass transition-shadow duration-300 hover:shadow-xl">
        <CardHeader className="flex flex-row items-start gap-4 p-4">
          <img src={iconUrl} alt={`${name} icon`} className="w-16 h-16 rounded-2xl" />
          <div className="flex-1">
            <h3 className="text-lg font-bold">{name}</h3>
            <p className="text-sm text-muted-foreground">{category}</p>
            {badges && badges.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {badges.map((badge) => (
                  <Badge key={badge} variant="outline" className={cn("text-xs font-medium border-none", badgeColors[badge])}>
                    {badge}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex-1 px-4 pb-4">
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-4 bg-muted/30 dark:bg-muted/20">
          <div>
            {priceFrom !== undefined && (
              <>
                <p className="text-xs text-muted-foreground">From</p>
                <p className="font-bold text-lg">
                  ${priceFrom.toFixed(2)}
                  {duration && <span className="text-sm font-normal text-muted-foreground">/{duration}</span>}
                </p>
              </>
            )}
          </div>
          <Button asChild>
            <Link to={`/app/${slug}`}>View App</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}