"use server";

import { useCurrentUser } from "@/hooks/use-current-user";
import { db } from "@/lib/db";
import { CreateCategorySchema, CreateCategoryValues } from "@/lib/validation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";
import { error } from "console";

export const createCategory = async (values: CreateCategoryValues) => {
  const role = await currentRole();

  if (role !== UserRole.ADMIN) {
    return { error: "Forbidden Server Action!" };
  }
  const validatedFields = CreateCategorySchema.safeParse(values);

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

  return { success: "Category created successfully!" };
};
