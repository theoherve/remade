import { prisma } from "../prisma";

export type CreatorWithDetails = {
  id: string;
  name: string | null;
  email: string;
  profile: {
    avatar: string | null;
    bio: string | null;
    location: string | null;
  } | null;
  shop: {
    id: string;
    name: string;
    description: string | null;
    banner: string | null;
    logo: string | null;
    theme: any;
  } | null;
  _count: {
    products: number;
  };
};

export async function getCreators() {
  const creators = await prisma.user.findMany({
    where: {
      role: "CREATOR",
    },
    include: {
      profile: true,
      shop: true,
      _count: {
        select: {
          products: true,
        },
      },
    },
  });

  return creators;
}

export async function getCreatorById(id: string) {
  const creator = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
      shop: true,
      products: {
        include: {
          category: true,
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
      },
      _count: {
        select: {
          products: true,
        },
      },
    },
  });

  if (!creator) {
    throw new Error("Créateur non trouvé");
  }

  return creator;
}
