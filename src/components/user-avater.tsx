"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FaUser } from "react-icons/fa";

const UserAvatar = () => {
  const user = useCurrentUser();
  return (
    <Avatar>
      <AvatarImage src={user?.image || ""} />
      <AvatarFallback className="bg-slate-100">
        <FaUser className="" />
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
