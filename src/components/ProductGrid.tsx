
import ProductCard from "./ProductCard";

// Datos de ejemplo para mostrar en la interfaz
const dummyProducts = [
  {
    id: "1",
    title: "iPhone 14 Pro Max 256GB",
    price: 24999,
    image: "https://placehold.co/400x400/333/FFF?text=iPhone",
    platform: "Amazon",
    url: "#",
    rating: 4.8
  },
  {
    id: "2",
    title: "Samsung Galaxy S23 Ultra 512GB",
    price: 22500,
    image: "https://placehold.co/400x400/333/FFF?text=Samsung",
    platform: "Mercado Libre",
    url: "#",
    rating: 4.7
  },
  {
    id: "3",
    title: "MacBook Pro 16\" M2 Pro",
    price: 45999,
    image: "https://placehold.co/400x400/333/FFF?text=MacBook",
    platform: "Amazon",
    url: "#",
    rating: 4.9
  },
  {
    id: "4",
    title: "Sony WH-1000XM5 Audífonos",
    price: 6999,
    image: "https://placehold.co/400x400/333/FFF?text=Sony",
    platform: "Mercado Libre",
    url: "#",
    rating: 4.6
  },
  {
    id: "5",
    title: "iPad Pro 12.9\" M2 256GB",
    price: 23999,
    image: "https://placehold.co/400x400/333/FFF?text=iPad",
    platform: "Amazon",
    url: "#",
    rating: 4.8
  },
  {
    id: "6",
    title: "Lenovo ThinkPad X1 Carbon",
    price: 29999,
    image: "https://placehold.co/400x400/333/FFF?text=Lenovo",
    platform: "Mercado Libre",
    url: "#",
    rating: 4.5
  },
  {
    id: "25",
    title: "Xiaomi Smartphone M5s 6.43\" 256GB/8GB Cámara 64MP+8MP+2MP+2MP/13MP Mediatek Android 12 Color Gris",
    price: 2299,
    image: "https://placehold.co/400x400/333/FFF?text=Xiaomi",
    platform: "Amazon",
    url: "https://www.amazon.com.mx/Xiaomi-Celular-Poco-M5s-256GB/dp/B0C5K4D6NF",
    rating: 5.0
  },
];

interface ProductGridProps {
  products?: typeof dummyProducts;
}

export default function ProductGrid({ products = dummyProducts }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
