"use client";

import {
  ArrowDownCircle,
  ArrowUpCircle,
  MoreHorizontal,
  Trash,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { UserColumn } from "./columns";
import { toast } from "@/components/ui/use-toast";
import { title } from "process";

interface CellActionProps {
  data: UserColumn;
}

export const CellAction = ({ data }: CellActionProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  const onConfirm = async () => {
    try {
      setLoading(true);

      toast({ title: "Success", description: "Sermon deleted." });
      router.refresh();
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again!",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({ title: "Success", description: "Author ID copied to clipboard." });
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => router.push(`/admin/sermons/${data.id}`)}
          >
            {data.role === "ADMIN" ? (
              <p className="flex">
                <ArrowDownCircle className="mr-2 h-4 w-4" />
                Degrade Role
              </p>
            ) : (
              <p className="flex">
                <ArrowUpCircle className="mr-2 h-4 w-4" /> Upgrade Role
              </p>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
