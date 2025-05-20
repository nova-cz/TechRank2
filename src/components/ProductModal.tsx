
import { useState } from "react";
import { Star, StarHalf, ArrowUpRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    title: string;
    price: number;
    image: string;
    platform: string;
    url: string;
    rating?: number;
  };
}

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export default function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState("");
  
  // Datos de ejemplo para las reseñas
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      name: "María García",
      rating: 5,
      comment: "Excelente producto, superó todas mis expectativas. La calidad es increíble y el envío fue muy rápido.",
      date: "15/04/2025"
    },
    {
      id: "2",
      name: "Carlos Rodríguez",
      rating: 4,
      comment: "Muy buen producto, relación calidad-precio inmejorable. Le quito una estrella porque el manual podría ser más claro.",
      date: "10/04/2025"
    },
    {
      id: "3",
      name: "Ana Martínez",
      rating: 4,
      comment: "Me encanta este producto, funciona perfectamente para lo que necesitaba.",
      date: "02/04/2025"
    }
  ]);

  // Función para enviar un comentario
  const submitReview = () => {
    if (userRating === 0 || comment.trim() === "") return;
    
    const newReview = {
      id: `${reviews.length + 1}`,
      name: "Usuario Anónimo",
      rating: userRating,
      comment,
      date: new Date().toLocaleDateString()
    };
    
    setReviews([newReview, ...reviews]);
    setUserRating(0);
    setComment("");
  };

  // Renderiza las estrellas para dar valoración
  const renderRatingStars = (interactive = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => interactive && setUserRating(i + 1)}
        className={`${interactive ? "cursor-pointer hover:text-yellow-400" : ""} ${
          i < userRating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        <Star className="w-6 h-6" />
      </button>
    ));
  };

  // Renderiza las estrellas de una reseña
  const renderReviewStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => {
      if (i < Math.floor(rating)) {
        return <Star key={i} className="w-4 h-4 text-yellow-400" />;
      } else if (i === Math.floor(rating) && rating % 1 !== 0) {
        return <StarHalf key={i} className="w-4 h-4 text-yellow-400" />;
      } else {
        return <Star key={i} className="w-4 h-4 text-gray-300" />;
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">{product.title}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Imagen del producto */}
          <div className="aspect-square overflow-hidden rounded-md bg-gray-100">
            <img 
              src={product.image} 
              alt={product.title} 
              className="h-full w-full object-cover"
            />
          </div>
          
          {/* Detalles del producto */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{product.title}</h2>
            <div className="flex items-center">
              {renderReviewStars(product.rating || 4.5)}
              <span className="ml-2 text-sm text-muted-foreground">
                ({product.rating || 4.5} de 5)
              </span>
            </div>
            <p className="text-3xl font-bold">${product.price.toLocaleString()}</p>
            <p className="text-muted-foreground">
              Disponible en {product.platform}
            </p>
            
            <Button asChild variant="default" className="w-full mt-6">
              <a href={product.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                Ver en tienda <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-bold mb-4">Comentarios y valoraciones</h3>
          
          {/* Sección para dejar comentario */}
          <div className="bg-card/50 p-4 rounded-lg mb-6">
            <h4 className="font-medium mb-2">Deja tu valoración</h4>
            <div className="flex mb-3">
              {renderRatingStars(true)}
            </div>
            <div className="mb-3">
              <Textarea 
                placeholder="Escribe tu comentario aquí..." 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="resize-none"
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={submitReview} disabled={userRating === 0 || comment === ""}>
                Enviar comentario
              </Button>
            </div>
          </div>
          
          {/* Lista de comentarios */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-4 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <div className="bg-muted w-full h-full flex items-center justify-center text-xs font-medium uppercase">
                        {review.name[0]}
                      </div>
                    </Avatar>
                    <span className="font-medium">{review.name}</span>
                    <div className="flex ml-2">
                      {renderReviewStars(review.rating)}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <p className="text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
