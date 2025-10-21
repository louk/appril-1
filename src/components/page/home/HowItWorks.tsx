import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, ShoppingCart, AppWindow, Repeat } from "lucide-react";
const steps = [
  {
    icon: Wallet,
    title: "Connect & Sign Up",
    description: "Connect your wallet or sign up with your email to get started in seconds.",
  },
  {
    icon: AppWindow,
    title: "Choose an App",
    description: "Browse our curated store of apps and find a membership or subscription that fits you.",
  },
  {
    icon: ShoppingCart,
    title: "Purchase Securely",
    description: "Buy your NFT-based access using crypto or your credit card through our secure checkout.",
  },
  {
    icon: Repeat,
    title: "Manage or Resell",
    description: "Use your membership in-app, extend it, or sell it on our secondary market anytime.",
  },
];
export function HowItWorks() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-secondary/50 dark:bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold">
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            A simple, four-step process to own your digital app access.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center bg-card/50 dark:bg-card/70 border-border/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] flex items-center justify-center text-primary-foreground mb-4">
                  <step.icon className="w-8 h-8" />
                </div>
                <CardTitle className="text-xl font-semibold">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}