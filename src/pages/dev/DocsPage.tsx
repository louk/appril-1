import { NavLink, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Code, BookOpen } from "lucide-react";
const docsNavLinks = [
  { name: "API Reference", href: "/dev/docs/api", icon: Code },
  { name: "Guides", href: "/dev/docs/guides", icon: BookOpen },
];
export function DocsPage() {
  return (
    <div className="flex-1 grid grid-cols-1 md:grid-cols-[220px_1fr] lg:grid-cols-[250px_1fr] gap-8">
      <aside className="w-full md:w-auto">
        <div className="sticky top-24">
          <h2 className="text-lg font-semibold mb-4 px-3">Documentation</h2>
          <nav className="flex flex-col space-y-1">
            {docsNavLinks.map((link) => (
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
        </div>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
}