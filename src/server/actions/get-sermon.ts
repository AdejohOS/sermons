"use server";

import { db } from "@/lib/db";

export async function getSermons() {
  const sermons = await db.sermon.findMany({
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

  if (!sermons) return { error: "No Sermons 😓" };
  if (sermons) return { success: sermons };
}
