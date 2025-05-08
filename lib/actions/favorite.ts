import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "./auth";

export type FavoriteWithProduct = {
  id: string;
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
    shop: {
      name: string;
    };
    creator: {
      name: string;
    };
  };
  createdAt: Date;
};

export async function getFavorites() {
  const user = await getCurrentUser();
  if (!user) throw new Error("Non autorisé");

  const favorites = await prisma.favorite.findMany({
    where: {
      userId: user.id,
    },
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
    orderBy: {
      createdAt: "desc",
    },
  });

  return favorites.map((favorite) => ({
    id: favorite.id,
    product: {
      id: favorite.product.id,
      name: favorite.product.name,
      price: favorite.product.price,
      images: favorite.product.images,
      shop: favorite.product.shop,
      creator: favorite.product.creator,
    },
    createdAt: favorite.createdAt,
  }));
}

export async function toggleFavorite(productId: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Non autorisé");

  const existingFavorite = await prisma.favorite.findUnique({
    where: {
      userId_productId: {
        userId: user.id,
        productId,
      },
    },
  });

  if (existingFavorite) {
    await prisma.favorite.delete({
      where: {
        id: existingFavorite.id,
      },
    });
    return { added: false };
  }

  const favorite = await prisma.favorite.create({
    data: {
      userId: user.id,
      productId,
    },
  });

  return { added: true, favorite };
}

export async function isFavorite(productId: string) {
  const user = await getCurrentUser();
  if (!user) return false;

  const favorite = await prisma.favorite.findUnique({
    where: {
      userId_productId: {
        userId: user.id,
        productId,
      },
    },
  });

  return !!favorite;
}
