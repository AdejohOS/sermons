"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "./sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden hover:opacity-75">
        <Button size="icon" variant="outline" className="rounded-full">
          <Menu className="shrink-0 w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
