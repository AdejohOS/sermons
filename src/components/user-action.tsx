import { Bell, LogIn, LogOut, UserRoundPlus } from "lucide-react";
import { Button } from "./ui/button";

import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { LoginButton } from "./auth/login-button";
import { RegisterButton } from "./auth/register-button";
import { signOut } from "@/auth";

const UserAction = () => {
  return (
    <div>
      <div className="flex items-center gap-4">
        <ModeToggle />

        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            className="rounded-full p-3 border"
          >
            <Bell className="h-4 w-4 shrink-0" />
          </Button>
        </div>

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

        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button type="submit" className="flex items-center">
            {" "}
            <LogOut className="w-4 h-4 shrink-0 mr-2" />
            Sign out
          </Button>
        </form>
      </div>

      <div></div>
    </div>
  );
};

export default UserAction;
