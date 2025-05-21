
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  { value: "celulares", label: "Celulares" },
  { value: "laptops", label: "Computadoras" },
  { value: "tablets", label: "Tablets" },
];

interface CategorySelectProps {
  onCategoryChange: (value: string) => void;
}

export default function CategorySelect({ onCategoryChange }: CategorySelectProps) {
  const [value, setValue] = useState("");

  return (
    <div className="w-full">
      <Select
        value={value}
        onValueChange={(newValue) => {
          setValue(newValue);
          onCategoryChange(newValue);
        }}
      >
        <SelectTrigger className="w-full h-12 bg-background hover:bg-muted/50">
          <SelectValue placeholder="Seleccionar categoría" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
