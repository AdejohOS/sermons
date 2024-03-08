import { currentRole } from "@/lib/auth";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const role = await currentRole();

    if (role !== UserRole.ADMIN) {
      return new NextResponse("Unauthorised access", { status: 403 });
    }

    const body = await req.json();

    const { name, address, imageUrl } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 401 });
    }

    const location = await db.location.create({
      data: {
        imageUrl,
        address,
        name,
      },
    });

    return NextResponse.json(location);
  } catch (error) {
    console.log("[LOCATION_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
