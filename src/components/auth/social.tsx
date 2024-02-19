"use client";

import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useState, useTransition } from "react";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { Loader2 } from "lucide-react";

export const Social = () => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      signIn("google", {
        callbackUrl: DEFAULT_LOGIN_REDIRECT,
      });
    });
  };
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        variant="outline"
        className="w-full flex items-center"
        size="lg"
        onClick={() => onClick()}
        disabled={isPending}
      >
        {isPending && <Loader2 className="h-5 w-5 mr-2 animate-spin" />}
        <FcGoogle className=" h-5 w-5" />
      </Button>
    </div>
  );
};
