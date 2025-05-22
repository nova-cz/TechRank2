import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Props del componente PriceRangeFilter:
// - minPrice: valor mínimo inicial pasado desde el padre (SearchForm).
// - maxPrice: valor máximo inicial pasado desde el padre.
// - onPriceChange: callback que se ejecuta cuando cambian los valores y se comunica con SearchForm.
interface PriceRangeFilterProps {
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
}

// Componente que permite al usuario establecer un rango de precios numéricos.
export default function PriceRangeFilter({ minPrice, maxPrice, onPriceChange }: PriceRangeFilterProps) {
  // Estados locales para los inputs del usuario.
  const [minValue, setMinValue] = useState<number | null>(null);
  const [maxValue, setMaxValue] = useState<number | null>(null);

  // Estado para manejar cuándo los inputs están enfocados (para vaciar valores por defecto).
  const [isFocused, setIsFocused] = useState({ min: false, max: false });

  /**
   * Sincroniza los valores iniciales desde el componente padre (`SearchForm`) 
   * cuando estos cambian.
   */
  useEffect(() => {
    setMinValue(minPrice);
    setMaxValue(maxPrice);
  }, [minPrice, maxPrice]);

  /**
   * Maneja el cambio del input de precio mínimo.
   * - Convierte el valor de string a número.
   * - Valida que sea un número positivo o nulo (vacio temporalmente).
   * - Llama a `onPriceChange` para actualizar los filtros en el componente padre.
   */
  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? null : parseInt(e.target.value);

    // Solo acepta valores numéricos positivos o nulos.
    if (value === null || (value >= 0)) {
      setMinValue(value);

      // Si se ingresó un número válido, actualiza el padre.
      if (value !== null) {
        onPriceChange(value, maxValue || 50000);
      }
    }
  };

  /**
   * Maneja el cambio del input de precio máximo.
   * Similar a `handleMinInputChange`.
   */
  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? null : parseInt(e.target.value);

    if (value === null || value >= 0) {
      setMaxValue(value);

      if (value !== null) {
        onPriceChange(minValue || 0, value);
      }
    }
  };

  /**
   * Se ejecuta cuando el usuario hace foco en el input de precio mínimo.
   * - Permite limpiar automáticamente el valor 0 si es el predeterminado.
   */
  const handleMinFocus = () => {
    setIsFocused(prev => ({ ...prev, min: true }));
    
    // Si el valor es el predeterminado (0), lo borra para mejorar UX.
    if (minValue === 0) {
      setMinValue(null);
    }
  };

  /**
   * Similar a `handleMinFocus`, pero para el input de precio máximo.
   * Borra el valor por defecto (50000) si es el actual.
   */
  const handleMaxFocus = () => {
    setIsFocused(prev => ({ ...prev, max: true }));

    if (maxValue === 50000) {
      setMaxValue(null);
    }
  };

  /**
   * Se ejecuta cuando el input pierde el foco (onBlur).
   * - Si el campo queda vacío, restablece los valores por defecto.
   * - También actualiza al padre con los nuevos valores.
   */
  const handleBlur = (field: 'min' | 'max') => {
    setIsFocused(prev => ({ ...prev, [field]: false }));

    // Si se dejó vacío el input mínimo, restablece a 0.
    if (field === 'min' && minValue === null) {
      setMinValue(0);
      onPriceChange(0, maxValue || 50000);
    }

    // Si se dejó vacío el input máximo, restablece a 50000.
    if (field === 'max' && maxValue === null) {
      setMaxValue(50000);
      onPriceChange(minValue || 0, 50000);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {/* Campo de precio mínimo */}
        <div className="space-y-2">
          <Label htmlFor="min-price" className="text-sm text-muted-foreground">Precio mínimo</Label>
          <div className="flex items-center">
            <span className="mr-2 text-muted-foreground">$</span>
            <Input
              id="min-price"
              type="number" // Evita ingreso de texto y símbolos.
              value={minValue === null ? "" : minValue}
              onChange={handleMinInputChange}
              onFocus={handleMinFocus}
              onBlur={() => handleBlur('min')}
              placeholder="0"
              min={0} // Restringe a números positivos.
              className="w-full bg-background/5 border-muted/20"
            />
          </div>
        </div>

        {/* Campo de precio máximo */}
        <div className="space-y-2">
          <Label htmlFor="max-price" className="text-sm text-muted-foreground">Precio máximo</Label>
          <div className="flex items-center">
            <span className="mr-2 text-muted-foreground">$</span>
            <Input
              id="max-price"
              type="number"
              value={maxValue === null ? "" : maxValue}
              onChange={handleMaxInputChange}
              onFocus={handleMaxFocus}
              onBlur={() => handleBlur('max')}
              placeholder="50000"
              min={0}
              className="w-full bg-background/5 border-muted/20"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
