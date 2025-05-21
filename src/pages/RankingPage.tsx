import { useState } from "react";
import Header from "@/components/Header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { productos } from "@/data/productos";

export default function RankingPage() {
  const [category, setCategory] = useState("smartphones");

  const categoryKeys = {
    smartphones: "celulares",
    tablets: "tablets",
    laptops: "laptops",
  };

  // Obtener el top 5 productos por categoría según rating
  const getTopProducts = (categoria: string) => {
    return productos
      .filter((p) => p.category === categoria)
      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
      .slice(0, 5)
      .map((p, index) => ({
        rank: index + 1,
        name: p.name,
        price: p.price,
        score: (p.rating ?? 0).toFixed(1),
        platform: p.platform,
        url: p.url,
        image: `/${p.image}`, // ✅ Ajuste aquí para coincidir con tu estructura
      }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-10">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Ranking de Productos
          </h1>
          <p className="text-lg text-center text-muted-foreground">
            Los mejores productos tecnológicos según precio, calidad y popularidad.
          </p>
        </div>
        
        <Tabs 
          defaultValue="smartphones" 
          value={category} 
          onValueChange={setCategory}
          className="max-w-6xl mx-auto"
        >
          <TabsList className="grid grid-cols-1 md:grid-cols-3 mb-8 w-full">
            <TabsTrigger value="smartphones">Celulares</TabsTrigger>
            <TabsTrigger value="tablets">Tablets</TabsTrigger>
            <TabsTrigger value="laptops">Laptops</TabsTrigger>
          </TabsList>

          {Object.entries(categoryKeys).map(([key, categoria]) => {
            const topProducts = getTopProducts(categoria);

            return (
              <TabsContent key={key} value={key}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {topProducts.map((product) => (
                    <Card key={product.rank} className="overflow-hidden hover:shadow-md transition-all border-border/40">
                      <div className="relative">
                        <AspectRatio ratio={1 / 1}>
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </AspectRatio>
                        <div className="absolute top-3 left-3 flex items-center justify-center h-8 w-8 rounded-full bg-tech-blue text-white font-bold">
                          {product.rank}
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="bg-background/50">
                            {product.platform}
                          </Badge>
                          <span className="text-sm font-medium">
                            Puntuación: {product.score}/10
                          </span>
                        </div>
                        
                        <h3 className="font-medium text-lg mb-2 line-clamp-2">{product.name}</h3>
                        <p className="text-xl font-bold mb-4">${product.price.toLocaleString()}</p>
                        
                        <Button asChild variant="outline" className="w-full">
                          <a 
                            href={product.url}
                            className="flex items-center justify-center gap-2"
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            Ver producto <ArrowUpRight className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </main>
    </div>
  );
}
