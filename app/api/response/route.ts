import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { personId, scores } = await request.json();
  try {
    const existingPerson = await prisma.person.findUnique({
      where: {
        id: personId,
      },
    });
    if (!existingPerson) {
      return NextResponse.json({ error: "Person not found" }, { status: 404 });
    }

    const createdScores = await prisma.response.create({
      data: {
        personId: personId,
        scores: scores,
      },
    });
    return NextResponse.json(createdScores, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
