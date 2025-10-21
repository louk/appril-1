import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
const guides = [
  {
    title: "Integrate Your Paywall",
    description: "Learn how to token-gate features in your app using our SDKs.",
    href: "#",
  },
  {
    title: "Handle Renewals & Expirations",
    description: "Best practices for managing subscription lifecycles.",
    href: "#",
  },
  {
    title: "Verify In-App Access",
    description: "A step-by-step guide to verifying NFT ownership on your server.",
    href: "#",
  },
  {
    title: "Setting Up Webhooks",
    description: "Receive real-time notifications for purchases, transfers, and more.",
    href: "#",
  },
];
export function GuidesDocs() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-display font-bold">Developer Guides</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Step-by-step tutorials to help you get started with Appril.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guides.map((guide) => (
          <Link to={guide.href} key={guide.title} className="block group">
            <Card className="h-full transition-all duration-300 group-hover:border-primary group-hover:shadow-lg group-hover:-translate-y-1">
              <CardHeader>
                <CardTitle>{guide.title}</CardTitle>
                <CardDescription>{guide.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-primary font-medium">
                  Read guide
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}