import { currentRole } from "@/lib/auth";
import { db } from "@/lib/db";
import { toSlug } from "@/lib/utils";
import { UserRole } from "@prisma/client";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { sermonId: string } }
) {
  try {
    const role = await currentRole();

    if (role !== UserRole.ADMIN) {
      return new NextResponse("Unauthorised access", { status: 403 });
    }

    const body = await req.json();

    const {
      title,
      about,
      imageUrl,
      fileUrl,
      dateDelivered,
      categoryId,
      locationId,
      authorId,
      isPublished,
    } = body;

    if (!params.sermonId) {
      return new NextResponse("LocationId is required", { status: 400 });
    }

    if (!title) {
      return new NextResponse("Name is required", { status: 401 });
    }
    const slug = `${toSlug(title)}-${nanoid(10)}`;

    const sermon = await db.sermon.update({
      where: {
        id: params.sermonId,
      },
      data: {
        title,
        slug,
        about,
        imageUrl,
        fileUrl,
        dateDelivered,
        categoryId,
        locationId,
        authorId,
        isPublished,
      },
    });

    return NextResponse.json(sermon);
  } catch (error) {
    console.log("[SERMON_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { sermonId: string } }
) {
  try {
    const role = await currentRole();

    if (role !== UserRole.ADMIN) {
      return new NextResponse("Unauthorised access", { status: 403 });
    }

    if (!params.sermonId) {
      return new NextResponse("SermonId is required", { status: 400 });
    }

    const sermon = await db.sermon.delete({
      where: {
        id: params.sermonId,
      },
    });

    return NextResponse.json(sermon);
  } catch (error) {
    console.log("[SERMON_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { sermonId: string } }
) {
  try {
    const sermon = await db.sermon.findUnique({
      where: {
        id: params.sermonId,
      },

      include: {
        author: true,
        category: true,
      },
    });
    return NextResponse.json(sermon);
  } catch (error) {
    console.log("[SERMON_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
