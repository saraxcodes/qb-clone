import { requireAuth, ok, err } from "@/lib/api";
import prisma from "@/lib/prisma";
export async function GET() {
  const { session, error } = await requireAuth();
  if (error) return error;
  const orgId = (session!.user as any).organizationId;
  return ok(await prisma.combo.findMany({ where: { organizationId: orgId }, include: { items: { include: { product: { select: { name: true } } } } }, orderBy: { createdAt: "desc" } }));
}
export async function POST(req: Request) {
  const { session, error } = await requireAuth();
  if (error) return error;
  const orgId = (session!.user as any).organizationId;
  const body = await req.json();
  if (!body.name || body.price === undefined) return err("Name and price are required");
  return ok(await prisma.combo.create({ data: { name: body.name, description: body.description, price: parseFloat(body.price), isActive: body.isActive ?? true, organizationId: orgId } }), 201);
}
