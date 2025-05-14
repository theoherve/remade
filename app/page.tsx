'use client';

import { prisma } from "@/lib/prisma";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FeaturedCreators from "@/components/home/FeaturedCreators";
import MainCategories from '@/components/home/MainCategories';
import HowItWorks from '@/components/home/HowItWorks';
import CallToAction from '@/components/home/CallToAction';

export default async function HomePage() {
  // Pré-charger les données côté serveur
  const [featuredProducts, featuredCreators] = await Promise.all([
    prisma.product.findMany({
      take: 8,
      where: {
        status: "ACTIVE",
      },
      include: {
        category: true,
        shop: {
          select: {
            name: true,
            user: {
              include: {
                profile: true,
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
      include: {
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
