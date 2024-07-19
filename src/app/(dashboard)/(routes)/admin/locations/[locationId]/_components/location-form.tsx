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

import { Button } from "@/components/ui/button";

import { Loader2, Trash, X, XCircle } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";

import { useParams, useRouter } from "next/navigation";
import { UploadDropzone } from "@/lib/uploadthing";

import { LocationSchema, LocationValues } from "@/lib/validation";

import { useEffect, useState, useTransition } from "react";
import { Location } from "@prisma/client";
import { AlertModal } from "@/components/modals/alert-modal";

import Headings from "@/components/headings";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

interface LocationFormProps {
  initialData: Location | null;
}

const LocationForm = ({ initialData }: LocationFormProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [fileIsDeleting, setFileIsDeleting] = useState(false);

  const [imageUrl, setImageUrl] = useState<string | null | undefined>(
    initialData?.imageUrl
  );

  const [isLoading, setLoading] = useState<boolean>(false);

  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Edit Location" : "Create a Location";
  const description = initialData ? "Edit a location" : "Add a new location";
  const action = initialData ? "Save changes" : "Create location";
  const toastMessage = initialData ? "Location updated!" : "Location created!";

  const form = useForm<LocationValues>({
    resolver: zodResolver(LocationSchema),
    defaultValues: {
      name: initialData?.name || "",
      address: initialData?.address || "",
      imageUrl: initialData?.imageUrl || "",
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

  const onSubmit = async (values: LocationValues) => {
    setLoading(true);
    try {
      if (initialData) {
        await axios.patch(`/api/location/${params.locationId}`, values);
      } else {
        await axios.post("/api/location", values);
      }

      toast({ title: "Success", description: toastMessage });
      router.push(`/admin/locations`);
      router.refresh();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: "Please try again",
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    setLoading(true);
    const getImageKey = (src: string) =>
      src.substring(src.lastIndexOf("/") + 1);
    try {
      const fileKey = getImageKey(initialData?.imageUrl!);
      axios.post("/api/uploadthing/delete", { fileKey });
      await axios.delete(`/api/location/${params.authorId}`);
      router.refresh();
      router.push(`/admin/locations`);
      toast({ title: "Success", description: "Location deleted." });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: "Please try again",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const handleFileDelete = async (imageUrl: string) => {
    setFileIsDeleting(true);
    const fileKey = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);

    axios
      .post("/api/uploadthing/delete", { fileKey })
      .then((res) => {
        if (res.data.success) {
          setImageUrl("");
          toast({ title: "Success", description: "Image deleted" });
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Something went wrong.",
          description: "Please try again",
        });
      })
      .finally(() => {
        setFileIsDeleting(false);
      });
  };

  useEffect(() => {
    if (typeof imageUrl === "string") {
      form.setValue("imageUrl", imageUrl, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  }, [imageUrl]);

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isLoading}
      />

      <div className="flex items-center justify-between">
        <Headings title={title} description={description} />
        {initialData && (
          <Button
            disabled={isLoading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Card className="p-4">
        <div>
          <Form {...form}>
            <form
              action=""
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location Name:</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter location name"
                        disabled={isLoading}
                      />
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
                    <FormLabel>Location Image:</FormLabel>
                    <FormControl>
                      <div>
                        {imageUrl ? (
                          <div className="relative h-[400px] w-[400px] rounded-md overflow-hidden">
                            <Image
                              src={imageUrl}
                              alt="locationImage"
                              fill
                              className="object-contain"
                            />

                            <button
                              type="button"
                              className="absolute top-2 right-2 rounded-full border bg-background hover:bg-slate-100 p-2"
                              onClick={() => handleFileDelete(imageUrl)}
                            >
                              {fileIsDeleting ? (
                                <Loader2 className="h-8 w-8" />
                              ) : (
                                <X className="w-8 h-8" />
                              )}
                            </button>
                          </div>
                        ) : (
                          <UploadDropzone
                            endpoint="locationImage"
                            onClientUploadComplete={(res) => {
                              setImageUrl(res[0].url);
                              toast({
                                title: "Success",
                                description: "Image uploaded sucessfully",
                              });
                            }}
                            onUploadError={(error: Error) => {
                              toast({
                                title: "Something went wrong",
                                description: `${error?.message}`,
                              });
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
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location Address:</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Where is this located?"
                        disabled={isLoading}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className=" flex justify-end gap-4 items-center">
                <Button
                  variant="outline"
                  type="button"
                  disabled={isLoading}
                  onClick={() => {
                    router.push("/admin/locations");
                  }}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center"
                >
                  {isLoading && (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  )}
                  {action}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Card>
    </>
  );
};

export default LocationForm;
