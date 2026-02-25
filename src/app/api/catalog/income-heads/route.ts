import { requireAuth, ok, err } from "@/lib/api";
import prisma from "@/lib/prisma";
export async function GET() {
  const { session, error } = await requireAuth();
  if (error) return error;
  const orgId = (session!.user as any).organizationId;
  return ok(await prisma.incomeHead.findMany({ where: { organizationId: orgId }, orderBy: { createdAt: "desc" } }));
}
export async function POST(req: Request) {
  const { session, error } = await requireAuth();
  if (error) return error;
  const orgId = (session!.user as any).organizationId;
  const body = await req.json();
  if (!body.name) return err("Name is required");
  return ok(await prisma.incomeHead.create({ data: { name: body.name, description: body.description, organizationId: orgId } }), 201);
}
