
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import PriceRangeFilter from "./PriceRangeFilter";
import CategorySelect from "./CategorySelect";

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  className?: string;
}

export interface SearchParams {
  minPrice: number;
  maxPrice: number;
  category: string;
}

export default function SearchForm({ onSearch, className }: SearchFormProps) {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    minPrice: 0,
    maxPrice: 50000,
    category: "",
  });

  const handlePriceChange = (min: number, max: number) => {
    setSearchParams(prev => ({
      ...prev,
      minPrice: min,
      maxPrice: max,
    }));
  };

  const handleCategoryChange = (category: string) => {
    setSearchParams(prev => ({
      ...prev,
      category,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  return (
    <Card className={`p-6 md:p-8 bg-card shadow-md border-border/40 ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-8">
          <PriceRangeFilter 
            minPrice={searchParams.minPrice} 
            maxPrice={searchParams.maxPrice} 
            onPriceChange={handlePriceChange} 
          />
          
          <div className="space-y-4">
            <h3 className="text-center text-base font-medium">Categoría</h3>
            <CategorySelect onCategoryChange={handleCategoryChange} />
          </div>
        </div>
        
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
