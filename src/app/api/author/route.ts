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

    const { name, about, imageUrl } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 401 });
    }

    const author = await db.author.create({
      data: {
        imageUrl,
        about,
        name,
      },
    });

    return NextResponse.json(author);
  } catch (error) {
    console.log("[AUTHOR_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
