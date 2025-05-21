import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import SearchForm, { SearchParams } from "@/components/SearchForm";
import ProductGrid from "@/components/ProductGrid";
import LoadingSpinner from "@/components/LoadingSpinner";
import { productos } from "@/data/productos";

export default function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = (params: SearchParams) => {
    console.log("Búsqueda con parámetros:", params);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSearched(true);

      const filtered = productos.filter((producto) => {
        const matchCategory = params.category
          ? producto.category.toLowerCase() === params.category.toLowerCase()
          : true;

        const price = Number(producto.price);
        const min = params.precioMin ? Number(params.precioMin) : null;
        const max = params.precioMax ? Number(params.precioMax) : null;

        const matchMin = min !== null ? price >= min : true;
        const matchMax = max !== null ? price <= max : true;

        return matchCategory && matchMin && matchMax;
      });

      setResults(filtered);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/20 dark:from-background dark:to-muted/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 animate-breathe">
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
              <ProductGrid products={results} />
            </div>
          )}
        </div>
      </section>

      {!isSearched && (
        <section className="py-16 bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Categorías</h2>
              <p className="text-muted-foreground">Explora productos por categoría</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { name: "Celulares", path: "/categoria/celulares", image: "https://placehold.co/400x200/2f64b8/FFF?text=Celulares" },
                { name: "Tablets", path: "/categoria/tablets", image: "https://placehold.co/400x200/2f64b8/FFF?text=Tablets" },
                { name: "Computadoras", path: "/categoria/computadoras", image: "https://placehold.co/400x200/2f64b8/FFF?text=Computadoras" },
              ].map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className="group overflow-hidden rounded-xl shadow-md bg-[#458bf7] hover:bg-[#244e8f] transition-colors duration-300"
                >
                  <div className="aspect-[2/1] flex items-center justify-center text-white text-2xl font-semibold">
                    {category.name}
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
            <Link to="/" className="flex items-center gap-2 font-semibold mb-4 md:mb-0">
              <span className="text-xl font-bold">TechRank</span>
            </Link>
            <span className="text-sm text-muted-foreground text-right md:text-left">
              © 2024 TechRank. Todos los derechos reservados.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
