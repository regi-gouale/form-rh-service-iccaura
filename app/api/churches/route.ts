import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const churches = await prisma.church.findMany();
    return NextResponse.json(churches);
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
