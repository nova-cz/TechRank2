
import { useState } from "react";
import Header from "@/components/Header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function RankingPage() {
  const [category, setCategory] = useState("smartphones");

  // Datos de ejemplo para los rankings
  const rankingData = {
    smartphones: [
      { rank: 1, name: "iPhone 14 Pro Max", price: 24999, score: 9.8, platform: "Amazon", url: "#", image: "https://placehold.co/400x400/333/FFF?text=iPhone" },
      { rank: 2, name: "Samsung Galaxy S23 Ultra", price: 22500, score: 9.6, platform: "Mercado Libre", url: "#", image: "https://placehold.co/400x400/333/FFF?text=Samsung" },
      { rank: 3, name: "Google Pixel 7 Pro", price: 18999, score: 9.4, platform: "Amazon", url: "#", image: "https://placehold.co/400x400/333/FFF?text=Pixel" },
      { rank: 4, name: "Xiaomi 13 Pro", price: 16500, score: 9.2, platform: "Mercado Libre", url: "#", image: "https://placehold.co/400x400/333/FFF?text=Xiaomi" },
      { rank: 5, name: "OnePlus 11", price: 14999, score: 9.1, platform: "Amazon", url: "#", image: "https://placehold.co/400x400/333/FFF?text=OnePlus" },
    ],
    tablets: [
      { rank: 1, name: "iPad Pro 12.9\"", price: 25999, score: 9.7, platform: "Amazon", url: "#", image: "https://placehold.co/400x400/333/FFF?text=iPad" },
      { rank: 2, name: "Samsung Galaxy Tab S9 Ultra", price: 24500, score: 9.5, platform: "Mercado Libre", url: "#", image: "https://placehold.co/400x400/333/FFF?text=Galaxy+Tab" },
      { rank: 3, name: "Microsoft Surface Pro 9", price: 23999, score: 9.3, platform: "Amazon", url: "#", image: "https://placehold.co/400x400/333/FFF?text=Surface" },
      { rank: 4, name: "Lenovo Tab P12 Pro", price: 15500, score: 9.0, platform: "Mercado Libre", url: "#", image: "https://placehold.co/400x400/333/FFF?text=Lenovo" },
      { rank: 5, name: "Xiaomi Pad 6", price: 8999, score: 8.9, platform: "Amazon", url: "#", image: "https://placehold.co/400x400/333/FFF?text=Xiaomi" },
    ],
    laptops: [
      { rank: 1, name: "MacBook Pro 16\" M2 Max", price: 49999, score: 9.9, platform: "Amazon", url: "#", image: "https://placehold.co/400x400/333/FFF?text=MacBook" },
      { rank: 2, name: "Dell XPS 15", price: 35500, score: 9.7, platform: "Mercado Libre", url: "#", image: "https://placehold.co/400x400/333/FFF?text=Dell" },
      { rank: 3, name: "Lenovo ThinkPad X1 Carbon", price: 32999, score: 9.5, platform: "Amazon", url: "#", image: "https://placehold.co/400x400/333/FFF?text=ThinkPad" },
      { rank: 4, name: "ASUS ROG Zephyrus G15", price: 29500, score: 9.4, platform: "Mercado Libre", url: "#", image: "https://placehold.co/400x400/333/FFF?text=ASUS" },
      { rank: 5, name: "HP Spectre x360", price: 27999, score: 9.2, platform: "Amazon", url: "#", image: "https://placehold.co/400x400/333/FFF?text=HP" },
    ],
  };

  // Mapeos de categorías para la UI
  const categoryMap = {
    smartphones: "Celulares",
    tablets: "Tablets",
    laptops: "Computadoras",
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
            <TabsTrigger value="laptops">Computadoras</TabsTrigger>
          </TabsList>
          
          {Object.entries(rankingData).map(([key, products]) => (
            <TabsContent key={key} value={key}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
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
          ))}
        </Tabs>
      </main>
    </div>
  );
}
