'use client';

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { ImageUpload } from "@/components/ui/image-upload"
import { createProduct, updateProduct } from "@/lib/actions/product"
import { ProductWithRelations } from "@/lib/actions/product"
import { getCurrentUser } from "@/lib/actions/auth"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  description: z.string().min(10, {
    message: "La description doit contenir au moins 10 caractères.",
  }),
  price: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Le prix doit être un nombre positif.",
  }),
  images: z.array(z.string()).min(1, {
    message: "Au moins une image est requise.",
  }),
  categoryId: z.string({
    required_error: "La catégorie est requise.",
  }),
})

interface ProductFormProps {
  initialData?: ProductWithRelations
  shopId: string
}

export function ProductForm({ initialData, shopId }: ProductFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: initialData?.price.toString() || "",
      images: initialData?.images || [],
      categoryId: initialData?.categoryId || "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const user = await getCurrentUser()
      if (!user) {
        throw new Error("Non autorisé")
      }

      const data = {
        name: values.name,
        description: values.description,
        price: parseFloat(values.price),
        images: values.images,
        categoryId: values.categoryId,
        shopId,
        creatorId: user.id,
        stock: 1, // Valeur par défaut
      }

      if (initialData) {
        await updateProduct(initialData.id, data)
        toast("Produit mis à jour", {
          description: "Votre produit a été mis à jour avec succès.",
        })
      } else {
        await createProduct(data)
        toast("Produit créé", {
          description: "Votre produit a été créé avec succès.",
        })
      }

      router.push("/creator/dashboard")
      router.refresh()
    } catch (error) {
      toast("Erreur", {
        description: "Une erreur est survenue. Veuillez réessayer.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du produit</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: Robe vintage remaniée"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Décrivez votre produit..."
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prix (€)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="29.99"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catégorie</FormLabel>
              <FormControl>
                <Input
                  placeholder="ID de la catégorie"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  disabled={isLoading}
                  onChange={field.onChange}
                  onRemove={(url) =>
                    field.onChange(field.value.filter((current) => current !== url))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading
            ? initialData
              ? "Mise à jour..."
              : "Création..."
            : initialData
            ? "Mettre à jour"
            : "Créer"}
        </Button>
      </form>
    </Form>
  )
}
