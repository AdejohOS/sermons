import { db } from "@/lib/db";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

import { format } from "date-fns";
import { UserColumn } from "./_components/columns";
import { UserClient } from "./_components/client";

export const revalidate = 0;

const UserPage = async () => {
  const myUser = await db.user.findMany();

  const formattedUser: UserColumn[] = myUser.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    role: item.role,
  }));

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Users</h2>
      </div>

      <div className="flex-col">
        <div className="flex-1 space-y-4  pt-6">
          <UserClient data={formattedUser} />
        </div>
      </div>
    </>
  );
};

export default UserPage;
