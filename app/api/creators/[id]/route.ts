import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const creator = await prisma.user.findUnique({
      where: {
        id: params.id,
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
      return NextResponse.json(
        { error: "Créateur non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(creator);
  } catch (error) {
    console.error("Error fetching creator:", error);
    return NextResponse.json(
      { error: "Failed to fetch creator" },
      { status: 500 }
    );
  }
}
