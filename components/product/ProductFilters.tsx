'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface ProductFiltersProps {
  categories: string[];
  selectedCategories: string[];
  setSelectedCategories: (cats: string[]) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  sustainability: string[];
  setSustainability: (s: string[]) => void;
  onReset: () => void;
}

export function ProductFilters({
  categories,
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange,
  sustainability,
  setSustainability,
  onReset,
}: ProductFiltersProps) {
  // Gestion des changements de catégories
  const handleCategoryChange = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter(c => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  // Gestion des changements de durabilité
  const handleSustainabilityChange = (id: string) => {
    if (sustainability.includes(id)) {
      setSustainability(sustainability.filter(s => s !== id));
    } else {
      setSustainability([...sustainability, id]);
    }
  };

  // Correction pour toujours afficher les catégories (même si vide ou mal formaté)
  const safeCategories = Array.isArray(categories) && categories.length > 0
    ? categories.filter(Boolean)
    : ['Tous', 'Vestes', 'Robes', 'T-shirts', 'Pantalons', 'Sweats', 'Accessoires'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filtres</h2>
        <Button variant="ghost" size="sm" onClick={onReset} className="hover:bg-upcycle-purple/10">
          Réinitialiser
        </Button>
      </div>
      <Accordion type="multiple" defaultValue={["categories", "price", "sustainability"]} className="w-full">
        <AccordionItem value="categories">
          <AccordionTrigger className="hover:text-upcycle-purple">Catégories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {safeCategories.map(category => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                    className="data-[state=checked]:bg-upcycle-purple data-[state=checked]:text-white border-upcycle-purple"
                  />
                  <Label htmlFor={category} className=" hover:text-upcycle-purple cursor-pointer">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="price">
          <AccordionTrigger className="hover:text-upcycle-purple">Prix</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                min={0}
                max={1000}
                step={10}
                className="[&_[role=slider]]:bg-upcycle-purple"
              />
              <div className="flex items-center gap-2">
                <Input type="number" placeholder="Min" value={priceRange[0]} onChange={e => setPriceRange([+e.target.value, priceRange[1]])} className="focus-visible:ring-upcycle-purple border-upcycle-purple" />
                <span>-</span>
                <Input type="number" placeholder="Max" value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], +e.target.value])} className="focus-visible:ring-upcycle-purple border-upcycle-purple" />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="sustainability">
          <AccordionTrigger className="hover:text-upcycle-purple">Durabilité</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="recyclé" checked={sustainability.includes('recyclé')} onCheckedChange={() => handleSustainabilityChange('recyclé')} className="data-[state=checked]:bg-upcycle-purple data-[state=checked]:text-white border-upcycle-purple" />
                <Label htmlFor="recyclé" className="hover:text-upcycle-purple cursor-pointer">Matériaux recyclés</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="bio" checked={sustainability.includes('bio')} onCheckedChange={() => handleSustainabilityChange('bio')} className="data-[state=checked]:bg-upcycle-purple data-[state=checked]:text-white border-upcycle-purple" />
                <Label htmlFor="bio" className="hover:text-upcycle-purple cursor-pointer">Matériaux bio</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button className="w-full bg-upcycle-purple hover:bg-upcycle-purple/90 text-white" onClick={() => {}}>
        Appliquer les filtres
      </Button>
    </div>
  );
} 