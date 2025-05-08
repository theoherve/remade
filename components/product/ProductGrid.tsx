'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Grid2X2, List } from 'lucide-react';
import { ProductWithRelations } from '@/lib/actions/product';

interface ProductGridProps {
  products: ProductWithRelations[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="lg:col-span-3">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Grid2X2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <List className="h-4 w-4" />
          </Button>
        </div>

        <Select defaultValue="newest">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Trier par" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="newest">Plus récents</SelectItem>
              <SelectItem value="price-asc">Prix croissant</SelectItem>
              <SelectItem value="price-desc">Prix décroissant</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <Card className="h-full hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-4">
                <div className="relative aspect-square mb-4">
                  <img
                    src={product.images[0] || '/placeholder-product.jpg'}
                    alt={product.name}
                    className="object-cover w-full h-full rounded-lg"
                  />
                  {new Date(product.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000 && (
                    <Badge className="absolute top-2 right-2 bg-upcycle-purple hover:bg-upcycle-purple/90">Nouveau</Badge>
                  )}
                  {product.materials.some((material: string) => material.toLowerCase().includes('recyclé') || material.toLowerCase().includes('bio')) && (
                    <Badge variant="secondary" className="absolute top-2 left-2 bg-upcycle-light-purple hover:bg-upcycle-light-purple/90">
                      Éco-responsable
                    </Badge>
                  )}
                </div>
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Par {product.creator.name || 'Anonyme'}
                </p>
                <p className="font-bold">{product.price.toFixed(2)} €</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full bg-upcycle-purple hover:bg-upcycle-purple/90">Voir le produit</Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 