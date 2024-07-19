import { db } from "@/lib/db";

import SermonDetails from "./_components/sermon-details";
import { currentUserId } from "@/lib/auth";

interface SermonPageDetailsProps {
  params: {
    slug: string;
  };
}

const SermonPageDetails = async ({ params }: SermonPageDetailsProps) => {
  const sermon = await db.sermon.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      user: true,
      author: true,
      category: true,
      location: true,
      comments: true,
      favourites: {
        select: {
          userId: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  const relatedSeromons = await db.sermon.findMany({
    where: {
      category: sermon?.category,
      id: {
        not: sermon?.id,
      },
    },
    include: {
      category: true,
      author: true,
      user: true,
    },
    take: 4,
  });
  return (
    <section>
      <SermonDetails sermon={sermon!} relatedSermons={relatedSeromons} />
    </section>
  );
};

export default SermonPageDetails;
