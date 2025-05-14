'use client';

import { useEffect, useState } from 'react';
import { Product } from '@prisma/client';
import { ProductCard } from '../product/product-card';
import { Button } from '../ui/button';
import Link from 'next/link';

type ProductWithRelations = Product & {
  category: { name: string };
  shop: {
    name: string;
    user: {
      name: string | null;
      profile: {
        id: string;
        avatar: string | null;
        bio: string | null;
        location: string | null;
        phoneNumber: string | null;
      } | null;
    };
  };
};

interface FeaturedProductsProps {
  initialProducts?: ProductWithRelations[];
}

export default function FeaturedProducts({ initialProducts = [] }: FeaturedProductsProps) {
  const [products, setProducts] = useState<ProductWithRelations[]>(initialProducts);
  const [loading, setLoading] = useState(!initialProducts.length);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialProducts.length === 0) {
      const fetchProducts = async () => {
        try {
          const response = await fetch('/api/featured');
          if (!response.ok) {
            throw new Error('Failed to fetch featured products');
          }
          const data = await response.json();
          setProducts(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }
  }, [initialProducts]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg aspect-square mb-4" />
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Produits en vedette</h2>
          </div>
          <div className="text-center text-muted-foreground">
            <p className="mb-4">Impossible de charger les produits pour le moment.</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Réessayer
            </Button>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Produits en vedette</h2>
          </div>
          <div className="text-center text-muted-foreground">
            <p>Aucun produit n'est disponible pour le moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Produits en vedette</h2>
          <Link href="/products">
            <Button variant="outline">Voir tous les produits</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              images={product.images}
              shopName={product.shop.name}
              creatorName={product.shop.user.name}
              productId={product.id}
              createdAt={product.createdAt}
              materials={product.materials}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
