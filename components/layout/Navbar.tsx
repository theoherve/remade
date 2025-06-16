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
  return (
    <header className="w-full flex items-center justify-between px-8 py-4 border-b border-black bg-neutral-500">
      <div className="flex items-center gap-8">
        <Link href="/collections" className="font-bold text-lg text-neutral-900" style={{fontFamily: 'Unbounded'}}>Ma boutique</Link>
      </div>
      <div className="flex-1 flex justify-center">
        <Link href="/" className="text-3xl font-unbounded font-bold text-neutral-900">Remade</Link>
      </div>
      <div className="flex items-center gap-6">
        <Link href="/login" className="font-bold text-base text-neutral-900">se connecter</Link>
        <Image src="/REMADE/SVG/icône_personne.svg" alt="compte" width={28} height={28} />
        <Link href="/favoris" className="font-bold text-base text-neutral-900">favoris</Link>
        <Image src="/REMADE/SVG/icône_coeur.svg" alt="favoris" width={28} height={28} />
      </div>
    </header>
  );
}

export default Navbar;
