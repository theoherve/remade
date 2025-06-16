'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductWithRelations } from '@/lib/actions/product';

interface ProductGridProps {
  products: ProductWithRelations[];
  view?: 'grid' | 'list';
}

export function ProductGrid({ products, view = 'grid' }: ProductGridProps) {
  return (
    <div className="lg:col-span-3">
      <div className={view === 'grid' ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3' : 'flex flex-col gap-2'}>
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <Card className="h-full hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-4 mb-2 pb-0">
                <div className="relative aspect-square mb-4">
                  <img
                    src={product.images[0] || '/placeholder-product.jpg'}
                    alt={product.name}
                    className="object-cover w-full h-full rounded-lg"
                  />
                  {new Date(product.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000 && (
                    <Badge className="absolute top-2 left-2 bg-primary text-background">Nouveau</Badge>
                  )}
                  {product.materials.some((material: string) => material.toLowerCase().includes('recyclé') || material.toLowerCase().includes('bio')) && (
                    <Badge variant="secondary" className="absolute top-2 right-2 text-primary border-primary bg-primary/10">
                      Eco-responsable
                    </Badge>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between gap-x-2">
                    <span className="font-semibold text-lg">{product.name}</span>
                    <span className="font-bold text-lg">{product.price.toFixed(2)}&nbsp;€</span>
                  </div>
                  <div className="flex justify-between gap-x-2 items-center text-sm">
                    <span>{product.creator.name || 'Anonyme'}</span>
                    <span>{product.category.name}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full bg-primary hover:bg-primary/90 text-background">Voir le détail</Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 