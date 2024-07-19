import Logo from "@/components/logo";

import SidebarRoutes from "./sidebar-routes";
import { currentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import Library from "@/components/library";

const Sidebar = async () => {
  const userId = await currentUserId();
  const favouriteSermons = await db.favourite.findMany({
    where: {
      userId: userId,
    },
    include: {
      sermon: true,
    },
  });
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-background shadow-sm">
      <div className="p-6 flex items-center justify-center ">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
        <Library favouriteSermons={favouriteSermons} />
      </div>
    </div>
  );
};

export default Sidebar;
