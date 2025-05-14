'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

interface Creator {
  id: string;
  name: string | null;
  email: string;
  profile: {
    avatar: string | null;
    bio: string | null;
  } | null;
  shop: {
    name: string;
  } | null;
}

interface FeaturedCreatorsProps {
  initialCreators?: Creator[];
}

export default function FeaturedCreators({ initialCreators = [] }: FeaturedCreatorsProps) {
  const [creators, setCreators] = useState<Creator[]>(initialCreators);
  const [isLoading, setIsLoading] = useState(!initialCreators.length);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialCreators.length === 0) {
      const fetchCreators = async () => {
        try {
          const response = await fetch('/api/creators/featured');
          if (!response.ok) {
            throw new Error('Impossible de charger les créateurs');
          }
          const data = await response.json();
          setCreators(data);
        } catch (error) {
          console.error('Error fetching featured creators:', error);
          setError(error instanceof Error ? error.message : 'Une erreur est survenue');
        } finally {
          setIsLoading(false);
        }
      };

      fetchCreators();
    }
  }, [initialCreators]);

  if (isLoading) {
    return (
      <section className="py-12">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-8">
            Créateurs tendances
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200" />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-8">
            Créateurs tendances
          </h2>
          <div className="text-center text-muted-foreground">
            <p className="mb-4">Impossible de charger les créateurs pour le moment.</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Réessayer
            </Button>
          </div>
        </div>
      </section>
    );
  }

  if (creators.length === 0) {
    return (
      <section className="py-12">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-8">
            Créateurs tendances
          </h2>
          <div className="text-center text-muted-foreground">
            <p>Aucun créateur n'est disponible pour le moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-8">
          Créateurs tendances
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creators.map((creator) => (
            <Card key={creator.id}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={creator.profile?.avatar || undefined} />
                    <AvatarFallback>
                      {creator.name?.charAt(0) || creator.email.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {creator.name || creator.email}
                    </h3>
                    {creator.shop && (
                      <p className="text-muted-foreground">{creator.shop.name}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
