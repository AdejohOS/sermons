"use client";

import { DataTable } from "@/components/ui/data-table";
import { LocationColumn, columns } from "./columns";

interface EventClientProps {
  data: LocationColumn[];
}
export const LocationClient = ({ data }: EventClientProps) => {
  return (
    <>
      <DataTable columns={columns} data={data} searchKey="name" />
    </>
  );
};
