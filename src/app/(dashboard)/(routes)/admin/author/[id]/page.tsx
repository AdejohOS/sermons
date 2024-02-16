import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { Trash } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import Author from "./_components/author";
import DeleteItem from "./_components/delete";

interface AuthorDetailsProps {
  params: { id: string };
}

const getAuthor = cache(async (id: string) => {
  const author = await db.author.findUnique({
    where: {
      id,
    },
  });

  if (!author) notFound();

  return author;
});

export async function generateMetadata({
  params: { id },
}: AuthorDetailsProps): Promise<Metadata> {
  const author = await getAuthor(id);

  return {
    title: author.name,
    description: author.aboutAuthor,
  };
}

const AuthorDetails = async ({ params: { id } }: AuthorDetailsProps) => {
  const author = await getAuthor(id);
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Authors Details</h2>

        <DeleteItem />
      </div>
      <Separator />

      <div className="mt-4">
        <Author author={author} />
      </div>
    </div>
  );
};

export default AuthorDetails;
