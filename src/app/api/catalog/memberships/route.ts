import { requireAuth, ok, err } from "@/lib/api";
import prisma from "@/lib/prisma";
export async function GET() {
  const { session, error } = await requireAuth();
  if (error) return error;
  const orgId = (session!.user as any).organizationId;
  return ok(await prisma.membership.findMany({ where: { organizationId: orgId }, orderBy: { createdAt: "desc" } }));
}
export async function POST(req: Request) {
  const { session, error } = await requireAuth();
  if (error) return error;
  const orgId = (session!.user as any).organizationId;
  const body = await req.json();
  if (!body.name) return err("Name is required");
  return ok(await prisma.membership.create({ data: { name: body.name, description: body.description, price: parseFloat(body.price || 0), durationDays: parseInt(body.durationDays || 30), discountPct: parseFloat(body.discountPct || 0), isActive: body.isActive ?? true, organizationId: orgId } }), 201);
}
