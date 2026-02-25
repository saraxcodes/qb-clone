import { requireAuth, ok, err } from "@/lib/api";
import prisma from "@/lib/prisma";
export async function GET() {
  const { session, error } = await requireAuth();
  if (error) return error;
  const orgId = (session!.user as any).organizationId;
  const data = await prisma.manufacturer.findMany({ where: { organizationId: orgId }, include: { _count: { select: { products: true } } }, orderBy: { createdAt: "desc" } });
  return ok(data);
}
export async function POST(req: Request) {
  const { session, error } = await requireAuth();
  if (error) return error;
  const orgId = (session!.user as any).organizationId;
  const body = await req.json();
  if (!body.name) return err("Name is required");
  const item = await prisma.manufacturer.create({ data: { name: body.name, description: body.description, organizationId: orgId } });
  return ok(item, 201);
}
