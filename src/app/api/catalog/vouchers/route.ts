import { requireAuth, ok, err } from "@/lib/api";
import prisma from "@/lib/prisma";
export async function GET() {
  const { session, error } = await requireAuth();
  if (error) return error;
  const orgId = (session!.user as any).organizationId;
  return ok(await prisma.voucher.findMany({ where: { organizationId: orgId }, orderBy: { createdAt: "desc" } }));
}
export async function POST(req: Request) {
  const { session, error } = await requireAuth();
  if (error) return error;
  const orgId = (session!.user as any).organizationId;
  const body = await req.json();
  if (!body.name || !body.code) return err("Name and code are required");
  return ok(await prisma.voucher.create({ data: { name: body.name, code: body.code.toUpperCase(), type: body.type || "PERCENTAGE", value: parseFloat(body.value || 0), minOrderValue: parseFloat(body.minOrderValue || 0), maxUses: body.maxUses ? parseInt(body.maxUses) : null, validFrom: body.validFrom ? new Date(body.validFrom) : null, validTo: body.validTo ? new Date(body.validTo) : null, isActive: body.isActive ?? true, organizationId: orgId } }), 201);
}
