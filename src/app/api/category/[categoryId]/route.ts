import { currentRole } from "@/lib/auth";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const role = await currentRole();

    if (role !== UserRole.ADMIN) {
      return new NextResponse("Unauthorised access", { status: 403 });
    }

    const body = await req.json();

    const { name, about, imageUrl } = body;

    if (!params.categoryId) {
      return new NextResponse("AuthorId is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 401 });
    }

    const author = await db.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        imageUrl,
        about,
        name,
      },
    });

    return NextResponse.json(author);
  } catch (error) {
    console.log("[AUTHOR_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const role = await currentRole();

    if (role !== UserRole.ADMIN) {
      return new NextResponse("Unauthorised access", { status: 403 });
    }

    if (!params.categoryId) {
      return new NextResponse("CategoryId is required", { status: 400 });
    }

    const category = await db.category.delete({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
