'use client';

import { useState } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { toggleFavorite } from "@/lib/actions/favorite"

interface FavoriteButtonProps {
  productId: string
  initialIsFavorite?: boolean
}

export function FavoriteButton({
  productId,
  initialIsFavorite = false,
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite)
  const [isLoading, setIsLoading] = useState(false)

  const handleToggleFavorite = async () => {
    try {
      setIsLoading(true)
      const { added } = await toggleFavorite(productId)
      setIsFavorite(added)
      toast.success(
        added ? "Produit ajouté aux favoris" : "Produit retiré des favoris"
      )
    } catch (error) {
      toast.error("Une erreur est survenue. Veuillez réessayer")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleToggleFavorite}
      disabled={isLoading}
      className={`${isFavorite ? "text-red-500" : ""} hover:bg-primary`}
    >
      <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
      <span className="sr-only">
        {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      </span>
    </Button>
  )
}
