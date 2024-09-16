import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

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
