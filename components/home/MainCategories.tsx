'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRef, useEffect } from 'react';

const mainCategories = [
  {
    name: 'Robes',
    description: 'Robes remaniées et personnalisées',
  },
  {
    name: 'Vestes',
    description: 'Vestes et blazers upcyclés',
  },
  {
    name: 'Pantalons',
    description: 'Pantalons et jupes remaniés',
  },
  {
    name: 'Tops',
    description: 'Tops et chemises upcyclés',
  },
  {
    name: 'Accessoires',
    description: 'Accessoires et bijoux faits main',
  },
];

export default function MainCategories() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollIndex = useRef(0);

  // Défilement automatique sur mobile
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardWidth = 300; // Largeur approximative d'une carte + gap
    const maxIndex = mainCategories.length - 1;
    const interval = setInterval(() => {
      scrollIndex.current = (scrollIndex.current >= maxIndex ? 0 : scrollIndex.current + 1);
      container.scrollTo({
        left: scrollIndex.current * cardWidth,
        behavior: 'smooth',
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="bg-gray-50">
      <div>
        {/* Version mobile avec carrousel */}
        <div className="md:hidden relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {mainCategories.map((category) => (
              <Link
                key={category.name}
                href={`/explore?category=${category.name.toLowerCase()}`}
                className="block flex-none w-[280px] snap-center"
              >
                <Card className="h-full shadow-none border-x">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <h3 className="font-semibold mb-2">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Version desktop avec grille */}
        <div className="hidden md:flex md:flex-row lg:flex-row justify-between">
          {mainCategories.map((category) => (
            <Link
              key={category.name}
              href={`/explore?category=${category.name.toLowerCase()}`}
              className="block transition-transform hover:scale-[1.02] w-[280px]"
            >
              <Card className="h-full shadow-none border-x">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <h3 className="font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
