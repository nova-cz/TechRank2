
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PriceRangeFilterProps {
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
}

export default function PriceRangeFilter({ minPrice, maxPrice, onPriceChange }: PriceRangeFilterProps) {
  const [minValue, setMinValue] = useState<number | null>(null);
  const [maxValue, setMaxValue] = useState<number | null>(null);
  const [isFocused, setIsFocused] = useState({ min: false, max: false });

  useEffect(() => {
    setMinValue(minPrice);
    setMaxValue(maxPrice);
  }, [minPrice, maxPrice]);

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? null : parseInt(e.target.value);
    
    if (value === null || (value >= 0)) {
      setMinValue(value);
      if (value !== null) {
        onPriceChange(value, maxValue || 50000);
      }
    }
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? null : parseInt(e.target.value);
    
    if (value === null || value >= 0) {
      setMaxValue(value);
      if (value !== null) {
        onPriceChange(minValue || 0, value);
      }
    }
  };

  const handleMinFocus = () => {
    setIsFocused(prev => ({ ...prev, min: true }));
    if (minValue === 0) {
      setMinValue(null);
    }
  };

  const handleMaxFocus = () => {
    setIsFocused(prev => ({ ...prev, max: true }));
    if (maxValue === 50000) {
      setMaxValue(null);
    }
  };

  const handleBlur = (field: 'min' | 'max') => {
    setIsFocused(prev => ({ ...prev, [field]: false }));
    
    if (field === 'min' && minValue === null) {
      setMinValue(0);
      onPriceChange(0, maxValue || 50000);
    }
    
    if (field === 'max' && maxValue === null) {
      setMaxValue(50000);
      onPriceChange(minValue || 0, 50000);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="min-price" className="text-sm text-muted-foreground">Precio mínimo</Label>
          <div className="flex items-center">
            <span className="mr-2 text-muted-foreground">$</span>
            <Input
              id="min-price"
              type="number"
              value={minValue === null ? "" : minValue}
              onChange={handleMinInputChange}
              onFocus={handleMinFocus}
              onBlur={() => handleBlur('min')}
              placeholder="0"
              min={0}
              className="w-full bg-background/5 border-muted/20"
            />
          </div>
        </div>
        
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
