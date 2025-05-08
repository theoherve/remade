import { Product } from '@prisma/client';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { FavoriteButton } from './favorite-button';

interface ProductCardProps {
  product: Product & {
    category: { name: string };
    shop: {
      user: {
        profile: {
          name: string;
          avatarUrl: string | null;
        };
      };
    };
  };
  creatorName: string;
  creatorAvatar: string | null;
  isFavorite?: boolean;
}

export default function ProductCard({ product, creatorName, creatorAvatar, isFavorite = false }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow duration-200">
        <CardContent className="p-4">
          <div className="relative aspect-square mb-4">
            <Image
              src={product.images[0] || '/placeholder-product.jpg'}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
            <div className="absolute top-2 left-2 flex flex-col gap-2">
              {new Date(product.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000 && (
                <Badge className="bg-upcycle-purple hover:bg-upcycle-purple/90">Nouveau</Badge>
              )}
              {product.materials.some(material => material.toLowerCase().includes('recyclé') || material.toLowerCase().includes('bio')) && (
                <Badge variant="secondary" className="bg-upcycle-light-purple hover:bg-upcycle-light-purple/90">
                  Éco-responsable
                </Badge>
              )}
            </div>
            <div className="absolute top-2 right-2">
              <FavoriteButton productId={product.id} initialIsFavorite={isFavorite} />
            </div>
          </div>
          <h3 className="font-semibold mb-2">{product.name}</h3>
          <div className="flex items-center gap-2 mb-2">
            {creatorAvatar && (
              <Image
                src={creatorAvatar}
                alt={creatorName}
                width={24}
                height={24}
                className="rounded-full"
              />
            )}
            <p className="text-sm text-muted-foreground">
              Par {creatorName || 'Anonyme'}
            </p>
          </div>
          <p className="font-bold">{product.price.toFixed(2)} €</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button className="w-full bg-upcycle-purple hover:bg-upcycle-purple/90">Voir le produit</Button>
        </CardFooter>
      </Card>
    </Link>
  );
} 