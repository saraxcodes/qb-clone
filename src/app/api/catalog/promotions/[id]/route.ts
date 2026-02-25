import { requireAuth, ok } from "@/lib/api";
import prisma from "@/lib/prisma";
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAuth();
  if (error) return error;
  const { id } = await params;
  const body = await req.json();
  return ok(await prisma.promotion.update({ where: { id }, data: { name: body.name, type: body.type, value: parseFloat(body.value), validFrom: body.validFrom ? new Date(body.validFrom) : null, validTo: body.validTo ? new Date(body.validTo) : null, isActive: body.isActive } }));
}
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAuth();
  if (error) return error;
  const { id } = await params;
  await prisma.promotion.delete({ where: { id } });
  return ok({ success: true });
}
