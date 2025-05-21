import ProductCard from "./ProductCard";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  platform: string;
  url: string;
  rating: number;
}

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name} // este es el nombre real del producto
          price={product.price}
          image={product.image}
          platform={product.platform}
          url={product.url}
          rating={product.rating}
        />
      ))}
    </div>
  );
}
