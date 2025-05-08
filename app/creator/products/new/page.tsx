import { Metadata } from "next"
import { ProductForm } from "@/components/product/product-form"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { getShopByUserId } from "@/lib/actions/shop"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/actions/auth"

export const metadata: Metadata = {
  title: "Nouveau produit",
  description: "Créez un nouveau produit pour votre boutique",
}

export default async function NewProductPage() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect("/login")
  }

  const shop = await getShopByUserId(user.id)

  if (!shop) {
    redirect("/creator/shop/new")
  }

  return (
    <ProtectedRoute requireCreator>
      <div className="container max-w-2xl py-10">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Créer un nouveau produit
            </h1>
            <p className="text-muted-foreground">
              Ajoutez un nouveau produit à votre boutique
            </p>
          </div>
          <ProductForm shopId={shop.id} />
        </div>
      </div>
    </ProtectedRoute>
  )
} 