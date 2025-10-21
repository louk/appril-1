import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuthStore } from "@/stores/auth-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const ApprilLogo = () => (
  <Link to="/" className="flex items-center space-x-2">
    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))]"></div>
    <span className="text-2xl font-display font-bold">Appril</span>
  </Link>
);
const navLinks = [
  { name: "Store", href: "/" },
  { name: "Explore", href: "/explore" },
  { name: "Market", href: "/market" },
  { name: "Developers", href: "/developers" },
];
function AuthNav() {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  const user = useAuthStore(s => s.user);
  const logout = useAuthStore(s => s.logout);
  if (isAuthenticated && user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/account/profile"><User className="mr-2 h-4 w-4" /><span>Account</span></Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/dev/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" /><span>Developer</span></Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  return (
    <div className="hidden md:flex items-center gap-2">
      <Button variant="ghost" asChild><Link to="/login">Log In</Link></Button>
      <Button asChild><Link to="/signup">Sign Up</Link></Button>
    </div>
  );
}
export function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  const logout = useAuthStore(s => s.logout);
  const NavItems = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      {navLinks.map((link) => (
        <NavLink
          key={link.name}
          to={link.href}
          onClick={() => isMobile && setMenuOpen(false)}
          className={({ isActive }) =>
            cn(
              "transition-colors hover:text-primary",
              isMobile ? "block py-2 text-lg" : "text-sm font-medium",
              isActive ? "text-primary" : "text-muted-foreground"
            )
          }
        >
          {link.name}
        </NavLink>
      ))}
    </>
  );
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <ApprilLogo />
            <nav className="hidden md:flex items-center gap-6">
              <NavItems />
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle className="relative" />
            <AuthNav />
            <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-sm">
                <div className="flex justify-between items-center p-4 border-b">
                  <ApprilLogo />
                  <Button variant="ghost" size="icon" onClick={() => setMenuOpen(false)}>
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <nav className="flex flex-col space-y-4 p-4">
                  <NavItems isMobile />
                </nav>
                <div className="p-4 border-t space-y-2">
                  {isAuthenticated ? (
                    <>
                      <Button className="w-full" asChild onClick={() => setMenuOpen(false)}><Link to="/account/profile">My Account</Link></Button>
                      <Button variant="outline" className="w-full" onClick={() => { logout(); setMenuOpen(false); }}>Log Out</Button>
                    </>
                  ) : (
                    <>
                      <Button className="w-full" asChild onClick={() => setMenuOpen(false)}><Link to="/signup">Sign Up</Link></Button>
                      <Button variant="outline" className="w-full" asChild onClick={() => setMenuOpen(false)}><Link to="/login">Log In</Link></Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}