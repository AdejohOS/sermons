import { db } from "@/lib/db";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { SermonColumn } from "./_components/columns";
import { SermonClient } from "./_components/client";
import { format } from "date-fns";

export const revalidate = 0;

const SermonPage = async () => {
  const mySermons = await db.sermon.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSermon: SermonColumn[] = mySermons.map((item) => ({
    id: item.id,
    title: item.title,
    dateDelivered: format(item.dateDelivered, "MMMM do, yyyy"),
  }));

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Sermons</h2>
        <Link href="/admin/sermons/create">
          <button className="flex items-center border p-2 rounded-md text-green-700 hover:bg-green-200">
            <PlusCircle className="w-4 h-4 shrink-0 mr-2 " />
            Add a Sermon
          </button>
        </Link>
      </div>

      <div className="flex-col">
        <div className="flex-1 space-y-4  pt-6">
          <SermonClient data={formattedSermon} />
        </div>
      </div>
    </>
  );
};

export default SermonPage;
