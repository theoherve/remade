import { prisma } from "../prisma";

export type ProductWithRelations = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  categoryId: string;
  shopId: string;
  creatorId: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  materials: string[];
  techniques: string[];
  category: {
    id: string;
    name: string;
  };
  shop: {
    name: string;
    userId: string;
  };
  creator: {
    id: string;
    name: string | null;
    email: string;
  };
  reviews?: {
    id: string;
    rating: number;
    comment: string | null;
    user: {
      name: string | null;
    };
  }[];
};

export async function createProduct(data: {
  name: string;
  description: string;
  price: number;
  images: string[];
  categoryId: string;
  shopId: string;
  creatorId: string;
  stock?: number;
}) {
  return prisma.product.create({
    data,
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
    },
  });
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
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
}

export async function getProductsByShop(shopId: string) {
  return prisma.product.findMany({
    where: { shopId },
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
    },
  });
}

export async function updateProduct(
  id: string,
  data: {
    name?: string;
    description?: string;
    price?: number;
    images?: string[];
    categoryId?: string;
    shopId?: string;
    creatorId?: string;
    stock?: number;
  }
) {
  return prisma.product.update({
    where: { id },
    data,
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
    },
  });
}

export async function deleteProduct(id: string) {
  return prisma.product.delete({
    where: { id },
  });
}

export async function getProductsByCategory(categoryId: string) {
  return prisma.product.findMany({
    where: { categoryId },
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
    },
  });
}

export async function searchProducts(query: string) {
  return prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
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
    },
  });
}
