const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const { config } = require("dotenv");
const { resolve } = require("path");

config({ path: resolve(__dirname, ".env") });

const prisma = new PrismaClient();

async function main() {
  const login = process.env.ADMIN_LOGIN || "admin";
  const password = process.env.ADMIN_PASSWORD || "wedding2025";
  const hashed = await bcrypt.hash(password, 10);

  await prisma.admin.upsert({
    where: { login },
    update: {},
    create: { login, password: hashed },
  });

  console.log(`Admin user "${login}" created/verified`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
