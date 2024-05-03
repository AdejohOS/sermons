import { currentRole } from "@/lib/auth";
import { db } from "@/lib/db";
import { toSlug } from "@/lib/utils";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
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
      authorId,
      locationId,
      categoryId,
      isPublished,
    } = body;

    if (!title) {
      return new NextResponse("Title is required", { status: 401 });
    }

    const slug = `${toSlug(title)}-${nanoid(10)}`;

    const sermon = await db.sermon.create({
      data: {
        title,
        slug,
        about,
        imageUrl,
        fileUrl,

        authorId,
        locationId,
        categoryId,
        isPublished,
      },
    });

    return NextResponse.json(sermon);
  } catch (error) {
    console.log("[SERMON_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const sermon = await db.sermon.findMany({
      where: {
        isPublished: true,
      },

      include: {
        author: true,
        category: true,
      },
      orderBy: {
        dateDelivered: "desc",
      },
    });
    return NextResponse.json(sermon);
  } catch (error) {
    console.log("[SERMON_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
