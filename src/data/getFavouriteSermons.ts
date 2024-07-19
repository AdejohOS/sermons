import { currentUserId } from "@/lib/auth";
import { db } from "@/lib/db";

export const getFavouriteSermons = async () => {
  const userId = await currentUserId();
  const favouriteSermons = await db.favourite.findMany({
    where: {
      userId: userId,
    },
    include: {
      sermon: true,
    },
  });
};
