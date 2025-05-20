
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import SearchForm, { SearchParams } from "@/components/SearchForm";
import ProductGrid from "@/components/ProductGrid";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  
  // Función que maneja la búsqueda
  const handleSearch = (params: SearchParams) => {
    console.log("Búsqueda con parámetros:", params);
    setIsLoading(true);
    
    // Simulación de carga
    setTimeout(() => {
      setIsLoading(false);
      setIsSearched(true);
      // Aquí se implementará la lógica real de búsqueda con API
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/20 dark:from-background dark:to-muted/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400 animate-[pulse_3s_ease-in-out_infinite]">
                Encuentra el mejor producto tecnológico al mejor precio
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Compara precios y características en Amazon, Mercado Libre y más plataformas en un solo lugar
            </p>
          </div>
          
          <SearchForm onSearch={handleSearch} className="max-w-3xl mx-auto" />
          
          {isLoading && (
            <div className="mt-12 flex justify-center">
              <LoadingSpinner size="lg" />
            </div>
          )}
          
          {isSearched && !isLoading && (
            <div className="mt-12 animate-fade-in">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Resultados</h2>
                <Button asChild variant="outline">
                  <Link to="/productos">
                    Ver todos los productos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <ProductGrid />
            </div>
          )}
        </div>
      </section>

      {!isSearched && (
        <section className="py-16 bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Categorías Populares</h2>
              <p className="text-muted-foreground">Explora productos por categoría</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Celulares", path: "/categoria/celulares", image: "https://placehold.co/400x200/333/FFF?text=Celulares" },
                { name: "Tablets", path: "/categoria/tablets", image: "https://placehold.co/400x200/333/FFF?text=Tablets" },
                { name: "Computadoras", path: "/categoria/computadoras", image: "https://placehold.co/400x200/333/FFF?text=Computadoras" },
                { name: "Audífonos", path: "/categoria/audifonos", image: "https://placehold.co/400x200/333/FFF?text=Audífonos" },
              ].map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className="group overflow-hidden rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="aspect-[2/1] overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-medium">{category.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      
      <footer className="bg-muted/30 py-10">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Link to="/" className="flex items-center gap-2 font-semibold">
                <span className="text-xl font-bold">TechRank</span>
              </Link>
              <span className="text-sm text-muted-foreground">© 2024 TechRank. Todos los derechos reservados.</span>
            </div>
            
            <div className="flex gap-6">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">Acerca de</Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacidad</Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">Términos</Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contacto</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
