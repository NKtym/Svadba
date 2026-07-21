import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { fullName, attending, plusOne, plusOneName, allergies, drinkPreferences, foodPreferences } = body;

  if (!fullName || typeof attending !== "boolean") {
    return NextResponse.json({ error: "Заполните обязательные поля" }, { status: 400 });
  }

  if (attending && plusOne && !plusOneName) {
    return NextResponse.json({ error: "Укажите ФИО гостя" }, { status: 400 });
  }

  await prisma.response.create({
    data: {
      fullName,
      attending,
      plusOne: !!plusOne,
      plusOneName: attending && plusOne ? plusOneName : null,
      allergies: allergies || null,
      drinkPreferences: drinkPreferences || null,
      foodPreferences: foodPreferences || null,
    },
  });

  return NextResponse.json({ success: true });
}
