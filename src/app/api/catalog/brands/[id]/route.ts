import { requireAuth, ok } from "@/lib/api";
import prisma from "@/lib/prisma";
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAuth();
  if (error) return error;
  const { id } = await params;
  const body = await req.json();
  const item = await prisma.brand.update({ where: { id }, data: { name: body.name, description: body.description } });
  return ok(item);
}
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAuth();
  if (error) return error;
  const { id } = await params;
  await prisma.brand.delete({ where: { id } });
  return ok({ success: true });
}
