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
}

export function ProductFilters({ categories }: ProductFiltersProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filtres</h2>
        <Button variant="ghost" size="sm">
          Réinitialiser
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["categories", "price", "sustainability"]} className="w-full">
        <AccordionItem value="categories">
          <AccordionTrigger className="hover:text-orange-500">Catégories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map(category => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox id={category} className="data-[state=checked]:bg-orange-600 data-[state=checked]:text-white" />
                  <Label htmlFor={category}>{category}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className=" hover:text-orange-500">Prix</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                defaultValue={[0, 1000]}
                max={1000}
                step={10}
                className="[&_[role=slider]]:bg-orange-600"
              />
              <div className="flex items-center gap-2">
                <Input type="number" placeholder="Min" className="focus-visible:ring-orange-600" />
                <span>-</span>
                <Input type="number" placeholder="Max" className="focus-visible:ring-orange-600" />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="sustainability">
          <AccordionTrigger className="hover:text-orange-500">Durabilité</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="recycled" className="data-[state=checked]:bg-orange-600 data-[state=checked]:text-white" />
                <Label htmlFor="recycled">Matériaux recyclés</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="bio" className="data-[state=checked]:bg-orange-600 data-[state=checked]:text-white" />
                <Label htmlFor="bio">Matériaux bio</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
} 