"use server";

import { prisma } from "@/lib/prisma";

export async function getShopProducts(shopId: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        creatorId: shopId,
      },
      include: {
        creator: true,
      },
    });
    return products;
  } catch (error) {
    console.error("Error fetching shop products:", error);
    throw new Error("Failed to fetch shop products");
  }
}

export async function getShopDetails(shopId: string) {
  try {
    const shop = await prisma.user.findUnique({
      where: {
        id: shopId,
      },
      include: {
        products: true,
      },
    });
    return shop;
  } catch (error) {
    console.error("Error fetching shop details:", error);
    throw new Error("Failed to fetch shop details");
  }
}

export async function getShopByUserId(userId: string) {
  try {
    const shop = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        products: true,
      },
    });
    return shop;
  } catch (error) {
    console.error("Error fetching shop by user ID:", error);
    throw new Error("Failed to fetch shop by user ID");
  }
}
