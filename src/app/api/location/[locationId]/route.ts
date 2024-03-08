import { currentRole } from "@/lib/auth";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { locationId: string } }
) {
  try {
    const role = await currentRole();

    if (role !== UserRole.ADMIN) {
      return new NextResponse("Unauthorised access", { status: 403 });
    }

    const body = await req.json();

    const { name, address, imageUrl } = body;

    if (!params.locationId) {
      return new NextResponse("LocationId is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 401 });
    }

    const location = await db.location.update({
      where: {
        id: params.locationId,
      },
      data: {
        imageUrl,
        address,
        name,
      },
    });

    return NextResponse.json(location);
  } catch (error) {
    console.log("[LOCATION_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { locationId: string } }
) {
  try {
    const role = await currentRole();

    if (role !== UserRole.ADMIN) {
      return new NextResponse("Unauthorised access", { status: 403 });
    }

    if (!params.locationId) {
      return new NextResponse("CategoryId is required", { status: 400 });
    }

    const category = await db.location.delete({
      where: {
        id: params.locationId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[LOCATION_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
