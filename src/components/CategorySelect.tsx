import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react"; // Iconos opcionales que podrían usarse para mejorar UI
import { Button } from "@/components/ui/button"; // No usado directamente aquí, pero útil si quieres personalizar `SelectTrigger`

// Componentes personalizados del sistema de UI para Select
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Lista de categorías disponibles que el usuario puede seleccionar.
// Cada una tiene un `value` (clave usada internamente) y un `label` (nombre visible).
const categories = [
  { value: "celulares", label: "Celulares" },
  { value: "laptops", label: "Computadoras" },
  { value: "tablets", label: "Tablets" },
];

// Props del componente CategorySelect:
// - onCategoryChange: función que recibe la categoría seleccionada y la pasa al componente padre.
interface CategorySelectProps {
  onCategoryChange: (value: string) => void;
}

// Componente que permite al usuario seleccionar una categoría.
// Esta selección es necesaria para que la búsqueda sea válida en `SearchForm`.
export default function CategorySelect({ onCategoryChange }: CategorySelectProps) {
  // Estado local para almacenar el valor seleccionado por el usuario.
  const [value, setValue] = useState("");

  return (
    <div className="w-full">
      {/* Componente Select personalizado para desplegar opciones */}
      <Select
        value={value} // Controlado por el estado local.
        onValueChange={(newValue) => {
          // Al seleccionar una nueva categoría:
          // - se actualiza el estado local
          // - se notifica al componente padre (SearchForm)
          setValue(newValue);
          onCategoryChange(newValue);
        }}
      >
        {/* Botón que dispara el menú desplegable */}
        <SelectTrigger className="w-full h-12 bg-background hover:bg-muted/50">
          {/* Texto mostrado cuando no hay selección aún */}
          <SelectValue placeholder="Seleccionar categoría" />
        </SelectTrigger>

        {/* Contenedor que muestra la lista de opciones */}
        <SelectContent>
          {categories.map((category) => (
            // Cada opción del select tiene un valor único (`value`) y un nombre visible (`label`)
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
