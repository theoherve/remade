import { prisma } from "@/lib/prisma";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FeaturedCreators from "@/components/home/FeaturedCreators";
import MainCategories from '@/components/home/MainCategories';
import HowItWorks from '@/components/home/HowItWorks';
import CallToAction from '@/components/home/CallToAction';
import { Product, User } from "@prisma/client";

type ProductWithRelations = Product & {
  category: { name: string };
  shop: {
    name: string;
    user: {
      name: string | null;
      profile: {
        id: string;
        avatar: string | null;
        bio: string | null;
        location: string | null;
        phoneNumber: string | null;
      } | null;
    };
  };
};

type CreatorWithRelations = {
  id: string;
  name: string | null;
  email: string;
  profile: {
    avatar: string | null;
    bio: string | null;
  } | null;
  shop: {
    name: string;
  } | null;
};

export default async function HomePage() {
  let featuredProducts: ProductWithRelations[] = [];
  let featuredCreators: CreatorWithRelations[] = [];

  try {
    // Pré-charger les données côté serveur
    [featuredProducts, featuredCreators] = await Promise.all([
      prisma.product.findMany({
        take: 8,
        where: {
          status: "ACTIVE",
        },
        include: {
          category: {
            select: {
              name: true,
            },
          },
          shop: {
            select: {
              name: true,
              user: {
                select: {
                  name: true,
                  profile: {
                    select: {
                      id: true,
                      avatar: true,
                      bio: true,
                      location: true,
                      phoneNumber: true,
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.user.findMany({
        where: {
          role: "CREATOR",
        },
        select: {
          id: true,
          name: true,
          email: true,
          profile: {
            select: {
              avatar: true,
              bio: true,
            },
          },
          shop: {
            select: {
              name: true,
            },
          },
        },
        take: 6,
        orderBy: {
          createdAt: "desc",
        },
      }),
    ]);
  } catch (error) {
    console.error("Error fetching data for homepage:", error);
    // En cas d'erreur, on continue avec des tableaux vides
  }

  return (
    <main>
      <MainCategories />
      <FeaturedProducts initialProducts={featuredProducts} />
      <FeaturedCreators initialCreators={featuredCreators} />
      <HowItWorks />
      <CallToAction />
    </main>
  );
}
