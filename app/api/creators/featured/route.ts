import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const creators = await prisma.user.findMany({
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
    });

    return NextResponse.json(creators);
  } catch (error) {
    console.error("Error fetching featured creators:", error);
    return NextResponse.json(
      { error: "Failed to fetch featured creators" },
      { status: 500 }
    );
  }
}
