import { Skeleton } from "@/components/ui/skeleton";

import { PlayButton } from "@/components/play-button";
import { Badge } from "@/components/ui/badge";

import SermonItem from "./sermonItem";

import NoResults from "@/components/no-results";

import { db } from "@/lib/db";

export const Sermons = async () => {
  const sermons = await db.sermon.findMany({
    where: {
      isPublished: true,
    },

    include: {
      author: true,
      category: true,
      location: true,
      favourites: true,
    },
    orderBy: {
      dateDelivered: "desc",
    },
  });

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {sermons?.length === 0 && <NoResults />}

        {sermons?.map((sermon) => (
          <SermonItem key={sermon.id} sermon={sermon} />
        ))}
      </div>
    </>
  );
};
