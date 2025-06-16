'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, Search, ShoppingBag, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Category } from '@prisma/client';
import MegaMenu from './MegaMenu';
import Image from 'next/image';

// Mapping des icônes pour chaque catégorie
const categoryIcons: { [key: string]: string } = {
  'Robes': '👗',
  'Vestes': '🧥',
  'Pantalons': '👖',
  'Tops': '👕',
  'Accessoires': '👜',
  'Jupes': '👗',
  'Sweats': '🧥',
  'Chemises': '👔',
  'Bijoux': '💍',
  'Sacs': '👜',
  'Chaussures': '👞',
  'Écharpes': '🧣',
  'Chapeaux': '🎩',
  'Gants': '🧤',
  'Ceintures': '⛓️',
};

export function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobileSearch, setMobileSearch] = React.useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = React.useState(false);

  // Gère l'ouverture/fermeture avec animation
  React.useEffect(() => {
    if (mobileOpen) {
      setIsDrawerVisible(true);
    } else if (isDrawerVisible) {
      // Attend la fin de l'animation avant de retirer le drawer
      const timeout = setTimeout(() => setIsDrawerVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [mobileOpen]);

  return (
    <>
      {/* Desktop navbar */}
      <header className="w-full items-center justify-between px-8 py-4 border-b border-black bg-neutral-500 hidden md:flex">
        <div className="flex items-center gap-8">
          <Link href="/collections" className="font-bold text-lg text-neutral-900" style={{fontFamily: 'Unbounded'}}>Ma boutique</Link>
        </div>
        <div className="flex-1 flex justify-center">
          <Link href="/" className="text-3xl font-unbounded font-bold text-neutral-900">Remade</Link>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/login" className="flex items-center gap-2 font-bold text-base text-neutral-900">
            se connecter
            <Image src="/REMADE/SVG/icône_personne.svg" alt="compte" width={28} height={28} />
          </Link>
          <Link href="/collections" className="flex items-center gap-2 font-bold text-base text-neutral-900">
            favoris
            <Image src="/REMADE/SVG/icône_coeur.svg" alt="favoris" width={28} height={28} />
          </Link>
        </div>
      </header>
      {/* Mobile navbar */}
      <header className="w-full flex md:hidden items-center justify-between px-4 py-4 border-b border-black bg-neutral-500">
        <Link href="/" className="text-2xl font-unbounded font-bold text-neutral-900">Remade</Link>
        <button onClick={() => setMobileOpen(true)} aria-label="Ouvrir le menu" className="p-2">
          <Menu size={32} />
        </button>
      </header>
      {/* Menu mobile drawer */}
      {isDrawerVisible && (
        <>
          {/* Overlay */}
          <div className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setMobileOpen(false)} />
          {/* Drawer */}
          <div className={`fixed top-0 right-0 h-full w-4/5 max-w-xs bg-neutral-500 z-50 shadow-lg flex flex-col ${mobileOpen ? 'animate-slide-in' : 'animate-slide-out'}`}>
            <button onClick={() => setMobileOpen(false)} aria-label="Fermer le menu" className="p-2 absolute top-4 right-4 z-50">
              <X size={28} />
            </button>
            <nav className="flex flex-col gap-4 px-4 py-6">
              <Link href="/collections" className="font-bold text-lg text-neutral-900" onClick={() => setMobileOpen(false)}>Ma boutique</Link>
              <Link href="/login" className="font-bold text-lg text-neutral-900 flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                se connecter
                <Image src="/REMADE/SVG/icône_personne.svg" alt="compte" width={24} height={24} />
              </Link>
              <Link href="/collections" className="font-bold text-lg text-neutral-900 flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                favoris
                <Image src="/REMADE/SVG/icône_coeur.svg" alt="favoris" width={24} height={24} />
              </Link>
            </nav>
            <div className="border-t border-black my-2" />
            <nav className="flex flex-col gap-2 px-4">
              <Link href="/creators" className="py-3 text-lg font-unbounded font-bold text-neutral-900 border-b border-black" onClick={() => setMobileOpen(false)}>Les Créateurs</Link>
              <Link href="/products" className="py-3 text-lg font-unbounded font-bold text-neutral-900 border-b border-black" onClick={() => setMobileOpen(false)}>Les vêtements</Link>
              <Link href="/products?category=accessoires" className="py-3 text-lg font-unbounded font-bold text-neutral-900 border-b border-black" onClick={() => setMobileOpen(false)}>Les accessoires</Link>
              {!mobileSearch ? (
                <button
                  className="py-3 text-lg font-unbounded font-bold text-neutral-900 text-left w-full"
                  onClick={() => setMobileSearch(true)}
                >
                  Rechercher
                </button>
              ) : (
                <div className="flex items-center gap-2 py-3">
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className="flex-1 h-10 rounded-md border border-black px-3 font-unbounded text-base focus:outline-none focus:ring-2 focus:ring-primary transition"
                    autoFocus
                  />
                  <button
                    className="text-2xl font-bold text-neutral-900 hover:text-primary transition-colors px-2"
                    onClick={() => setMobileSearch(false)}
                    aria-label="Fermer la recherche"
                  >
                    ×
                  </button>
                </div>
              )}
            </nav>
          </div>
          <style jsx>{`
            .animate-slide-in {
              animation: slideInRight 0.3s cubic-bezier(0.4,0,0.2,1);
            }
            .animate-slide-out {
              animation: slideOutRight 0.3s cubic-bezier(0.4,0,0.2,1);
            }
            @keyframes slideInRight {
              from { transform: translateX(100%); }
              to { transform: translateX(0); }
            }
            @keyframes slideOutRight {
              from { transform: translateX(0); }
              to { transform: translateX(100%); }
            }
          `}</style>
        </>
      )}
    </>
  );
}

export default Navbar;
