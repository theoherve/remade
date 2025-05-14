import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProductById } from "@/lib/actions/product"
import ProductDetail from "@/components/product/ProductDetail"

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

  // Adaptation pour correspondre à l'interface attendue par ProductDetail
  const productForDetail = {
    ...product,
    story: (product as any).story || "Cette pièce a une histoire unique, découvrez-la !",
    size: (product as any).size || "M",
    condition: (product as any).condition || "Excellent - Comme neuf",
    isNew: (product as any).isNew ?? true,
    isSustainable: (product as any).isSustainable ?? true,
    materials: product.materials || ["Denim recyclé (98% coton)", "Fil à broder", "Peinture textile écologique"],
    category: typeof product.category === 'string' ? product.category : (product.category?.name || "Veste"),
    creator: {
      id: product.creator.id,
      name: product.creator.name || "Créateur inconnu",
      username: (product as any).creator?.username || "user123",
      avatar: (product as any).creator?.avatar || "/default-avatar.png",
      rating: (product as any).creator?.rating || 4.8,
      pageSettings: (product as any).creator?.pageSettings || {},
    },
    images: product.images && product.images.length > 0 ? product.images : ["/default-product.jpg"],
  } as any // cast pour forcer la compatibilité

  return <ProductDetail product={productForDetail} />
} 