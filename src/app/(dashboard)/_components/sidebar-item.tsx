"use client";

import { SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
  label: string;
  icon: LucideIcon;
  href: string;
}

const SidebarItem = ({
  label,
  href,
  icon: Icon,
  ...props
}: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        `flex items-center gap-x-2 text-slate-500 text-sm
                         font-[500] pl-6 transition-all hover:text-slate-600
                         hover:bg-slate-300/20`,
        isActive &&
          "text-slate-700 bg-slate-200/20 hover:bg-green-200/20 hover:text-slate-700"
      )}
    >
      <div className="flex items-center gap-x-2 py-4 ">
        <Icon
          size={22}
          className={cn(`text-slate-500`, isActive && "text-slate-700")}
        />
        {label}
      </div>

      <div
        className={cn(
          `ml-auto border-2 border-slate-700 
                                    transition-all opacity-0 h-full `,
          isActive && "opacity-100"
        )}
      />
    </button>
  );
};

export default SidebarItem;
