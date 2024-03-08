"use client";

import { DataTable } from "@/components/ui/data-table";
import { SermonColumn, columns } from "./columns";

interface EventClientProps {
  data: SermonColumn[];
}
export const SermonClient = ({ data }: EventClientProps) => {
  return (
    <>
      <DataTable columns={columns} data={data} searchKey="name" />
    </>
  );
};
