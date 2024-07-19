"use client";

import Logo from "@/components/logo";
import MobileSidebar from "./mobile-nav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Bell,
  LogIn,
  SearchIcon,
  UserRoundPlus,
} from "lucide-react";
import { RegisterButton } from "@/components/auth/register-button";
import { UserButton } from "@/components/user-button";
import { LoginButton } from "@/components/auth/login-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";

const FullNav = () => {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);
  const user = useCurrentUser();
  return (
    <div className="h-full px-4 border-b gap-10 lg:gap-20 flex items-center bg-background justify-between shadow-sm">
      <div
        className={cn(
          `items-center gap-4`,
          showFullWidthSearch ? "hidden" : "flex"
        )}
      >
        <div className="flex-shrink-0">
          <MobileSidebar />
        </div>

        <div className="flex md:hidden shrink-0">
          <Logo />
        </div>
      </div>

      <form
        action=""
        className={cn(
          `  flex-grow justify-center`,
          showFullWidthSearch ? "flex" : "hidden md:flex"
        )}
      >
        {showFullWidthSearch && (
          <Button
            onClick={() => setShowFullWidthSearch(false)}
            className="rounded-full py-2 px-4 border border-slate-400 mr-4"
            variant="ghost"
            size="icon"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
          </Button>
        )}

        <div className="flex flex-grow max-w-[600px] ">
          <Input
            type="search"
            className="w-full focus:border-gray-500 outline-none px-4 text-lg py-1 rounded-l-full  shadow-inner shadow-slate-100 border border-slate-400 flex-shrink-0"
            placeholder="Search"
          />
        </div>
        <Button
          className="rounded-r-full   py-2 px-4 border border-slate-400 flex-shrink-0"
          variant="secondary"
        >
          <SearchIcon className="text-slate-500" />
        </Button>
      </form>

      <div
        className={cn(
          ` items-center gap-2 `,
          showFullWidthSearch ? "hidden" : "flex"
        )}
      >
        <Button
          onClick={() => setShowFullWidthSearch(true)}
          className="rounded-full md:hidden"
          variant="outline"
          size="icon"
        >
          <SearchIcon className="text-slate-500 h-4 w-4" />
        </Button>

        <ModeToggle />

        {!!user ? (
          <div className="flex items-center gap-4">
            <Button
              size="icon"
              variant="outline"
              className="rounded-full p-3 border relative"
            >
              <Bell className="h-[1.2rem] w-[1.2rem] shrink-0" />
              <div className="absolute right-[-.4rem] bottom-0 text-xs  text-background h-4 w-4 bg-foreground rounded-full overflow-hiddden flex items-center justify-center">
                20
              </div>
            </Button>

            <UserButton />
          </div>
        ) : (
          <div>
            <LoginButton>
              <Button className="flex items-center">
                <LogIn className="w-4 h-4 mr-2 shrink-0" />
                Login / Signup
              </Button>
            </LoginButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default FullNav;
