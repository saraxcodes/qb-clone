import { requireAuth, ok } from "@/lib/api";
import prisma from "@/lib/prisma";
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAuth();
  if (error) return error;
  const { id } = await params;
  const body = await req.json();
  return ok(await prisma.service.update({ where: { id }, data: { name: body.name, description: body.description, price: parseFloat(body.price || 0), duration: body.duration ? parseInt(body.duration) : null, serviceGroupId: body.serviceGroupId || null } }));
}
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAuth();
  if (error) return error;
  const { id } = await params;
  await prisma.service.delete({ where: { id } });
  return ok({ success: true });
}
