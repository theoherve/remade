'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Grid2X2, List, Filter } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isSustainable?: boolean;
  productId: string;
}

interface CreatorProductsProps {
  products: Product[];
  accentColor?: string;
}

const CreatorProducts: React.FC<CreatorProductsProps> = ({ products, accentColor }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState('all');

  const accentStyle = {
    backgroundColor: accentColor || '#9b87f5',
    borderColor: accentColor || '#9b87f5',
    color: '#ffffff',
  };

  const categories = ['Vestes', 'T-shirts', 'Pantalons', 'Robes', 'Accessoires'];

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(p => p.category.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">Créations ({products.length})</h2>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Filter size={18} />
          </Button>
          <div className="border rounded-md flex">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="icon"
              className="rounded-r-none"
              onClick={() => setViewMode('grid')}
              style={viewMode === 'grid' ? accentStyle : {}}
            >
              <Grid2X2 size={18} />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="icon"
              className="rounded-l-none"
              onClick={() => setViewMode('list')}
              style={viewMode === 'list' ? accentStyle : {}}
            >
              <List size={18} />
            </Button>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="w-full md:w-auto overflow-x-auto">
          <TabsTrigger 
            value="all" 
            onClick={() => setActiveTab('all')}
            className={activeTab === 'all' ? 'bg-primary text-background' : ''}
            style={activeTab === 'all' ? accentStyle : {}}
          >
            Tout
          </TabsTrigger>
          {categories.map(category => (
            <TabsTrigger 
              key={category} 
              value={category.toLowerCase()}
              onClick={() => setActiveTab(category.toLowerCase())}
              className={activeTab === category.toLowerCase() ? 'bg-primary text-background' : ''}
              style={activeTab === category.toLowerCase() ? accentStyle : {}}
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="card-hover overflow-hidden border">
              <Link href={`/product/${product.productId}`}>
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isNew && (
                      <Badge style={accentStyle}>Nouveau</Badge>
                    )}
                    {product.isSustainable && (
                      <Badge className="bg-upcycle-teal hover:bg-upcycle-teal/90">Eco-responsable</Badge>
                    )}
                  </div>
                </div>
              </Link>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{product.name}</h3>
                  <span className="font-bold">{product.price.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">{product.category}</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full" style={accentStyle} asChild>
                  <Link href={`/product/${product.productId}`}>Voir le détail</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <Link href={`/product/${product.productId}`} className="md:w-1/4">
                  <div className="relative aspect-square md:aspect-auto md:h-full overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.isNew && (
                        <Badge style={accentStyle}>Nouveau</Badge>
                      )}
                      {product.isSustainable && (
                        <Badge className="bg-upcycle-teal hover:bg-upcycle-teal/90">Eco-responsable</Badge>
                      )}
                    </div>
                  </div>
                </Link>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-lg">{product.name}</h3>
                      <span className="font-bold">{product.price.toFixed(2)} €</span>
                    </div>
                    <div className="mb-4">
                      <span className="text-gray-500">{product.category}</span>
                    </div>
                  </div>
                  <Button style={accentStyle} asChild>
                    <Link href={`/product/${product.productId}`}>Voir le détail</Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreatorProducts;
