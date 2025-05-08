import { prisma } from "../prisma";
import { ProductWithRelations } from "./product";

export async function getFeaturedProducts(
  limit: number = 6
): Promise<ProductWithRelations[]> {
  // Récupérer les produits les plus récents qui sont actifs
  const products = await prisma.product.findMany({
    where: {
      status: "ACTIVE",
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
    include: {
      category: true,
      shop: {
        select: {
          name: true,
          userId: true,
        },
      },
      creator: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      reviews: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return products;
}
