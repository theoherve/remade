import { notFound, redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/actions/auth"
import { getProductById } from "@/lib/actions/product"
import { ProductForm } from "@/components/product/product-form"

interface EditProductPageProps {
  params: {
    productId: string
  }
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const user = await getCurrentUser()

  if (!user || user.role !== "CREATOR") {
    redirect("/login")
  }

  const product = await getProductById(params.productId)

  if (!product || product.creatorId !== user.id) {
    notFound()
  }

  return (
    <div className="container max-w-4xl py-10">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Modifier le produit</h1>
          <p className="text-muted-foreground">
            Modifiez les informations de votre produit
          </p>
        </div>
        <ProductForm 
          initialData={product}
          shopId={product.shopId}
        />
      </div>
    </div>
  )
} 