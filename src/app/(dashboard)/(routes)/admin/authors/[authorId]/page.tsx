import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { Trash } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

import EditAuthorForm from "./_components/author-form";

const AuthorDetailsPage = async ({
  params,
}: {
  params: { authorId: string };
}) => {
  const author = await db.author.findUnique({
    where: {
      id: params.authorId,
    },
  });
  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4">
          <EditAuthorForm initialData={author} />
        </div>
      </div>
    </>
  );
};

export default AuthorDetailsPage;
