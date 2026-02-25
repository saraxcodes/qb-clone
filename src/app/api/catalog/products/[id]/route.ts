import { requireAuth, ok } from "@/lib/api";
import prisma from "@/lib/prisma";
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAuth();
  if (error) return error;
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id }, include: { category: true, brand: true, unit: true, tax: true, charge: true, manufacturer: true, incomeHead: true } });
  return ok(product);
}
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAuth();
  if (error) return error;
  const { id } = await params;
  const body = await req.json();
  const product = await prisma.product.update({
    where: { id },
    data: {
      name: body.name, description: body.description, sku: body.sku, barcode: body.barcode,
      hsnCode: body.hsnCode, price: parseFloat(body.price || 0), mrp: body.mrp ? parseFloat(body.mrp) : null,
      costPrice: parseFloat(body.costPrice || 0), size: body.size, color: body.color, image: body.image,
      isActive: body.isActive, manageInventory: body.manageInventory, priceIncludesTax: body.priceIncludesTax,
      categoryId: body.categoryId || null, brandId: body.brandId || null, manufacturerId: body.manufacturerId || null,
      incomeHeadId: body.incomeHeadId || null, unitId: body.unitId || null, taxId: body.taxId || null, chargeId: body.chargeId || null,
    },
  });
  return ok(product);
}
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAuth();
  if (error) return error;
  const { id } = await params;
  await prisma.product.delete({ where: { id } });
  return ok({ success: true });
}
