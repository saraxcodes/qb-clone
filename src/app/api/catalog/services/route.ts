import { requireAuth, ok, err } from "@/lib/api";
import prisma from "@/lib/prisma";
export async function GET() {
  const { session, error } = await requireAuth();
  if (error) return error;
  const orgId = (session!.user as any).organizationId;
  return ok(await prisma.service.findMany({ where: { organizationId: orgId }, include: { serviceGroup: { select: { name: true } } }, orderBy: { createdAt: "desc" } }));
}
export async function POST(req: Request) {
  const { session, error } = await requireAuth();
  if (error) return error;
  const orgId = (session!.user as any).organizationId;
  const body = await req.json();
  if (!body.name) return err("Name is required");
  return ok(await prisma.service.create({ data: { name: body.name, description: body.description, price: parseFloat(body.price || 0), duration: body.duration ? parseInt(body.duration) : null, serviceGroupId: body.serviceGroupId || null, organizationId: orgId } }), 201);
}
