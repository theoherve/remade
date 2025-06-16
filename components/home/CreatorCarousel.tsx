"use client";
import { useRef, useEffect, useState } from 'react';
import CreatorCard from '@/components/creator/CreatorCard';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CreatorCarouselProps {
  noArrows?: boolean;
  showDots?: boolean;
}

const dummyCreators = [
  {
    id: '1',
    name: 'Anna Dupont',
    username: 'annadupont',
    avatar: '/REMADE/photo_sélection_créateurs.jpg',
    location: 'Paris',
    bio: 'Créatrice de mode éthique et responsable.',
    followersCount: 1200,
    productsCount: 34,
    rating: 4.8,
    verified: true,
    pageSettings: { accentColor: '#e86b27' },
  },
  {
    id: '2',
    name: 'Léo Martin',
    username: 'leomartin',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    location: 'Lyon',
    bio: "Passionné par l'upcycling et la création textile.",
    followersCount: 980,
    productsCount: 21,
    rating: 4.6,
    verified: false,
    pageSettings: { accentColor: '#e86b27' },
  },
  {
    id: '3',
    name: 'Sophie Bernard',
    username: 'sophiebrd',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    location: 'Marseille',
    bio: 'Créations uniques à partir de tissus recyclés.',
    followersCount: 1500,
    productsCount: 40,
    rating: 4.9,
    verified: true,
    pageSettings: { accentColor: '#e86b27' },
  },
  {
    id: '4',
    name: 'Lucas Petit',
    username: 'lucaspetit',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    location: 'Bordeaux',
    bio: 'Mode responsable et design contemporain.',
    followersCount: 800,
    productsCount: 18,
    rating: 4.7,
    verified: false,
    pageSettings: { accentColor: '#e86b27' },
  },
];

export default function CreatorCarousel({ noArrows = false, showDots = false }: CreatorCarouselProps) {
  const [index, setIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Slider automatique
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % dummyCreators.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Scroll vers la card active
  useEffect(() => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstChild instanceof HTMLElement ? scrollRef.current.firstChild.offsetWidth : 320;
      scrollRef.current.scrollTo({
        left: index * (cardWidth + 24), // 24 = gap-6
        behavior: 'smooth',
      });
    }
  }, [index]);

  const goLeft = () => setIndex((prev) => (prev === 0 ? dummyCreators.length - 1 : prev - 1));
  const goRight = () => setIndex((prev) => (prev + 1) % dummyCreators.length);

  return (
    <div className="relative">
      {!noArrows && (
        <button onClick={goLeft} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background rounded-full shadow p-2 hidden md:block">
          <ChevronLeft size={28} />
        </button>
      )}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {dummyCreators.map((creator) => (
          <div key={creator.id} className="flex-none w-[320px] snap-center">
            <CreatorCard creator={creator} />
          </div>
        ))}
      </div>
      {!noArrows && (
        <button onClick={goRight} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background rounded-full shadow p-2 hidden md:block">
          <ChevronRight size={28} />
        </button>
      )}
      {showDots && (
        <div className="flex justify-center gap-2 mt-2">
          {dummyCreators.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all ${i === index ? 'bg-primary scale-110' : 'bg-gray-300'} focus:outline-none`}
              aria-label={`Aller à la carte ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
} 