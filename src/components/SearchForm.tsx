import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import PriceRangeFilter from "./PriceRangeFilter";
import CategorySelect from "./CategorySelect";

// Props que recibe el componente SearchForm:
// - onSearch: función que se ejecuta al enviar el formulario con filtros válidos.
// - className: clase opcional para personalización de estilos.
interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  className?: string;
}

// Tipado de los parámetros de búsqueda que se usarán al hacer la búsqueda.
export interface SearchParams {
  precioMin: number;
  precioMax: number;
  category: string;
}

//CLASE DEL COMPONENTE
export default function SearchForm({ onSearch, className }: SearchFormProps) {
  // Estado local que guarda los valores de los filtros: precios y categoría.
  const [searchParams, setSearchParams] = useState<SearchParams>({
    precioMin: 0,
    precioMax: 50000,
    category: "",
  });

  // Estado para manejar mensajes de error relacionados con validaciones del formulario.
  const [error, setError] = useState<string>("");

  /**
   * Maneja los cambios en el filtro de precio (mínimo y máximo).
   * Se actualizan los valores del estado y se valida que los precios sean coherentes.
   * Si los valores son válidos y también se ha seleccionado una categoría, se limpia el error.
   */
  const handlePriceChange = (min: number, max: number) => {
    setSearchParams(prev => ({
      ...prev,
      precioMin: min,
      precioMax: max,
    }));

    // Validación rápida: si hay categoría y precios coherentes, se limpia el error
    if (min <= max && min > 0 && max > 0 && searchParams.category) {
      setError("");
    }
  };

  /**
   * Maneja el cambio de categoría seleccionada.
   * Actualiza el estado local con la categoría elegida.
   * También valida si ya hay precios válidos para limpiar errores.
   */
  const handleCategoryChange = (category: string) => {
    setSearchParams(prev => ({
      ...prev,
      category,
    }));

    if (
      searchParams.precioMin <= searchParams.precioMax &&
      searchParams.precioMin > 0 &&
      searchParams.precioMax > 0 &&
      category
    ) {
      setError("");
    }
  };

  /**
   * Maneja el envío del formulario (submit).
   * Aquí se hacen todas las validaciones antes de ejecutar la búsqueda:
   * - Que los precios sean válidos y positivos.
   * - Que precioMin no sea mayor a precioMax.
   * - Que no sean ambos 0.
   * - Que se haya seleccionado una categoría.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario (recargar página).

    const { precioMin, precioMax, category } = searchParams;

    // Validación 1: precios no pueden ser ambos 0
    if (precioMin === 0 && precioMax === 0) {
      setError("Debes ingresar un precio mínimo y/o máximo válido mayor que 0.");
      return;
    }

    // Validación 2: precio mínimo no puede ser mayor al máximo.
    if (precioMin > precioMax) {
      setError("El precio máximo debe ser mayor o igual al precio mínimo.");
      return;
    }

    // Validación 3: categoría debe estar seleccionada.
    if (!category) {
      setError("Debes seleccionar una categoría.");
      return;
    }

    // Si todas las validaciones pasan, se limpia el error y se ejecuta la búsqueda.
    setError("");
    onSearch(searchParams);
  };

  return (
    <Card className={`p-6 md:p-8 bg-card shadow-md border-border/40 ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-8">
          {/* Componente que permite elegir el precio mínimo y máximo */}
          <PriceRangeFilter 
            minPrice={searchParams.precioMin} 
            maxPrice={searchParams.precioMax} 
            onPriceChange={handlePriceChange} 
          />

          {/* Mensaje de error si los precios no son válidos o no se ha seleccionado categoría */}
          {error && (
            <p className="text-sm text-red-600 text-center -mt-2">{error}</p>
          )}
          
          {/* Selector de categoría */}
          <div className="space-y-4">
            <h3 className="text-center text-base font-medium">Categoría</h3>
            <CategorySelect onCategoryChange={handleCategoryChange} />
          </div>
        </div>
        
        {/* Botón para enviar el formulario y ejecutar la búsqueda */}
        <div className="flex justify-center">
          <Button 
            type="submit" 
            className="px-8 py-2.5 text-base flex items-center justify-center gap-2 bg-tech-blue hover:bg-blue-600 rounded-lg"
          >
            <Search className="h-5 w-5" />
            Buscar
          </Button>
        </div>
      </form>
    </Card>
  );
}
