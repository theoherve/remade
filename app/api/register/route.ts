import { NextResponse } from "next/server";
import { createUser } from "@/lib/actions/user";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    const user = await createUser({ name, email, password });
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Erreur API register:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du compte" },
      { status: 500 }
    );
  }
}
