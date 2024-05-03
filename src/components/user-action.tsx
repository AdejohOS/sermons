"use client";

import { Bell, LogIn, LogOut, UserRoundPlus } from "lucide-react";
import { Button } from "./ui/button";

import { ModeToggle } from "./mode-toggle";
import { LoginButton } from "./auth/login-button";
import { RegisterButton } from "./auth/register-button";

import { UserButton } from "./user-button";
import { useCurrentUser } from "@/hooks/use-current-user";

const UserAction = () => {
  const user = useCurrentUser();
  return (
    <div>
      <div className="flex items-center gap-4">
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
          <div className="flex items-center gap-2">
            <LoginButton>
              <Button className="flex items-center" variant="outline">
                <LogIn className="w-4 h-4 mr-2 shrink-0" />
                Login
              </Button>
            </LoginButton>

            <RegisterButton>
              <Button className="flex items-center">
                <UserRoundPlus className="w-4 h-4 shrink-0 mr-2" />
                Signup
              </Button>
            </RegisterButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAction;
