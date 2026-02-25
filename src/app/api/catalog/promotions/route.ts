import { requireAuth, ok, err } from "@/lib/api";
import prisma from "@/lib/prisma";
export async function GET() {
  const { session, error } = await requireAuth();
  if (error) return error;
  const orgId = (session!.user as any).organizationId;
  return ok(await prisma.promotion.findMany({ where: { organizationId: orgId }, orderBy: { createdAt: "desc" } }));
}
export async function POST(req: Request) {
  const { session, error } = await requireAuth();
  if (error) return error;
  const orgId = (session!.user as any).organizationId;
  const body = await req.json();
  if (!body.name) return err("Name is required");
  return ok(await prisma.promotion.create({ data: { name: body.name, type: body.type || "PERCENTAGE", value: parseFloat(body.value || 0), validFrom: body.validFrom ? new Date(body.validFrom) : null, validTo: body.validTo ? new Date(body.validTo) : null, isActive: body.isActive ?? true, organizationId: orgId } }), 201);
}
