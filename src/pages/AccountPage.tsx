import { MainLayout } from "@/components/layout/MainLayout";
import { NavLink, Outlet, Navigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import { User, ShoppingCart, History } from "lucide-react";
const accountNavLinks = [
  { name: "Profile", href: "/account/profile", icon: User },
  { name: "My Purchases", href: "/account/purchases", icon: ShoppingCart },
  { name: "Payment History", href: "/account/history", icon: History },
];
export function AccountPage() {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          <aside className="w-full md:w-64 flex-shrink-0">
            <h2 className="text-2xl font-bold mb-4">My Account</h2>
            <nav className="flex flex-col space-y-1">
              {accountNavLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                      isActive && "bg-accent text-primary font-medium"
                    )
                  }
                >
                  <link.icon className="h-4 w-4" />
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </aside>
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </MainLayout>
  );
}