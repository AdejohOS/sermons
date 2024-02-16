'use client'

import { CalendarCheck, Compass, GalleryThumbnails, Layout, Play, TicketCheck, Videotape } from "lucide-react";
import SidebarItem from "./sidebar-item";

const adminRoutes = [
    {
        icon: Layout,
        label: 'Overview',
        href: "/"
    },

    {
        icon: Compass,
        label: 'Sermons',
        href: "/admin/sermons"
    },
    {
        icon: GalleryThumbnails,
        label: 'Categories',
        href: "/admin/categories"
    },
    {
        icon: Videotape,
        label: 'Author',
        href: "/admin/author"
    },
    {
        icon: CalendarCheck,
        label: 'Locations',
        href: "/admin/locations"
    },

   
];

const userRoutes = [
    {
        icon: TicketCheck,
        label: 'Liked',
        href: "/liked"
    },
    {
        icon: Play,
        label: 'Playlist',
        href: "/playlist"
    },
]

const SidebarRoutes = () => {
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
}
 
export default SidebarRoutes;