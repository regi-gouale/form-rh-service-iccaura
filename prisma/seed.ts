import { PrismaClient } from "@prisma/client";
import { kChurches } from "../constants/index";

const prisma = new PrismaClient();

async function main() {
  for (const church of kChurches) {
    const _church = await prisma.church.upsert({
      where: {
        name: church.label,
      },
      create: {
        name: church.label,
        address: church.address,
      },
      update: {},
    });
    console.log(`Church ${_church.name} created.`);
  }

  await prisma.$disconnect();
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
