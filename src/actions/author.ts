"use server";

import { useCurrentUser } from "@/hooks/use-current-user";
import { db } from "@/lib/db";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";
import { z } from "zod";
import {
  CreateAuthorSchema,
  CreateAuthorValues,
  UpdateAuthorSchema,
  UpdateAuthorValues,
} from "@/lib/validation";

export const createAuthor = async (values: CreateAuthorValues) => {
  const role = await currentRole();

  if (role !== UserRole.ADMIN) {
    return { error: "Forbidden Server Action!" };
  }
  const validatedFields = CreateAuthorSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, about, imageUrl } = validatedFields.data;

  await db.author.create({
    data: {
      name,
      about,
      imageUrl,
    },
  });

  revalidatePath("/admin/author");
  redirect("/admin/author");

  return { success: "Author created successfully!" };
};

export const updateAuthor = async (
  authorId: string,
  values: UpdateAuthorValues
) => {
  const role = await currentRole();
  if (role !== UserRole.ADMIN) {
    return { error: "Forbidden Server Action!" };
  }

  const validatedFields = UpdateAuthorSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { imageUrl, about, name } = validatedFields.data;

  try {
    await db.author.update({
      where: {
        id: authorId,
      },
      data: {
        imageUrl,
        about,
        name,
      },
    });
  } catch (error) {
    return { error: "Database Error: Failed to Update Author." };
  }

  revalidatePath("/admin/author");
  redirect("/admin/author");

  return { success: "Author updated successfully!" };
};

export async function deleteAuthor(formData: FormData) {
  const role = await currentRole();
  if (role !== UserRole.ADMIN) {
    return { error: "Forbidden Server Action!" };
  }
}
