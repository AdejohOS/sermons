"use client";

import React, { useOptimistic, useState, useTransition } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { CreateCommentSchema, CreateCommentValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";

import ReactTimeAgo from "react-time-ago";

import { Edit, Loader2, MoreHorizontal, ThumbsUp, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useCurrentUser } from "@/hooks/use-current-user";
import { addComment } from "@/actions/actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import ModifyComment from "./modify-comment";
import { Comment } from "@/lib/types";

interface ConmmentListProps {
  sermonId: string;
  comments: Comment[];
}

const CommentList = ({ comments, sermonId }: ConmmentListProps) => {
  const currentUser = useCurrentUser();

  const [isPending, startTransition] = useTransition();

  const [description, setDescription] = useState("");

  const form = useForm<CreateCommentValues>({
    resolver: zodResolver(CreateCommentSchema),

    defaultValues: {
      description: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: CreateCommentValues) => {
    startTransition(() => {
      addComment(values, sermonId).then((data) => {
        if (data?.error) {
          toast({
            title: "Something Went wrong",
            description: "Please try again later",
          });
        } else {
          toast({ title: "Success", description: "Comment posted" });
        }
      });
    });
  };

  const onDelete = async () => {};
  return (
    <div className="p-4">
      <>
        <div className="flex items-center gap-4">
          <Image
            src={currentUser?.image || ""}
            alt="avaterImage"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full"
          />

          <Form {...form}>
            <form
              action="
              "
              onSubmit={handleSubmit(onSubmit)}
              className=" bg-slate-50 rounded-xl px-6 py-2 w-full"
            >
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <>
                        <div className="flex items-center justify-between ">
                          <TextareaAutosize
                            {...field}
                            placeholder="Write a comment..."
                            className="bg-transparent w-full resize-none outline-none py-4 min-h-16"
                            required
                            disabled={isPending}
                          />
                          <div>😀</div>
                        </div>

                        <div className="flex gap-3 justify-end">
                          <Button type="submit" disabled={isPending}>
                            {isPending ? (
                              <span className="flex items-center">
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />{" "}
                                Posting...
                              </span>
                            ) : (
                              "Comment"
                            )}
                          </Button>
                        </div>
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </>

      <>
        {comments.map((com) => (
          <div key={com.id} className="flex gap-4 justify-between mt-6">
            <Image
              src={com.user.image || ""}
              alt="avaterImage"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full"
            />

            <div className="flex flex-col gap-2 flex-1">
              <div className="flex gap-2 items-center">
                <span className="font-medium">{com.user.name}</span>{" "}
                <p className="text-slate-400 text-xs">
                  <ReactTimeAgo date={com.createdAt} locale="en-us" />
                </p>{" "}
              </div>
              <p>{com.description}</p>
              <div className="flex items-center gap-8 text-gray-500 text-xs">
                <div className="flex items-center gap-4">
                  <ThumbsUp className="h-4 w-4" />
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-500">190 likes</span>
                </div>
                <div>Reply</div>
              </div>
            </div>

            {currentUser?.role === "ADMIN" ||
            currentUser?.id === com.user.id ? (
              <ModifyComment commentId={com.id} />
            ) : null}
          </div>
        ))}
      </>
    </div>
  );
};

export default CommentList;
