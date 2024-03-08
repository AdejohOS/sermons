import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function POST(req: Request) {
  const role = await currentRole();
  if (role !== UserRole.ADMIN) {
    return new NextResponse("Unauthorised action", { status: 401 });
  }
  const { fileKey } = await req.json();

  try {
    const res = await utapi.deleteFiles(fileKey);
    return NextResponse.json(res);
  } catch (error) {
    console.log("error at uploadthing/delete", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
