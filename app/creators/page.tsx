import React from 'react';
import CreatorCard from '@/components/creator/CreatorCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal } from 'lucide-react';
import { getCreators } from '@/lib/actions/creator';
import type { ShopTheme } from '@/types/shop';

export default async function CreatorsPage() {
  const creators = await getCreators();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">Créateurs</h1>
          <p className="text-muted-foreground">
            Découvrez nos créateurs talentueux et leurs créations uniques
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher un créateur..."
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {creators.map((creator) => {
            const theme = creator.shop?.theme as ShopTheme | undefined;
            return (
              <CreatorCard
                key={creator.id}
                creator={{
                  id: creator.id,
                  name: creator.name || 'Anonyme',
                  username: creator.email.split('@')[0],
                  avatar: creator.profile?.avatar || '/placeholder-avatar.png',
                  location: creator.profile?.location || 'Non spécifié',
                  bio: creator.profile?.bio || 'Aucune biographie disponible',
                  followersCount: 0, // À implémenter si nécessaire
                  productsCount: creator._count.products,
                  rating: 0, // À implémenter si nécessaire
                  verified: true,
                  pageSettings: {
                    accentColor: theme?.accentColor || '#9b87f5',
                  },
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
} 