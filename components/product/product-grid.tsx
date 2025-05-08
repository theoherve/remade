import { ProductCard } from "./product-card"
import { ProductWithRelations } from "@/lib/actions/product"

interface ProductGridProps {
  products: ProductWithRelations[]
  title?: string
  description?: string
}

export function ProductGrid({ products, title, description }: ProductGridProps) {
  return (
    <div className="space-y-6">
      {(title || description) && (
        <div className="space-y-2 text-center">
          {title && (
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          )}
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            productId={product.id}
            name={product.name}
            price={product.price}
            images={product.images}
            shopName={product.shop.name}
            creatorName={product.creator.name}
            createdAt={product.createdAt}
            materials={product.materials}
          />
        ))}
      </div>
    </div>
  )
} 