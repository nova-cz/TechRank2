
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import SearchForm, { SearchParams } from "@/components/SearchForm";
import ProductGrid from "@/components/ProductGrid";
import LoadingSpinner from "@/components/LoadingSpinner";
import { toast } from "@/components/ui/use-toast";

// Sample products data
const sampleProducts = [
  {
    id: "1",
    title: "Xiaomi Smartphone M5s 6.43\" 256GB/8GB Cámara 64MP",
    price: 2299,
    image: "https://placehold.co/400x400/333/FFF?text=Celular1",
    platform: "Amazon",
    url: "https://www.amazon.com.mx",
    rating: 4.5
  },
  {
    id: "2",
    title: "Samsung Galaxy S23 Ultra 256GB",
    price: 19999,
    image: "https://placehold.co/400x400/333/FFF?text=Celular2",
    platform: "Mercado Libre",
    url: "https://www.mercadolibre.com.mx",
    rating: 4.8
  },
  {
    id: "3",
    title: "Apple MacBook Pro 13\" M2",
    price: 29999,
    image: "https://placehold.co/400x400/333/FFF?text=Laptop1",
    platform: "Amazon",
    url: "https://www.amazon.com.mx",
    rating: 4.9
  },
  {
    id: "4",
    title: "Lenovo Legion 5 Pro Gaming Laptop",
    price: 25999,
    image: "https://placehold.co/400x400/333/FFF?text=Laptop2",
    platform: "Liverpool",
    url: "https://www.liverpool.com.mx",
    rating: 4.3
  },
  {
    id: "5",
    title: "iPad Pro 11\" 256GB WiFi",
    price: 18990,
    image: "https://placehold.co/400x400/333/FFF?text=Tablet1",
    platform: "Apple Store",
    url: "https://www.apple.com/mx",
    rating: 4.7
  },
  {
    id: "6",
    title: "Samsung Galaxy Tab S8 128GB",
    price: 12999,
    image: "https://placehold.co/400x400/333/FFF?text=Tablet2",
    platform: "Samsung",
    url: "https://www.samsung.com/mx",
    rating: 4.4
  },
];

export default function ProductsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(sampleProducts);
  
  // Función que maneja la búsqueda
  const handleSearch = (params: SearchParams) => {
    console.log("Búsqueda con parámetros:", params);
    setIsLoading(true);
    
    // Simulación de carga y filtrado
    setTimeout(() => {
      const filtered = sampleProducts.filter(product => {
        // Filtro estricto por precio
        const meetsPrice = product.price >= params.minPrice && product.price <= params.maxPrice;
        
        // Filtro por categoría
        let meetsCategory = true;
        if (params.category) {
          // Simple categorization based on product title
          if (params.category === "celulares" && !product.title.toLowerCase().includes("smartphone") && 
              !product.title.toLowerCase().includes("galaxy") && !product.title.toLowerCase().includes("iphone")) {
            meetsCategory = false;
          } else if (params.category === "computadoras" && !product.title.toLowerCase().includes("laptop") && 
                    !product.title.toLowerCase().includes("macbook") && !product.title.toLowerCase().includes("legion")) {
            meetsCategory = false;
          } else if (params.category === "tablets" && !product.title.toLowerCase().includes("ipad") && 
                    !product.title.toLowerCase().includes("tab")) {
            meetsCategory = false;
          }
        }
        
        return meetsPrice && meetsCategory;
      });
      
      setFilteredProducts(filtered);
      setIsLoading(false);
      
      toast({
        title: "Búsqueda completada",
        description: `Se encontraron ${filtered.length} productos`,
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-10">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Todos los Productos
          </h1>
          <p className="text-lg text-center text-muted-foreground">
            Encuentra y compara productos tecnológicos de diversas plataformas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          <div>
            <SearchForm onSearch={handleSearch} className="sticky top-20" />
          </div>
          
          <div>
            {isLoading ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <LoadingSpinner size="lg" />
              </div>
            ) : (
              <ProductGrid products={filteredProducts} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
