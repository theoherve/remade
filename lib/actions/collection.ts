import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "./auth";

export type CollectionWithProducts = {
  id: string;
  name: string;
  description: string | null;
  isPublic: boolean;
  products: {
    id: string;
    name: string;
    price: number;
    images: string[];
    shop: {
      name: string;
    };
    creator: {
      name: string | null;
    };
  }[];
};

export async function getCollections() {
  const user = await getCurrentUser();
  if (!user) throw new Error("Non autorisé");

  const collections = await prisma.collection.findMany({
    where: {
      userId: user.id,
    },
    include: {
      products: {
        include: {
          product: {
            include: {
              shop: {
                select: {
                  name: true,
                },
              },
              creator: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return collections.map(
    (collection: {
      id: string;
      name: string;
      description: string | null;
      isPublic: boolean;
      products: {
        product: {
          id: string;
          name: string;
          price: number;
          images: string[];
          shop: {
            name: string;
          };
          creator: {
            name: string | null;
          };
        };
      }[];
    }) => ({
      id: collection.id,
      name: collection.name,
      description: collection.description,
      isPublic: collection.isPublic,
      products: collection.products.map(
        (cp: {
          product: {
            id: string;
            name: string;
            price: number;
            images: string[];
            shop: {
              name: string;
            };
            creator: {
              name: string | null;
            };
          };
        }) => ({
          id: cp.product.id,
          name: cp.product.name,
          price: cp.product.price,
          images: cp.product.images,
          shop: cp.product.shop,
          creator: cp.product.creator,
        })
      ),
    })
  );
}

export async function createCollection(data: {
  name: string;
  description?: string;
  isPublic?: boolean;
}) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Non autorisé");

  const collection = await prisma.collection.create({
    data: {
      name: data.name,
      description: data.description,
      isPublic: data.isPublic ?? true,
      userId: user.id,
    },
  });

  return collection;
}

export async function updateCollection(
  id: string,
  data: {
    name?: string;
    description?: string;
    isPublic?: boolean;
  }
) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Non autorisé");

  const collection = await prisma.collection.findUnique({
    where: { id },
  });

  if (!collection) throw new Error("Collection non trouvée");
  if (collection.userId !== user.id) throw new Error("Non autorisé");

  const updatedCollection = await prisma.collection.update({
    where: { id },
    data,
  });

  return updatedCollection;
}

export async function deleteCollection(id: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Non autorisé");

  const collection = await prisma.collection.findUnique({
    where: { id },
  });

  if (!collection) throw new Error("Collection non trouvée");
  if (collection.userId !== user.id) throw new Error("Non autorisé");

  await prisma.collection.delete({
    where: { id },
  });
}

export async function addProductToCollection(
  collectionId: string,
  productId: string
) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Non autorisé");

  const collection = await prisma.collection.findUnique({
    where: { id: collectionId },
  });

  if (!collection) throw new Error("Collection non trouvée");
  if (collection.userId !== user.id) throw new Error("Non autorisé");

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) throw new Error("Produit non trouvé");

  const collectionProduct = await prisma.collectionProduct.create({
    data: {
      collectionId,
      productId,
    },
  });

  return collectionProduct;
}

export async function removeProductFromCollection(
  collectionId: string,
  productId: string
) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Non autorisé");

  const collection = await prisma.collection.findUnique({
    where: { id: collectionId },
  });

  if (!collection) throw new Error("Collection non trouvée");
  if (collection.userId !== user.id) throw new Error("Non autorisé");

  await prisma.collectionProduct.delete({
    where: {
      collectionId_productId: {
        collectionId,
        productId,
      },
    },
  });
}
