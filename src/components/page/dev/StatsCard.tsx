import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as LucideIcons from "lucide-react";
type IconName = keyof typeof LucideIcons;
interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: IconName;
}
export function StatsCard({ title, value, change, icon }: StatsCardProps) {
  const IconComponent = LucideIcons[icon] as React.ElementType;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {IconComponent && <IconComponent className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{change}</p>
      </CardContent>
    </Card>
  );
}