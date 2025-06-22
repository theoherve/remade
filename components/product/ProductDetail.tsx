'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, Share2, ShoppingCart, Star, Check, Recycle } from 'lucide-react';
import { toast } from 'sonner';

interface ProductDetailProps {
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    story: string;
    materials: string[];
    images: string[];
    category: string;
    size: string;
    condition: string;
    isNew?: boolean;
    isSustainable?: boolean;
    creator: {
      id: string;
      name: string;
      username: string;
      avatar: string;
      rating: number;
      pageSettings?: {
        accentColor?: string;
      };
    };
  };
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.size);

  const handleAddToCart = () => {
    toast.success(`${product.name} a été ajouté à votre panier.`);
  };

  return (
    <section className="py-12 bg-neutral-500 text-foreground">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden border border-primary/20">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-md border border-primary/20 ${selectedImage === index ? 'ring-2 ring-primary' : ''}`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <div className="flex gap-2 mb-3">
                {product.isNew && <Badge>Nouveau</Badge>}
                {product.isSustainable && (
                  <Badge variant="outline" className="border-green-600 text-green-600">
                    Eco-responsable
                  </Badge>
                )}
                <Badge variant="outline">{product.category}</Badge>
              </div>
              <h1 className="text-3xl font-bold font-unbounded mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-2xl font-bold font-unbounded">{product.price.toFixed(2)} €</h2>
                <div className="text-sm text-muted-foreground">Pièce unique</div>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <Link href={`/creator/${product.creator.id}`} className="flex items-center gap-2">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={product.creator.avatar} alt={product.creator.name} />
                    <AvatarFallback>{product.creator.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">{product.creator.name}</span>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-sm">{product.creator.rating}</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full grid grid-cols-3 bg-primary-100 text-primary">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="story">Histoire</TabsTrigger>
                <TabsTrigger value="details">Détails</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="py-4">
                <p className="text-muted-foreground">{product.description}</p>
              </TabsContent>
              <TabsContent value="story" className="py-4">
                <p className="text-muted-foreground">{product.story}</p>
                <div className="flex items-center gap-2 mt-4">
                  <Recycle size={20} className="text-green-600" />
                  <span className="text-sm text-green-600">
                    Ce vêtement a permis d'économiser environ 2700 litres d'eau par rapport à une production neuve
                  </span>
                </div>
              </TabsContent>
              <TabsContent value="details" className="py-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taille</span>
                    <span className="font-medium">{product.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">État</span>
                    <span className="font-medium">{product.condition}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Matériaux</span>
                    <div className="text-right">
                      {product.materials.map((material, index) => (
                        <span key={index} className="font-medium block">{material}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="pt-4">
              <div className="mb-4">
                <h3 className="font-medium mb-2">Taille</h3>
                <div className="flex gap-2">
                  {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? 'default' : 'outline'}
                      onClick={() => setSelectedSize(size)}
                      className="w-12 h-12"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="flex-1 h-12" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2" size={18} />
                  Ajouter au panier
                </Button>
                <Button variant="outline" size="icon" className="w-12 h-12">
                  <Heart size={20} />
                </Button>
                <Button variant="outline" size="icon" className="w-12 h-12">
                  <Share2 size={20} />
                </Button>
              </div>

              <div className="mt-6 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Check size={18} className="text-green-500" />
                  <span>Expédition sous 1-3 jours ouvrés</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={18} className="text-green-500" />
                  <span>Retours acceptés sous 14 jours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
