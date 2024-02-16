"use client";

import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, CheckIcon, Loader2, X, XCircle } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/lib/uploadthing";
import toast from "react-hot-toast";
import { CreateAuthorSchema, CreateAuthorValues } from "@/lib/validation";
import { createAuthor } from "@/app/actions/action";
import { useFormStatus } from "react-dom";
import LoadingButton from "@/components/loading-btn";

const CreateAuthorForm = () => {
  const router = useRouter();
  const { pending } = useFormStatus();

  const form = useForm<CreateAuthorValues>({
    resolver: zodResolver(CreateAuthorSchema),
    defaultValues: {
      name: "",
      aboutAuthor: "",
    },
  });

  const {
    handleSubmit,
    watch,
    trigger,
    setValue,
    setFocus,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: CreateAuthorValues) => {
    try {
      await createAuthor(values);
      toast.success(`Author ${values.name} created`);
    } catch (error) {
      toast.error("Something went wrong, please try again");
    }
  };

  const imageUrl = watch("imageUrl");

  return (
    <div>
      <Form {...form}>
        <form action="" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author Name:</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter author name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author Image:</FormLabel>
                <FormControl>
                  <div>
                    {!!imageUrl ? (
                      <div className="relative h-[400px] w-[400px] rounded-md overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt="authorImage"
                          fill
                          className="object-cover"
                        />

                        <button
                          type="button"
                          className="absolute top-0 right-0 rounded-full border bg-background p-2"
                          onClick={() => {}}
                        >
                          <X className="w-8 h-8" />
                        </button>
                      </div>
                    ) : (
                      <UploadDropzone
                        endpoint="authorImage"
                        onClientUploadComplete={(res) => {
                          form.setValue("imageUrl", res[0].url);
                          toast.success("Image uploaded sucessfully");
                        }}
                        onUploadError={(error: Error) => {
                          toast.error(`${error?.message}`);
                        }}
                      ></UploadDropzone>
                    )}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="aboutAuthor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About Author:</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="A brief about the author" />
                </FormControl>
              </FormItem>
            )}
          />

          <div className=" flex justify-end gap-4 items-center">
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                router.back();
              }}
            >
              Cancel
            </Button>

            <LoadingButton type="submit" loading={isSubmitting}>
              Create Author
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateAuthorForm;
