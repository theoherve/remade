"use client";
import { useState } from 'react';
import React from 'react';

const ctas = [
  { label: 'Les Créateurs', href: '/creators' },
  { label: 'Les vêtements', href: '/products' },
  { label: 'Les accessoires', href: '/products?category=accessoires' },
];

export default function HomeCtaNav() {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  // Quand isSearchActive passe à true, on affiche la search bar après 700ms
  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isSearchActive) {
      timeout = setTimeout(() => setShowSearchBar(true), 700);
    } else {
      setShowSearchBar(false);
    }
    return () => clearTimeout(timeout);
  }, [isSearchActive]);

  return (
    <nav className="w-full bg-neutral-500 border-b border-black overflow-hidden">
      <div className="flex w-full relative h-[72px]">
        {/* Wrapper flex-row pour tous les CTA */}
        <div className="flex w-full transition-all duration-700">
          {ctas.map((cta, i) => (
            <button
              key={cta.label}
              onClick={() => !isSearchActive && window.location.assign(cta.href)}
              className={`flex-1 text-center py-5 px-2 text-lg md:text-xl font-unbounded font-bold border-black border-r last:border-r-0 hover:underline transition-all duration-700 cursor-pointer
                ${isSearchActive ? 'opacity-0 -translate-x-20 pointer-events-none' : 'opacity-100 translate-x-0'}
              `}
              style={{ minWidth: 0 }}
            >
              {cta.label}
            </button>
          ))}
          {/* CTA Rechercher, slide à gauche quand isSearchActive, mais n'affiche pas si la search bar est visible */}
          {!showSearchBar && (
            <button
              className={`flex-1 text-center py-5 px-2 text-lg md:text-xl font-unbounded font-bold border-black border-r last:border-r-0 hover:underline transition-all duration-700 cursor-pointer z-10
                ${isSearchActive ? '-translate-x-[300%]' : 'translate-x-0'}
              `}
              style={{ minWidth: 0 }}
              onClick={() => setIsSearchActive(true)}
              disabled={isSearchActive}
            >
              Rechercher
            </button>
          )}
        </div>
        {/* Search bar animée, n'apparaît qu'après le slide */}
        {showSearchBar && (
          <div className="absolute left-0 top-0 h-full w-full flex items-center pr-6 transition-all duration-700">
            <button
              className="flex-1 py-5 px-2 text-lg md:text-xl font-unbounded font-bold border-black border-r last:border-r-0 bg-neutral-500"
              style={{ minWidth: 0 }}
              disabled
            >
              Rechercher
            </button>
            <input
              type="text"
              placeholder="Rechercher..."
              className="flex-[3] w-full h-12 rounded-md border border-black px-4 font-unbounded text-lg focus:outline-none focus:ring-2 focus:ring-primary transition ml-4"
              autoFocus
            />
            <button
              className="ml-4 text-2xl font-bold text-neutral-900 hover:text-primary transition-colors"
              onClick={() => setIsSearchActive(false)}
              aria-label="Fermer la recherche"
            >
              ×
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
