'use client';

import React, { useState, useMemo } from 'react';
import { ProductFilters } from '@/components/product/ProductFilters';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Grid2X2, List, X } from 'lucide-react';

const PRODUCTS_PER_PAGE = 6;

type Product = any; // Remplace par le vrai type si tu l'as

type ExplorePageProps = {
  products?: Product[];
  categories?: string[];
};

export default function ExploreClientPage({ products: initialProducts, categories: initialCategories }: ExplorePageProps) {
  const [products] = useState<Product[]>(initialProducts || []);
  const [categories] = useState<string[]>(initialCategories || Array.from(new Set(products.map((p: any) => p.category.name))));

  // États interactifs
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [sustainability, setSustainability] = useState<string[]>([]);
  const [sort, setSort] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [page, setPage] = useState(1);

  // Filtrage dynamique
  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    if (search) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category.name));
    }
    if (sustainability.length > 0) {
      filtered = filtered.filter(p => sustainability.some(s => p.materials.join(' ').toLowerCase().includes(s)));
    }
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    if (sort === 'newest') filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return filtered;
  }, [products, search, selectedCategories, priceRange, sustainability, sort]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE);

  // Tags actifs
  const activeTags = [
    ...selectedCategories,
    ...sustainability.map(s => s.charAt(0).toUpperCase() + s.slice(1)),
    (priceRange[0] > 0 || priceRange[1] < 1000) ? `${priceRange[0]}€ - ${priceRange[1]}€` : null,
    search ? `Recherche: ${search}` : null,
  ].filter(Boolean);

  // Reset
  const resetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
    setSustainability([]);
    setSearch('');
    setPage(1);
  };

  // Changement de page
  const goToPage = (p: number) => {
    if (p >= 1 && p <= totalPages) setPage(p);
  };

  // Pagination helpers (3 pages au début/fin, bloc central de 3 pages sinon)
  function getPagesToShow(current: number, total: number) {
    const pages: (number | string)[] = [];
    if (total <= 6) {
      for (let i = 1; i <= total; i++) pages.push(i);
      return pages;
    }
    if (current <= 3) {
      for (let i = 1; i <= 3; i++) pages.push(i);
      if (4 < total) pages.push('...');
      pages.push(total);
    } else if (current >= total - 2) {
      pages.push(1);
      if (total - 3 > 1) pages.push('...');
      for (let i = total - 2; i <= total; i++) if (i > 1) pages.push(i);
    } else {
      pages.push(1);
      if (current - 1 > 2) pages.push('...');
      for (let i = current - 1; i <= current + 1; i++) pages.push(i);
      if (current + 2 < total) pages.push('...');
      pages.push(total);
    }
    return pages;
  }
  const pagesToShow = getPagesToShow(page, totalPages);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">Explorer les créations</h1>
          <p className="text-muted-foreground">
            Découvrez des pièces uniques créées par notre communauté de créateurs passionnés.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar filtres */}
          <div>
            <ProductFilters
              categories={categories}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              sustainability={sustainability}
              setSustainability={setSustainability}
              onReset={resetFilters}
            />
          </div>
          {/* Main content */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* Barre d'outils */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1 flex gap-2 items-center">
                <Input
                  placeholder="Rechercher..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="max-w-xs"
                />
                {activeTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 ml-2">
                    {activeTags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="flex items-center gap-1 text-upcycle-purple border-upcycle-purple bg-upcycle-purple/10">
                        {tag}
                        <button onClick={resetFilters} className="ml-1"><X size={12} /></button>
                      </Badge>
                    ))}
                    <Button variant="ghost" size="sm" onClick={resetFilters} className="text-upcycle-purple">
                      Effacer les filtres
                    </Button>
                  </div>
                )}
              </div>
              <div className="flex gap-2 items-center">
                <Button
                  variant={view === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setView('grid')}
                  className={view === 'grid' ? 'bg-upcycle-purple text-white' : ''}
                >
                  <Grid2X2 className="h-4 w-4" />
                </Button>
                <Button
                  variant={view === 'list' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setView('list')}
                  className={view === 'list' ? 'bg-upcycle-purple text-white' : ''}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Select value={sort} onValueChange={v => setSort(v as any)}>
                  <SelectTrigger className="w-[180px] border-upcycle-purple">
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="newest">Plus récents</SelectItem>
                      <SelectItem value="price-asc">Prix croissant</SelectItem>
                      <SelectItem value="price-desc">Prix décroissant</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* Grille de produits */}
            <ProductGrid products={paginatedProducts} view={view} />
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                <Button
                  variant="outline"
                  className="rounded-full w-10 h-10 text-upcycle-purple border-upcycle-purple"
                  onClick={() => goToPage(page - 1)}
                  disabled={page === 1}
                >
                  {'<'}
                </Button>
                {pagesToShow.map((p, idx) =>
                  typeof p === 'number' ? (
                    <Button
                      key={p}
                      variant={page === p ? 'default' : 'outline'}
                      className={`rounded-full w-10 h-10 ${page === p ? 'bg-upcycle-purple text-white' : 'text-upcycle-purple border-upcycle-purple'}`}
                      onClick={() => goToPage(p)}
                    >
                      {p}
                    </Button>
                  ) : (
                    <span key={p + '-' + idx} className="w-10 h-10 flex items-center justify-center text-xl text-upcycle-purple">…</span>
                  )
                )}
                <Button
                  variant="outline"
                  className="rounded-full w-10 h-10 text-upcycle-purple border-upcycle-purple"
                  onClick={() => goToPage(page + 1)}
                  disabled={page === totalPages}
                >
                  {'>'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 