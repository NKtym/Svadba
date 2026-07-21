import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { login, password } = await req.json();

  const adminCount = await prisma.admin.count();
  if (adminCount === 0) {
    const defaultLogin = process.env.ADMIN_LOGIN || "admin";
    const defaultPassword = process.env.ADMIN_PASSWORD || "wedding2025";
    const hashed = await bcrypt.hash(defaultPassword, 10);
    await prisma.admin.create({
      data: { login: defaultLogin, password: hashed },
    });
    console.log("Admin auto-created:", defaultLogin);
  }

  const admin = await prisma.admin.findUnique({ where: { login } });
  if (!admin) {
    return NextResponse.json({ error: "Неверный логин или пароль" }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) {
    return NextResponse.json({ error: "Неверный логин или пароль" }, { status: 401 });
  }

  return NextResponse.json({ success: true });
}
