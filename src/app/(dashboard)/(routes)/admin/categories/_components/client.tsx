"use client";

import { DataTable } from "@/components/ui/data-table";
import { CategoryColumn, columns } from "./columns";

interface EventClientProps {
  data: CategoryColumn[];
}
export const CategoryClient = ({ data }: EventClientProps) => {
  return (
    <>
      <DataTable columns={columns} data={data} searchKey="name" />
    </>
  );
};
