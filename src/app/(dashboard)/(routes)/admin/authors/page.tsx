import { db } from "@/lib/db";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { AuthorColumn } from "./_components/columns";
import { AuthorClient } from "./_components/client";

export const revalidate = 0;

const AuthorPage = async () => {
  const myAuthors = await db.author.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedAuthor: AuthorColumn[] = myAuthors.map((item) => ({
    id: item.id,
    name: item.name,
    about: item.about,
  }));

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Authors</h2>
        <Link href="/admin/authors/create">
          <button className="flex items-center border p-2 rounded-md text-green-700 hover:bg-green-200">
            <PlusCircle className="w-4 h-4 shrink-0 mr-2 " />
            Add an Author
          </button>
        </Link>
      </div>

      <div className="flex-col">
        <div className="flex-1 space-y-4  pt-6">
          <AuthorClient data={formattedAuthor} />
        </div>
      </div>
    </>
  );
};

export default AuthorPage;
