import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, orgName, orgSlug } = body;

    if (!name || !email || !password || !orgName || !orgSlug) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    }

    // Check if email already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    }

    // Check if slug is taken
    const existingOrg = await prisma.organization.findUnique({ where: { slug: orgSlug } });
    if (existingOrg) {
      return NextResponse.json({ error: "This workspace name is already taken. Please choose a different one." }, { status: 409 });
    }

    // Create org + admin user
    const passwordHash = await bcrypt.hash(password, 12);

    const org = await prisma.organization.create({
      data: {
        name: orgName,
        slug: orgSlug,
        plan: "STARTER",
      },
    });

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: "ADMIN",
        organizationId: org.id,
      },
    });

    // Create a default store for the org
    await prisma.store.create({
      data: {
        name: "Main Store",
        organizationId: org.id,
      },
    });

    return NextResponse.json({ success: true, userId: user.id }, { status: 201 });
  } catch (err) {
    console.error("Registration error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
