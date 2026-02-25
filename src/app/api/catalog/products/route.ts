import { requireAuth, ok, err } from "@/lib/api";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { session, error } = await requireAuth();
  if (error) return error;
  const orgId = (session!.user as any).organizationId;
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const categoryId = searchParams.get("categoryId") || undefined;
  const brandId = searchParams.get("brandId") || undefined;

  const data = await prisma.product.findMany({
    where: {
      organizationId: orgId,
      ...(search && { name: { contains: search, mode: "insensitive" } }),
      ...(categoryId && { categoryId }),
      ...(brandId && { brandId }),
    },
    include: {
      category: { select: { name: true } },
      brand: { select: { name: true } },
      unit: { select: { name: true, shortName: true } },
      tax: { select: { name: true, rate: true } },
      _count: { select: { inventory: true, orderItems: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  return ok(data);
}

export async function POST(req: Request) {
  const { session, error } = await requireAuth();
  if (error) return error;
  const orgId = (session!.user as any).organizationId;
  const body = await req.json();
  if (!body.name) return err("Product name is required");

  const product = await prisma.product.create({
    data: {
      name: body.name,
      description: body.description || null,
      sku: body.sku || null,
      barcode: body.barcode || null,
      hsnCode: body.hsnCode || null,
      price: parseFloat(body.price || 0),
      mrp: body.mrp ? parseFloat(body.mrp) : null,
      costPrice: parseFloat(body.costPrice || 0),
      size: body.size || null,
      color: body.color || null,
      image: body.image || null,
      isActive: body.isActive ?? true,
      manageInventory: body.manageInventory ?? false,
      priceIncludesTax: body.priceIncludesTax ?? false,
      autoBarcode: body.autoBarcode ?? false,
      categoryId: body.categoryId || null,
      brandId: body.brandId || null,
      manufacturerId: body.manufacturerId || null,
      incomeHeadId: body.incomeHeadId || null,
      unitId: body.unitId || null,
      taxId: body.taxId || null,
      chargeId: body.chargeId || null,
      organizationId: orgId,
    },
  });
  return ok(product, 201);
}
