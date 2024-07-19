import { db } from "@/lib/db";

async function getAppData() {
  const [userCount, totalSermons, publishedSermons] = await Promise.all([
    db.user.count(),
    db.sermon.count(),
    ,
    db.sermon.count({
      where: {
        isPublished: true,
      },
    }),
  ]);

  return {
    userCount,
    totalSermons,
    publishedSermons,
  };
}

export default getAppData;
