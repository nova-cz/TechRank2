import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { ArrowDownIcon } from "lucide-react";
import { productos } from "@/data/productos";

// Títulos bonitos para mostrar en pantalla
const categoryTitles: Record<string, string> = {
  celulares: "Celulares",
  tablets: "Tablets",
  computadoras: "Computadoras",
  laptops: "Computadoras",
};

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Mostrar un título legible
  const categoryTitle =
    categoryId && categoryTitles[categoryId]
      ? categoryTitles[categoryId]
      : "Categoría";

  useEffect(() => {
    setIsLoading(true);

    // Mapa de categorías visibles (URL) a internas (data)
    const internalCategoryMap: Record<string, string> = {
      celulares: "celulares",
      tablets: "tablets",
      computadoras: "laptops", // Traducir "computadoras" a "laptops"
      laptops: "laptops",
    };

    const actualCategory = categoryId && internalCategoryMap[categoryId];

    const productosFiltrados = productos
      .filter((p) => p.category === actualCategory)
      .map((p) => ({
        ...p,
        image: `/${p.image}`, // Asegura la ruta pública
      }));

    setFilteredProducts(productosFiltrados);
    setIsLoading(false);
  }, [categoryId]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-12">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4">{categoryTitle}</h1>
          <p className="text-lg text-muted-foreground">
            Los mejores {categoryTitle.toLowerCase()} al mejor precio
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <LoadingSpinner size="lg" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-muted-foreground text-lg">
            No se encontraron productos en esta categoría.
          </p>
        ) : (
          <div className="space-y-10">
            <ProductGrid products={filteredProducts} />

            <div className="flex justify-center">
              <Button variant="outline" className="gap-2">
                Cargar más
                <ArrowDownIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
