import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";

import { formatNumber } from "@/lib/utils";

export const dynamic = "force-dynamic";

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
  await wait(2000);

  return {
    userCount,
    totalSermons,
    publishedSermons,
  };
}

function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}
const Overview = async () => {
  const [appData] = await Promise.all([getAppData()]);

  return (
    <div>
      <div className="grid  grid-cols-2 md:grid-cols-3 gap-5">
        <Card className="flex flex-col items-center justify-center">
          <CardHeader>
            <CardTitle className="text-center text-xl">Users</CardTitle>
            <CardDescription className="text-center">
              Total number of users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {formatNumber(appData.userCount)}
            </p>
          </CardContent>
        </Card>

        <Card className="flex flex-col items-center justify-center">
          <CardHeader>
            <CardTitle className="text-center text-xl">Sermons</CardTitle>
            <CardDescription className="text-center">
              Total number of sermons
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {formatNumber(appData.totalSermons)}
            </p>
          </CardContent>
        </Card>

        <Card className="flex flex-col items-center justify-center">
          <CardHeader>
            <CardTitle className="text-center text-xl">
              Published Sermons
            </CardTitle>
            <CardDescription className="text-center">
              Total number of published sermons
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {formatNumber(appData.publishedSermons)}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
