"use client";

import {
  CalendarCheck,
  Compass,
  FoldHorizontal,
  MapPin,
  Folder,
  GalleryThumbnails,
  Mic,
  Play,
  Videotape,
  SearchIcon,
  User,
  ListMusic,
} from "lucide-react";
import SidebarItem from "./sidebar-item";
import { usePathname } from "next/navigation";
import { SheetClose } from "@/components/ui/sheet";
import { useState } from "react";
import { TbPlaylist } from "react-icons/tb";
import { useCurrentUser } from "@/hooks/use-current-user";
import Library from "@/components/library";

const adminRoutes = [
  {
    icon: SearchIcon,
    label: "Browse",
    href: "/",
  },
  {
    icon: Compass,
    label: "Overview",
    href: "/admin/overview",
  },

  {
    icon: Play,
    label: "Sermons",
    href: "/admin/sermons",
  },
  {
    icon: GalleryThumbnails,
    label: "Categories",
    href: "/admin/categories",
  },
  {
    icon: Mic,
    label: "Author",
    href: "/admin/authors",
  },
  {
    icon: MapPin,
    label: "Locations",
    href: "/admin/locations",
  },
  {
    icon: User,
    label: "Users",
    href: "/admin/users",
  },
];

const userRoutes = [
  {
    icon: Compass,
    label: "Browse",
    href: "/",
  },
  {
    icon: Folder,
    label: "Library",
    href: "/playlist",
  },
];

const SidebarRoutes = () => {
  const pathName = usePathname();
  const user = useCurrentUser();

  // const isAdminRoutes = pathName?.includes("/admin");

  //const routes = isAdminRoutes ? adminRoutes : userRoutes;

  const isAdminRoutes = user?.role === "ADMIN";

  const routes = isAdminRoutes ? adminRoutes : userRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;

export function SidebarSheetClose() {
  return <SheetClose asChild></SheetClose>;
}
