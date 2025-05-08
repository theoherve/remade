import React from 'react';
import { searchProducts } from '@/lib/actions/product';
import { ProductFilters } from '@/components/product/ProductFilters';
import { ProductGrid } from '@/components/product/ProductGrid';

export default async function ExplorePage() {
  const products = await searchProducts('');
  const categories = Array.from(new Set(products.map(p => p.category.name)));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">Explorer</h1>
          <p className="text-muted-foreground">
            Découvrez nos créations uniques et durables
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <ProductFilters categories={categories} />
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}
