
import React from 'react';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface RecipeFilterProps {
  onFilterChange: (filters: { isVegetarian: boolean; isGlutenFree: boolean }) => void;
  initialFilters?: { isVegetarian: boolean; isGlutenFree: boolean };
}

export const RecipeFilter: React.FC<RecipeFilterProps> = ({ onFilterChange, initialFilters }) => {
  const [isVegetarian, setIsVegetarian] = useState(initialFilters?.isVegetarian || false);
  const [isGlutenFree, setIsGlutenFree] = useState(initialFilters?.isGlutenFree || false);

  const handleVegetarianChange = (checked: boolean) => {
    setIsVegetarian(checked);
    onFilterChange({ isVegetarian: checked, isGlutenFree });
  };

  const handleGlutenFreeChange = (checked: boolean) => {
    setIsGlutenFree(checked);
    onFilterChange({ isVegetarian, isGlutenFree: checked });
  };

  return (
    <div className="flex flex-col space-y-4 p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800">Filter Rezepte</h3>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="vegetarian"
          checked={isVegetarian}
          onCheckedChange={(checked) => handleVegetarianChange(checked as boolean)}
        />
        <Label htmlFor="vegetarian" className="text-gray-700">
          Vegetarisch
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="gluten-free"
          checked={isGlutenFree}
          onCheckedChange={(checked) => handleGlutenFreeChange(checked as boolean)}
        />
        <Label htmlFor="gluten-free" className="text-gray-700">
          Glutenfrei
        </Label>
      </div>
    </div>
  );
};
```