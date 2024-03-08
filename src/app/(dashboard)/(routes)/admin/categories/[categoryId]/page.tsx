import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { Trash } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

import CategoryForm from "./_components/category-form";

const CategoryDetailsPage = async ({
  params,
}: {
  params: { categoryId: string };
}) => {
  const category = await db.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });
  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4">
          <CategoryForm initialData={category} />
        </div>
      </div>
    </>
  );
};

export default CategoryDetailsPage;
