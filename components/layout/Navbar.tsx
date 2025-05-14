'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, Search, User, ShoppingBag, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Category } from '@prisma/client';
import MegaMenu from './MegaMenu';

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
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCategoryHovered, setIsCategoryHovered] = useState(false);
  const [isMegaMenuHovered, setIsMegaMenuHovered] = useState(false);
  const showMegaMenu = isCategoryHovered || isMegaMenuHovered;
  const closeMenuTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleEnter = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (closeMenuTimeout.current) clearTimeout(closeMenuTimeout.current);
    setter(true);
  };

  const handleLeave = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    closeMenuTimeout.current = setTimeout(() => setter(false), 100);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white bg-opacity-80 backdrop-blur-md border-b py-3">
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-handwriting font-bold text-upcycle-purple">UpCycle</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-x-6 items-center">
          <Link href="/products" className="font-medium hover:text-upcycle-purple transition-colors">
            Explorer
          </Link>
          <div
            className="relative"
            onMouseEnter={() => handleEnter(setIsCategoryHovered)}
            onMouseLeave={() => handleLeave(setIsCategoryHovered)}
            tabIndex={0}
          >
            <Button
              variant="link"
              className={
                "font-medium flex items-center transition-colors text-black hover:text-upcycle-purple p-0 text-md "
              }
            >
              Catégories
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
            {showMegaMenu && (
              <MegaMenu 
                categories={categories} 
                categoryIcons={categoryIcons}
                onMouseEnter={() => handleEnter(setIsMegaMenuHovered)}
                onMouseLeave={() => handleLeave(setIsMegaMenuHovered)}
              />
            )}
          </div>
          <Link href="/creators" className="font-medium hover:text-upcycle-purple transition-colors">
            Créateurs
          </Link>
          <Link href="/collections" className="font-medium hover:text-upcycle-purple transition-colors">
            Collections
          </Link>
          <Link href="/how-it-works" className="font-medium hover:text-upcycle-purple transition-colors">
            Comment ça marche
          </Link>
        </div>

        {/* Search Input (Desktop) */}
        <div className={cn(
          "hidden md:flex items-center transition-all duration-300",
          isSearchOpen ? "w-64" : "w-auto"
        )}>
          {isSearchOpen && (
            <Input 
              type="text" 
              placeholder="Rechercher..." 
              className="w-full"
              autoFocus
            />
          )}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            {isSearchOpen ? <X size={20} /> : <Search size={20} />}
          </Button>
        </div>

        {/* User Actions (Desktop) */}
        <div className="hidden md:flex items-center space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/account">
              <User size={20} />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ShoppingBag size={20} />
            </Link>
          </Button>
          <Button variant="default" className="bg-upcycle-purple hover:bg-upcycle-purple/90" asChild>
            <Link href="/login">Connexion</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b shadow-lg">
          <div className="flex justify-between items-center p-4 border-b">
            <Input 
              type="text" 
              placeholder="Rechercher..." 
              className="w-full mr-2"
            />
            <Button variant="ghost" size="icon">
              <Search size={20} />
            </Button>
          </div>
          <div className="flex flex-col p-4 space-y-3">
            <Link href="/explore" className="font-medium py-2">Explorer</Link>
            <div className="space-y-2">
              <div className="font-medium py-2">Catégories</div>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="flex items-center space-x-3 pl-4 py-2 text-sm text-muted-foreground hover:text-upcycle-purple"
                >
                  <span className="text-xl">{categoryIcons[category.name] || '🏷️'}</span>
                  <div className="flex flex-col">
                    <span>{category.name}</span>
                  </div>
                </Link>
              ))}
            </div>
            <Link href="/creators" className="font-medium py-2">Créateurs</Link>
            <Link href="/collections" className="font-medium py-2">Collections</Link>
            <Link href="/how-it-works" className="font-medium py-2">Comment ça marche</Link>
            <Link href="/account" className="flex items-center justify-between py-2">
              <span>Mon compte</span>
              <User size={20} />
            </Link>
            <Link href="/cart" className="flex items-center justify-between py-2">
              <span>Mon panier</span>
              <ShoppingBag size={20} />
            </Link>
            <Button className="w-full mt-2 bg-upcycle-purple hover:bg-upcycle-purple/90" asChild>
              <Link href="/login">Connexion</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
