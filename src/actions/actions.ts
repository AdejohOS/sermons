"use server";

import { currentRole, currentUser, currentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { CreateCommentSchema, CreateCommentValues } from "@/lib/validation";
import { revalidatePath } from "next/cache";

export const addComment = async (
  values: CreateCommentValues,
  sermonId: string
) => {
  const userId = await currentUserId();

  if (!userId) {
    return { error: "Forbidden Server Action!" };
  }
  try {
    const validatedFields = CreateCommentSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const { description } = validatedFields.data;

    await db.comment.create({
      data: {
        sermonId,
        userId,
        description,
      },
    });

    revalidatePath("/sermons/[slug]", "page");
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
};

export const deleteComment = async (commentId: string) => {
  const userId = await currentUserId();

  if (!userId) {
    return { error: "Forbidden Server Action!" };
  }

  const userCreatedComment = await db.comment.findFirst({
    where: {
      id: commentId,
      userId,
    },
  });

  try {
    await db.comment.delete({
      where: {
        id: commentId,
        userId,
      },
    });
    revalidatePath("/sermons/[slug]", "page");
  } catch (error) {}
};

export const switchFavourite = async (sermonId: string) => {
  const userId = await currentUserId();

  if (!userId) {
    return { error: "Forbidden Server Action!" };
  }

  try {
    const existingFavourite = await db.favourite.findFirst({
      where: {
        sermonId,
        userId,
      },
    });

    if (existingFavourite) {
      await db.favourite.delete({
        where: {
          userId_sermonId: {
            sermonId,
            userId,
          },
        },
      });
    } else {
      await db.favourite.create({
        data: {
          sermonId,
          userId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};
