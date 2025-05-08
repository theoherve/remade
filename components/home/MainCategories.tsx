'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';

const mainCategories = [
  {
    name: 'Robes',
    description: 'Robes remaniées et personnalisées',
    icon: '👗',
  },
  {
    name: 'Vestes',
    description: 'Vestes et blazers upcyclés',
    icon: '🧥',
  },
  {
    name: 'Pantalons',
    description: 'Pantalons et jupes remaniés',
    icon: '👖',
  },
  {
    name: 'Tops',
    description: 'Tops et chemises upcyclés',
    icon: '👕',
  },
  {
    name: 'Accessoires',
    description: 'Accessoires et bijoux faits main',
    icon: '👜',
  },
];

export default function MainCategories() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // Ajustez cette valeur selon vos besoins
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="bg-gray-50 py-8">
      <div className="container p-0 mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Catégories principales</h2>
        
        {/* Version mobile avec carrousel */}
        <div className="md:hidden relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md"
            onClick={() => scroll('left')}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
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
                <Card className="h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <span className="text-4xl mb-4">{category.icon}</span>
                    <h3 className="font-semibold mb-2">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md"
            onClick={() => scroll('right')}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Version desktop avec grille */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {mainCategories.map((category) => (
            <Link
              key={category.name}
              href={`/explore?category=${category.name.toLowerCase()}`}
              className="block transition-transform hover:scale-[1.02]"
            >
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <span className="text-4xl mb-4">{category.icon}</span>
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