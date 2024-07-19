"use client";

import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/use-current-user";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";

const SettingsInfo = () => {
  const user = useCurrentUser();
  return (
    <div className="relative">
      <Avatar>
        <AvatarImage src={user?.image || ""} />
        <AvatarFallback className="bg-slate-100">
          <FaUser className="" />
        </AvatarFallback>
      </Avatar>
      <div className="space-y-4 mt-4">
        <div className="space-x-2">
          <Label>Name:</Label> <span>{user?.name}</span>
        </div>
        <div className="space-x-2">
          <Label>Email:</Label> <span>{user?.email}</span>
        </div>
        <div className="space-x-2">
          <Label>Role:</Label> <span>{user?.role}</span>
        </div>
      </div>
    </div>
  );
};

export default SettingsInfo;
