import "dotenv/config";
import { PrismaClient, UserRole, Plan } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  console.log("🌱 Seeding database...");

  // Create or find organization
  const org = await prisma.organization.upsert({
    where: { slug: "almustashar" },
    update: {},
    create: {
      name: "AL MUSTASHAR AGR MAT TR LLC",
      slug: "almustashar",
      plan: Plan.ENTERPRISE,
    },
  });

  console.log("✅ Organization:", org.name);

  // Create admin user
  const passwordHash = await bcrypt.hash("Gemini@007", 12);

  const admin = await prisma.user.upsert({
    where: { email: "khuram.imtiaz10@gmail.com" },
    update: { passwordHash },
    create: {
      name: "Khuram Imtiaz",
      email: "khuram.imtiaz10@gmail.com",
      passwordHash,
      role: UserRole.ADMIN,
      organizationId: org.id,
    },
  });

  console.log("✅ Admin user:", admin.email);

  // Create default store
  const store = await prisma.store.upsert({
    where: { id: "default-store" },
    update: {},
    create: {
      id: "default-store",
      name: "Main Store",
      address: "Dubai, UAE",
      organizationId: org.id,
    },
  });

  console.log("✅ Default store:", store.name);

  // Create default units
  const units = [
    { name: "Piece", shortName: "Pcs" },
    { name: "Kilogram", shortName: "KG" },
    { name: "Gram", shortName: "G" },
    { name: "Liter", shortName: "L" },
    { name: "Milliliter", shortName: "ML" },
    { name: "Box", shortName: "Box" },
    { name: "Dozen", shortName: "Dz" },
  ];

  for (const u of units) {
    await prisma.unit.upsert({
      where: { id: `unit-${u.shortName.toLowerCase()}` },
      update: {},
      create: { id: `unit-${u.shortName.toLowerCase()}`, ...u, organizationId: org.id },
    });
  }

  console.log("✅ Default units created");

  // Create default categories
  const categories = [
    "Seeds", "Fertilizer", "Insecticide", "Irrigation", "Tools", "Other"
  ];

  for (const name of categories) {
    await prisma.category.upsert({
      where: { id: `cat-${name.toLowerCase()}` },
      update: {},
      create: { id: `cat-${name.toLowerCase()}`, name, organizationId: org.id },
    });
  }

  console.log("✅ Default categories created");

  // Create default tax
  await prisma.tax.upsert({
    where: { id: "tax-vat5" },
    update: {},
    create: {
      id: "tax-vat5",
      name: "VAT 5%",
      rate: 5,
      organizationId: org.id,
    },
  });

  console.log("✅ Default tax created");

  console.log("\n🎉 Seed complete!");
  console.log("─────────────────────────────");
  console.log("Login: khuram.imtiaz10@gmail.com");
  console.log("Password: Gemini@007");
  console.log("─────────────────────────────");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
