import { db } from "@/lib/db";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { CategoryColumn } from "./_components/columns";
import { CategoryClient } from "./_components/client";

export const revalidate = 0;

const CategoryPage = async () => {
  const myCategories = await db.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategory: CategoryColumn[] = myCategories.map((item) => ({
    id: item.id,
    name: item.name,
    about: item.about,
  }));

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Categories</h2>
        <Link href="/admin/categories/create">
          <button className="flex items-center border p-2 rounded-md text-green-700 hover:bg-green-200">
            <PlusCircle className="w-4 h-4 shrink-0 mr-2 " />
            Add a category
          </button>
        </Link>
      </div>

      <div className="flex-col">
        <div className="flex-1 space-y-4  pt-6">
          <CategoryClient data={formattedCategory} />
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
