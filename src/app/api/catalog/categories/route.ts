import { requireAuth, ok, err } from "@/lib/api";
import prisma from "@/lib/prisma";

export async function GET() {
  const { session, error } = await requireAuth();
  if (error) return error;
  const orgId = (session!.user as any).organizationId;
  const data = await prisma.category.findMany({
    where: { organizationId: orgId },
    include: { parent: { select: { name: true } }, _count: { select: { products: true, children: true } } },
    orderBy: { createdAt: "desc" },
  });
  return ok(data);
}

export async function POST(req: Request) {
  const { session, error } = await requireAuth();
  if (error) return error;
  const orgId = (session!.user as any).organizationId;
  const body = await req.json();
  if (!body.name) return err("Name is required");
  const item = await prisma.category.create({
    data: { name: body.name, description: body.description, image: body.image, parentId: body.parentId || null, organizationId: orgId },
  });
  return ok(item, 201);
}
