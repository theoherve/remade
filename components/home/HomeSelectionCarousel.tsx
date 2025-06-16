"use client";
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const cards = [
  {
    title: 'La sélection',
    subtitle: 'créateurs du moment',
    button: 'découvrir',
    image: '/REMADE/photo_sélection_créateurs.jpg',
    alt: 'Sélection créateurs',
    bg: 'bg-neutral-500',
    border: 'border-black',
    text: 'text-neutral-900',
    href: '/products',
  },
  {
    title: 'Nouvelles promos',
    subtitle: "jusqu'à -40%",
    button: 'découvrir',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
    alt: 'Promotions',
    bg: 'bg-neutral-500',
    border: 'border-black',
    text: 'text-neutral-900',
    href: '/products',
  },
];

export default function HomeSelectionCarousel() {
  const [index, setIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Slider automatique
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % cards.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Scroll vers la card active
  useEffect(() => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstChild instanceof HTMLElement ? scrollRef.current.firstChild.offsetWidth : 500;
      scrollRef.current.scrollTo({
        left: index * (cardWidth + 24), // 24 = gap-6
        behavior: 'smooth',
      });
    }
  }, [index]);

  return (
    <div className="relative w-full">
      <div className="w-full max-w-8xl mx-auto">
        {(() => {
          const card = cards[index];
          return (
            <div
              className={`relative flex flex-col md:flex-row items-stretch w-full ${card.bg} ${card.border} border rounded-2xl overflow-hidden min-h-[260px] h-64 md:h-72`}
            >
              <div className="flex-1 md:basis-1/3 flex flex-col justify-center items-center md:items-start text-center md:text-left p-8 bg-neutral-500 h-full rounded-none md:rounded-l-2xl">
                <h3 className="text-3xl md:text-4xl font-unbounded font-bold mb-2 text-neutral-900">{card.title}</h3>
                <p className="text-xl font-unbounded mb-4 text-neutral-900">{card.subtitle}</p>
                <button className="px-5 py-2 border-2 border-black text-neutral-900 font-unbounded rounded-md hover:bg-black hover:text-white transition text-base mt-2" onClick={() => window.location.assign(card.href)}>
                  {card.button}
                </button>
              </div>
              <div className="flex-1 md:basis-2/3 relative w-full h-64 md:h-full order-first md:order-none">
                <Image src={card.image} alt={card.alt} fill priority sizes="(max-width: 768px) 100vw, 66vw" className="object-cover w-full h-full md:rounded-none" />
              </div>
              {/* Points d'indication dans la card */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {cards.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`w-3 h-3 rounded-full transition-all ${i === index ? 'bg-black scale-110' : 'bg-gray-300'} focus:outline-none`}
                    aria-label={`Aller à la carte ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
