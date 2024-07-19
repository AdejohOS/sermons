"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns, UserColumn } from "./columns";

interface UserClientProps {
  data: UserColumn[];
}
export const UserClient = ({ data }: UserClientProps) => {
  return (
    <>
      <DataTable columns={columns} data={data} searchKey="email" />
    </>
  );
};
