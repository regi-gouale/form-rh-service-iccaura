import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

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

    const matchingResult = await prisma.result.findFirst({
      where: {
        personId: personId,
      },
    });

    if (matchingResult) {
      const updatedScores = await prisma.result.update({
        where: {
          personId: personId,
        },
        data: {
          scores: scores,
        },
      });
      return NextResponse.json(updatedScores, { status: 409 });
    }

    const createdScores = await prisma.result.create({
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

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const personId = url.searchParams.get("id");

  try {
    if (!personId) {
      return NextResponse.json(
        { error: "Person ID is required" },
        { status: 400 }
      );
    }
    const resultData = await prisma.result.findFirst({
      where: {
        personId: personId!,
      },
    });
    return NextResponse.json(resultData, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
