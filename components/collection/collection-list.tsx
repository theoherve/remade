import Link from "next/link"
import { CollectionWithProducts } from "@/lib/actions/collection"
import { ProductCard } from "@/components/product/product-card"

interface CollectionListProps {
  collections: CollectionWithProducts[]
}

export function CollectionList({ collections }: CollectionListProps) {
  return (
    <div className="space-y-8">
      {collections.map((collection) => (
        <div key={collection.id} className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                {collection.name}
              </h2>
              {collection.description && (
                <p className="text-muted-foreground">{collection.description}</p>
              )}
            </div>
            <Link
              href={`/collections/${collection.id}`}
              className="text-sm font-medium text-primary hover:underline"
            >
              Voir tout
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {collection.products.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                productId={product.id}
                name={product.name}
                price={product.price}
                images={product.images}
                shopName={product.shop.name}
                creatorName={product.creator.name}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
} 