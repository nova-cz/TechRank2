import { Link } from "react-router-dom";
import { ShoppingBag, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle"; // named import correcto
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const isLoggedIn = false;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        {/* Logo a la izquierda */}
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <ShoppingBag className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">TechRank</span>
        </Link>

        {/* Navegación a la derecha */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1 py-1 px-2">
                  Categorías
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 bg-background/95 backdrop-blur border-white/10"
              >
                <DropdownMenuItem asChild>
                  <Link to="/categoria/celulares" className="cursor-pointer">
                    Celulares
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/categoria/tablets" className="cursor-pointer">
                    Tablets
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/categoria/computadoras" className="cursor-pointer">
                    Computadoras
                  </Link>
                  
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
          <Link
              to="/ranking"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Ranking
            </Link>
          {/* Botón de inicio de sesión / registro */}
          {/* Modo oscuro / claro */}
          <ThemeToggle />
        </div>
        
      </div>
    </header>
  );
}
