import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const responses = await prisma.response.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(responses);
}
