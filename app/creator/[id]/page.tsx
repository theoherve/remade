'use client';

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import CreatorHeader from '@/components/creator/CreatorHeader';
import CreatorProducts from '@/components/creator/CreatorProducts';
import CustomizationOptions from '@/components/creator/CustomizationOptions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getCreatorById } from '@/lib/actions/creator';
import type { ShopTheme } from '@/types/shop';
import type { Product } from '@/types/product';

export default function CreatorPage({ params }: { params: { id: string } }) {
  const [creator, setCreator] = React.useState<any>(null);
  const [theme, setTheme] = React.useState<ShopTheme | undefined>(undefined);

  React.useEffect(() => {
    const fetchCreator = async () => {
      const data = await getCreatorById(params.id);
      setCreator(data);
      setTheme(data.shop?.theme as ShopTheme | undefined);
    };
    fetchCreator();
  }, [params.id]);

  if (!creator) {
    return <div>Chargement...</div>;
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <CreatorHeader
          creator={{
            id: creator.id,
            name: creator.name || 'Anonyme',
            username: creator.email.split('@')[0],
            avatar: creator.profile?.avatar || '/placeholder-avatar.png',
            banner: creator.shop?.banner || '/placeholder-banner.jpg',
            location: creator.profile?.location || 'Non spécifié',
            since: new Date(creator.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
            bio: creator.profile?.bio || 'Aucune biographie disponible',
            followersCount: 0,
            productsCount: creator._count.products,
            rating: 0,
            verified: true,
            pageSettings: {
              backgroundColor: theme?.backgroundColor || '#ffffff',
              textColor: theme?.textColor || '#000000',
              accentColor: theme?.accentColor || '#9b87f5',
              fontFamily: theme?.fontFamily || 'Montserrat',
              stickers: theme?.stickers || [],
            },
          }}
        />

        <Tabs defaultValue="products" className="mt-8">
          <TabsList>
            <TabsTrigger value="products">Produits</TabsTrigger>
            <TabsTrigger value="about">À propos</TabsTrigger>
            <TabsTrigger value="customize">Personnaliser</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <CreatorProducts products={creator.products.map((product: Product) => ({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.images[0] || '/placeholder-product.jpg',
              category: product.category.name,
              isNew: new Date(product.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000,
              isSustainable: product.materials.some((material: string) => material.toLowerCase().includes('recyclé') || material.toLowerCase().includes('bio')),
              productId: product.id,
            }))} />
          </TabsContent>

          <TabsContent value="about">
            <div className="prose max-w-none">
              <h2>À propos de {creator.name}</h2>
              <p>{creator.profile?.bio || 'Aucune biographie disponible'}</p>
              
              <h3>Statistiques</h3>
              <ul>
                <li>Produits créés : {creator._count.products}</li>
                <li>Membre depuis : {new Date(creator.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</li>
                <li>Localisation : {creator.profile?.location || 'Non spécifiée'}</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="customize">
            <CustomizationOptions
              onUpdateSettings={() => {}}
              currentSettings={{
                backgroundColor: theme?.backgroundColor || '#ffffff',
                textColor: theme?.textColor || '#000000',
                accentColor: theme?.accentColor || '#9b87f5',
                fontFamily: theme?.fontFamily || 'Montserrat',
                stickers: theme?.stickers || [],
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
} 