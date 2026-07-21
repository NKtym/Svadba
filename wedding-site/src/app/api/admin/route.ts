import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { login, password } = await req.json();

  const admin = await prisma.admin.findUnique({ where: { login } });
  if (!admin) {
    return NextResponse.json({ error: "Неверный логин" }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) {
    return NextResponse.json({ error: "Неверный пароль" }, { status: 401 });
  }

  return NextResponse.json({ success: true });
}
