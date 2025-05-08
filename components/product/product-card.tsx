'use client';

import Image from "next/image"
import Link from "next/link"
import { formatPrice } from "@/lib/utils"
import { FavoriteButton } from "./favorite-button"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  id: string
  name: string
  price: number
  images: string[]
  shopName: string
  creatorName: string | null
  productId: string
  createdAt?: Date
  materials?: string[]
}

export function ProductCard({
  id,
  name,
  price,
  images,
  shopName,
  creatorName,
  productId,
  createdAt,
  materials = [],
}: ProductCardProps) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const response = await fetch(`/api/favorites/check/${id}`);
        if (response.ok) {
          const data = await response.json();
          setIsFav(data.isFavorite);
        }
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };

    checkFavorite();
  }, [id]);

  return (
    <div className="group relative overflow-hidden border bg-white transition-all hover:shadow-lg">
      <div className="absolute right-2 top-2 z-10">
        <FavoriteButton productId={id} initialIsFavorite={isFav} />
      </div>
      <Link href={`/product/${productId}`}>
        <div className="aspect-square relative">
          <Image
            src={images[0]}
            alt={name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute top-2 left-2 flex flex-col gap-2 z-10">
            {createdAt && new Date(createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000 && (
              <Badge className="bg-upcycle-purple hover:bg-upcycle-purple/90 whitespace-nowrap w-fit">
                Nouveau
              </Badge>
            )}
            {materials.some(material => 
              material === "Laine recyclée" || 
              material === "Coton bio" ||
              material === "Tissu recyclé" ||
              material === "Fibres naturelles" ||
              material === "Chanvre bio" ||
              material === "Bambou" ||
              material === "Laine éthique" ||
              material === "Coton recyclé" ||
              material === "Fibres recyclées" ||
              material === "Matières durables" ||
              material === "Textile écologique" ||
              material === "Fibres végétales"
            ) && (
              <Badge variant="secondary" className="bg-upcycle-light-purple hover:bg-upcycle-light-purple/90 whitespace-nowrap w-fit">
                Éco-responsable
              </Badge>
            )}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="mt-1 text-sm text-gray-500">{creatorName || 'Créateur inconnu'}</p>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-lg font-medium text-gray-900">
              {formatPrice(price)}
            </p>
            <p className="text-sm text-gray-500">{shopName}</p>
          </div>
        </div>
      </Link>
    </div>
  )
} 