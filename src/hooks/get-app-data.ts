import { db } from "@/lib/db";

async function getAppData() {
  const [userCount, totalSermons, publishedSermons] = await Promise.all([
    db.user.count(),
    await db.sermon.count(),
    db.sermon.count({
      where: {
        isPublished: true,
      },
    }),
  ]);
  await wait(2000)

  return {
    userCount,
    totalSermons,
publishedSermons,
  };
}

export default getAppData;
