import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const featuredProducts = await prisma.product.findMany({
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
    });

    return NextResponse.json(featuredProducts);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return NextResponse.json(
      { error: "Failed to fetch featured products" },
      { status: 500 }
    );
  }
}
