"use client";

import { FaUser } from "react-icons/fa";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";

import { LogoutButton } from "./auth/logout-button";
import { LogOut, Settings } from "lucide-react";
import { Separator } from "./ui/separator";
import Link from "next/link";

export const UserButton = () => {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-slate-100">
            <FaUser className="" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <div className="my-2 p-2">
          <p className="truncate text-sm font-semibold">
            {user?.name || user?.email}
          </p>
          <p className="truncate text-xs">{user?.email}</p>
        </div>
        <Separator className="mb-2" />
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/settings" className="flex">
            {" "}
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Link>
        </DropdownMenuItem>
        <LogoutButton>
          <DropdownMenuItem className="cursor-pointer">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
