import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin } from "lucide-react";
const ApprilLogo = () => (
  <div className="flex items-center space-x-2">
    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))]"></div>
    <span className="text-2xl font-display font-bold">Appril</span>
  </div>
);
export function Footer() {
  const userLinks = [
    { name: "Explore Apps", href: "/explore" },
    { name: "Secondary Market", href: "/market" },
    { name: "For Developers", href: "/developers" },
  ];
  const companyLinks = [
    { name: "Blog", href: "/company/blog" },
    { name: "Jobs", href: "/company/jobs" },
    { name: "Team", href: "/company/team" },
    { name: "Contact", href: "/company/contact" },
  ];
  const legalLinks = [
    { name: "Terms of Service", href: "/company/terms" },
    { name: "Privacy Policy", href: "/company/privacy" },
  ];
  const socialLinks = [
    { icon: Twitter, href: "#" },
    { icon: Github, href: "#" },
    { icon: Linkedin, href: "#" },
  ];
  return (
    <footer className="bg-secondary/50 dark:bg-secondary/20 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="md:col-span-4 lg:col-span-2 space-y-4">
            <ApprilLogo />
            <p className="text-muted-foreground max-w-xs">
              In-App Purchases meet Web3. Own your app memberships.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a key={index} href={social.href} className="text-muted-foreground hover:text-foreground transition-colors">
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">User Portal</h4>
            <ul className="space-y-2">
              {userLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Appril Inc. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Built with ❤️ at Cloudflare</p>
        </div>
      </div>
    </footer>
  );
}