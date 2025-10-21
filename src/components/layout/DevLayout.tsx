import React from 'react';
import { Link, NavLink, Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth-store';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  Boxes,
  Users,
  Book,
  Settings,
  Menu,
  X,
  User,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Toaster } from '@/components/ui/sonner';
const devNavLinks = [
  { name: 'Dashboard', href: '/dev/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/dev/projects', icon: Package },
  { name: 'Products', href: '/dev/products', icon: Boxes },
  { name: 'Teams', href: '/dev/teams', icon: Users },
  { name: 'Docs', href: '/dev/docs', icon: Book },
  { name: 'Account', href: '/dev/account', icon: Settings },
];
const ApprilLogo = () => (
  <Link to="/" className="flex items-center space-x-2">
    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))]"></div>
    <span className="text-2xl font-display font-bold">Appril</span>
  </Link>
);
function SidebarNav() {
  return (
    <nav className="flex flex-col space-y-1">
      {devNavLinks.map((link) => (
        <NavLink
          key={link.name}
          to={link.href}
          end={link.href === '/dev/dashboard'}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
              isActive && 'bg-accent text-primary font-medium'
            )
          }
        >
          <link.icon className="h-4 w-4" />
          {link.name}
        </NavLink>
      ))}
    </nav>
  );
}
export function DevLayout() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <aside className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <ApprilLogo />
          </div>
          <div className="flex-1">
            <div className="py-4 px-2 lg:px-4">
              <SidebarNav />
            </div>
          </div>
        </div>
      </aside>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 -mx-6">
                 <ApprilLogo />
              </div>
              <div className="mt-4">
                <SidebarNav />
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            {/* Can add breadcrumbs or search here later */}
          </div>
          <ThemeToggle className="relative" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link to="/account/profile"><User className="mr-2 h-4 w-4" />User Portal</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link to="/dev/account"><Settings className="mr-2 h-4 w-4" />Settings</Link></DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}><LogOut className="mr-2 h-4 w-4" />Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
          <Outlet />
        </main>
      </div>
      <Toaster richColors />
    </div>
  );
}