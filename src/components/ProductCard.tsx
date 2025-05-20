
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProductModal from "./ProductModal";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  platform: string;
  url: string;
  rating?: number;
}

export default function ProductCard({ id, title, price, image, platform, url, rating }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card 
        className="overflow-hidden transition-all hover:shadow-md cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="aspect-square overflow-hidden">
          <img 
            src={image || "/placeholder.svg"} 
            alt={title}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <Badge variant="outline" className="mb-2">{platform}</Badge>
          <h3 className="font-medium line-clamp-2 h-12">{title}</h3>
          <div className="mt-2 text-xl font-bold">${price.toLocaleString()}</div>
        </CardContent>
      </Card>

      <ProductModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={{ id, title, price, image, platform, url, rating }}
      />
    </>
  );
}
