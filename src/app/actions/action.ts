"use server";

import { db } from "@/lib/db";
import { CreateAuthorSchema, CreateAuthorValues } from "@/lib/validation";

import { error } from "console";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import toast from "react-hot-toast";

export async function createAuthor(values: CreateAuthorValues) {
 

  

  const validatedFields = CreateAuthorSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to create author",
    };
  }

  const { imageUrl, name, aboutAuthor } = validatedFields.data;

  await db.author.create({
    data: {
      name,
      aboutAuthor,
      imageUrl,
    },
  });

  revalidatePath("/admin/author");
  redirect("/admin/author");
}

export const getSalesCount = async () => {
  const salesCount = await db.sermon.count();

  return salesCount;
};

export async function getAuthors() {
  const authors = await db.author.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}
