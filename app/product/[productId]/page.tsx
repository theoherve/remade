import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { formatPrice } from "@/lib/utils"
import { getProductById } from "@/lib/actions/product"
import { Button } from "@/components/ui/button"

interface ProductPageProps {
  params: {
    productId: string
  }
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProductById(params.productId)

  if (!product) {
    return {
      title: "Produit non trouvé",
    }
  }

  return {
    title: product.name,
    description: product.description,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.productId)

  if (!product) {
    notFound()
  }

  return (
    <div className="container py-10">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="aspect-square relative rounded-lg overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.slice(1).map((image, index) => (
                <div
                  key={index}
                  className="aspect-square relative rounded-lg overflow-hidden"
                >
                  <Image
                    src={image}
                    alt={`${product.name} - Image ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
            <p className="text-2xl font-semibold text-gray-900 mt-2">
              {formatPrice(product.price)}
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Créateur</h2>
            <Link
              href={`/creators/${product.creator.id}`}
              className="text-gray-600 hover:text-gray-900"
            >
              {product.creator.name}
            </Link>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Boutique</h2>
            <Link
              href={`/creators/${product.creator.id}/shop`}
              className="text-gray-600 hover:text-gray-900"
            >
              {product.shop.name}
            </Link>
          </div>
          <Button className="w-full">Ajouter au panier</Button>
        </div>
      </div>
    </div>
  )
} 