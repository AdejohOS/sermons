import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { Trash } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

import SermonForm from "./_components/sermon-form";

const SermonDetailsPage = async ({
  params,
}: {
  params: { sermonId: string };
}) => {
  const sermon = await db.sermon.findUnique({
    where: {
      id: params.sermonId,
    },
  });

  const authors = await db.author.findMany();
  const categories = await db.category.findMany();
  const locations = await db.location.findMany();

  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4">
          <SermonForm
            categories={categories}
            authors={authors}
            locations={locations}
            initialData={sermon}
          />
        </div>
      </div>
    </>
  );
};

export default SermonDetailsPage;
