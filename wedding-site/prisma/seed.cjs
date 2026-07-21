const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const login = process.env.ADMIN_LOGIN || "admin";
  const password = process.env.ADMIN_PASSWORD || "wedding2025";
  const hashed = await bcrypt.hash(password, 10);

  const existing = await prisma.admin.findUnique({ where: { login } });
  if (existing) {
    await prisma.admin.update({ where: { login }, data: { password: hashed } });
    console.log(`Admin "${login}" password updated`);
  } else {
    await prisma.admin.create({ data: { login, password: hashed } });
    console.log(`Admin "${login}" created`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error("Seed error:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
