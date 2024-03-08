"use client";

import {
  CalendarCheck,
  Compass,
  FoldHorizontal,
  Folder,
  GalleryThumbnails,
  Heart,
  Layout,
  Play,
  TicketCheck,
  Videotape,
} from "lucide-react";
import SidebarItem from "./sidebar-item";
import { usePathname } from "next/navigation";

const adminRoutes = [
  {
    icon: Layout,
    label: "Overview",
    href: "/",
  },

  {
    icon: Compass,
    label: "Sermons",
    href: "/admin/sermons",
  },
  {
    icon: GalleryThumbnails,
    label: "Categories",
    href: "/admin/categories",
  },
  {
    icon: Videotape,
    label: "Author",
    href: "/admin/authors",
  },
  {
    icon: CalendarCheck,
    label: "Locations",
    href: "/admin/locations",
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

  {
    icon: Heart,
    label: "Liked",
    href: "/playlist",
  },
];

const SidebarRoutes = () => {
  const pathName = usePathname();

  // const isAdminRoutes = pathName?.includes("/admin");

  //const routes = isAdminRoutes ? adminRoutes : userRoutes;
  return (
    <div className="flex flex-col w-full">
      {adminRoutes.map((route) => (
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
