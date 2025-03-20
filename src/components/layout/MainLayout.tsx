import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../common/ModeToggle";
import { Menu, X, Home, Palette, Image } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useMobile();

  const navItems = [
    { path: "/", label: "Home", icon: <Home className="mr-2 h-4 w-4" /> },
    {
      path: "/design",
      label: "Design Room",
      icon: <Palette className="mr-2 h-4 w-4" />,
    },
    {
      path: "/gallery",
      label: "Gallery",
      icon: <Image className="mr-2 h-4 w-4" />,
    },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold">HomeDesign</span>
              <span className="ml-1 text-primary">AI</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center text-sm font-medium transition-colors hover:text-primary",
                    location.pathname === item.path
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>
          )}

          <div className="flex items-center gap-2">
            <ModeToggle />
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobile && isMenuOpen && (
          <div className="container pb-3">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
                    location.pathname === item.path
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} HomeDesign AI. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Terms
            </Link>
            <Link
              to="/contact"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
