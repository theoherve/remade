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

export default function FeaturedCreators() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
  }, []);

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
            <Link
              key={creator.id}
              href={`/creators/${creator.id}`}
              className="block transition-transform hover:scale-[1.02]"
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage
                        src={creator.profile?.avatar || undefined}
                        alt={creator.name || 'Créateur'}
                      />
                      <AvatarFallback>
                        {creator.name?.substring(0, 2).toUpperCase() || 'CR'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">
                        {creator.name || 'Créateur'}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {creator.shop?.name || 'Boutique'}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm">4.8</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link href="/creators">Voir tous les créateurs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
