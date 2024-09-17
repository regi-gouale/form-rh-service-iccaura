import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { firstName, lastName, email, churchId } = await request.json();

  try {
    const existingPerson = await prisma.person.findUnique({
      where: {
        email: email,
      },
    });
    if (existingPerson) {
      const updatedPerson = await prisma.person.update({
        where: {
          id: existingPerson.id,
        },
        data: {
          firstName: firstName,
          lastName: lastName,
          churchId: churchId,
        },
      });
      return NextResponse.json(updatedPerson, { status: 200 });
    }

    const newPerson = await prisma.person.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        churchId: churchId,
      },
    });
    return NextResponse.json(newPerson, { status: 201 });
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
    const person = await prisma.person.findUnique({
      where: {
        id: personId!,
      },
    });
    return NextResponse.json(person, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
