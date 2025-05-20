
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { ArrowDownIcon } from "lucide-react";

export default function CelularesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  
  const categoryTitle = "Celulares";

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call to get products for this category
    setTimeout(() => {
      // Generate dummy products for the selected category
      const dummyProducts = Array.from({ length: 8 }, (_, i) => ({
        id: `celulares-${i + 1}`,
        title: `${categoryTitle} Premium ${i + 1}`,
        price: Math.floor(Math.random() * 40000) + 5000,
        image: `https://placehold.co/400x400/333/FFF?text=Celular${i+1}`,
        platform: i % 2 === 0 ? "Amazon" : "Mercado Libre",
        url: "#",
        rating: (Math.random() * 1.5 + 3.5).toFixed(1)
      }));
      
      setProducts(dummyProducts);
      setIsLoading(false);
    }, 1000);
  }, []);

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
        ) : (
          <div className="space-y-10">
            <ProductGrid products={products} />
            
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
