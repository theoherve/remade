import { Metadata } from "next"
import { CollectionList } from "@/components/collection/collection-list"
import { CreateCollectionButton } from "@/components/collection/create-collection-button"
import { getCollections } from "@/lib/actions/collection"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/actions/auth"

export const metadata: Metadata = {
  title: "Mes collections",
  description: "Gérez vos collections de produits",
}

export default async function CollectionsPage() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect("/login")
  }

  const collections = await getCollections()

  return (
    <div className="container py-10">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Mes collections
            </h1>
            <p className="text-muted-foreground">
              Gérez vos collections de produits favoris
            </p>
          </div>
          <CreateCollectionButton />
        </div>
        <CollectionList collections={collections} />
      </div>
    </div>
  )
}
