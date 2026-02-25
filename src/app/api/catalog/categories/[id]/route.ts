import { requireAuth, ok, err } from "@/lib/api";
import prisma from "@/lib/prisma";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { session, error } = await requireAuth();
  if (error) return error;
  const { id } = await params;
  const body = await req.json();
  const item = await prisma.category.update({
    where: { id },
    data: { name: body.name, description: body.description, image: body.image, parentId: body.parentId || null },
  });
  return ok(item);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAuth();
  if (error) return error;
  const { id } = await params;
  await prisma.category.delete({ where: { id } });
  return ok({ success: true });
}
