import { requireAuth, ok, err } from "@/lib/api";
import prisma from "@/lib/prisma";
export async function GET() {
  const { session, error } = await requireAuth();
  if (error) return error;
  const orgId = (session!.user as any).organizationId;
  return ok(await prisma.tax.findMany({ where: { organizationId: orgId }, orderBy: { createdAt: "desc" } }));
}
export async function POST(req: Request) {
  const { session, error } = await requireAuth();
  if (error) return error;
  const orgId = (session!.user as any).organizationId;
  const body = await req.json();
  if (!body.name || body.rate === undefined) return err("Name and rate are required");
  return ok(await prisma.tax.create({ data: { name: body.name, rate: parseFloat(body.rate), type: body.type || "PERCENTAGE", organizationId: orgId } }), 201);
}
