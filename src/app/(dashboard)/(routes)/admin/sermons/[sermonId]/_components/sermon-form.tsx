"use client";

import Image from "next/image";

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
import { Label } from "@/components/ui/label";
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
import { CalendarIcon, Loader2, Trash, X } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";

import { useParams, useRouter } from "next/navigation";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";

import { SermonValues, SermonSchema } from "@/lib/validation";

import { useEffect, useState } from "react";
import { Sermon, Author, Category, Location } from "@prisma/client";
import { AlertModal } from "@/components/modals/alert-modal";

import Headings from "@/components/headings";
import { Card } from "@/components/ui/card";
import axios from "axios";

import { Calendar } from "@/components/ui/calendar";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

interface SermonFormProps {
  initialData: Sermon | null;
  authors: Author[];
  categories: Category[];
  locations: Location[];
}

const SermonForm = ({
  initialData,
  authors,
  categories,
  locations,
}: SermonFormProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [imageIsDeleting, setImageIsDeleting] = useState(false);
  const [fileIsDeleting, setFileIsDeleting] = useState(false);

  const [imageUrl, setImageUrl] = useState<string | null | undefined>(
    initialData?.imageUrl
  );
  const [fileUrl, setFileUrl] = useState<string | null | undefined>(
    initialData?.fileUrl
  );

  const [isLoading, setLoading] = useState<boolean>(false);

  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Edit Sermon" : "Create a sermon";
  const description = initialData
    ? "Edit an a sermon"
    : "Fill out the form to create a new sermon";
  const action = initialData ? "Save changes" : "Create sermon";
  const toastMessage = initialData ? "Sermon updated!" : "Sermon created!";

  const form = useForm<SermonValues>({
    resolver: zodResolver(SermonSchema),
    defaultValues: {
      title: initialData?.title || "",
      imageUrl: "",
      fileUrl: "",
      about: initialData?.about || "",

      authorId: initialData?.authorId || "",
      locationId: initialData?.locationId || "",
      categoryId: initialData?.categoryId || "",
      isPublished: initialData?.isPublished || false,
      dateDelivered: initialData?.dateDelivered || undefined,
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

  const onSubmit = async (values: SermonValues) => {
    setLoading(true);
    try {
      if (initialData) {
        await axios.patch(`/api/sermon/${params.sermonId}`, values);
      } else {
        await axios.post("/api/sermon", values);
      }
      console.log(values);
      toast({ title: "Success", description: toastMessage });
      router.push(`/admin/sermons`);
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

    const getFileKey = (src: string) => src.substring(src.lastIndexOf("/") + 1);
    try {
      const fileKey = getImageKey(initialData?.imageUrl!);
      const sermonKey = getFileKey(initialData?.fileUrl!);

      axios.post("/api/uploadthing/delete", { fileKey });
      axios.post("/api/uploadthing/clear", { sermonKey });
      await axios.delete(`/api/sermon/${params.sermonId}`);
      toast({ title: "Success", description: "Sermon deleted." });
      router.push(`/admin/sermons`);
      router.refresh();
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

  const handleImageDelete = async (imageUrl: string) => {
    setImageIsDeleting(true);
    const imageKey = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);

    axios
      .post("/api/uploadthing/delete", { imageKey })
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
        setImageIsDeleting(false);
      });
  };

  const handleFileDelete = async (fileUrl: string) => {
    setFileIsDeleting(true);
    const fileKey = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);

    axios
      .post("/api/uploadthing/clear", { fileKey })
      .then((res) => {
        if (res.data.success) {
          setFileUrl("");
          toast({ title: "Success", description: "File deleted" });
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
    if (typeof fileUrl === "string") {
      form.setValue("fileUrl", fileUrl, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  }, [imageUrl, fileUrl]);

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
              <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-4 items-center">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sermon Title:</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter sermon title"
                          disabled={isLoading}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="authorId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sermon Minister:</FormLabel>
                      <Select
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={field.value}
                              placeholder="Select an author"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {authors.map((author) => (
                            <SelectItem key={author.id} value={author.id}>
                              {author.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-4 items-center">
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select a category</FormLabel>
                      <Select
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={field.value}
                              placeholder="Select a category"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((size) => (
                            <SelectItem key={size.id} value={size.id}>
                              {size.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateDelivered"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Sermon Date:</FormLabel>

                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              disabled={isLoading}
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
                <FormField
                  control={form.control}
                  name="fileUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sermon Audio/Video:</FormLabel>
                      <FormControl>
                        <div>
                          {fileUrl ? (
                            <div className="relative  rounded-md overflow-hidden">
                              <AudioPlayer
                                src={fileUrl}
                                autoPlay
                                className="object-contain mt-10"
                              />

                              <button
                                type="button"
                                className="absolute top-0 right-2 rounded-full border bg-destructive/15 p-1"
                                onClick={() => handleFileDelete(fileUrl)}
                              >
                                {fileIsDeleting ? (
                                  <Loader2 className="h-6 w-6 text-destructive" />
                                ) : (
                                  <X className="w-6 h-6 text-destructive" />
                                )}
                              </button>
                            </div>
                          ) : (
                            <UploadButton
                              endpoint="sermonFile"
                              onClientUploadComplete={(res) => {
                                setFileUrl(res[0].url);
                                toast({
                                  title: "Success",
                                  description: "File uploaded sucessfully",
                                });
                              }}
                              onUploadError={(error: Error) => {
                                toast({
                                  title: "Somrtging went wrong",
                                  description: `${error?.message}`,
                                });
                              }}
                            />
                          )}
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="locationId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sermon Location:</FormLabel>
                      <Select
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={field.value}
                              placeholder="Select a location"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {locations.map((location) => (
                            <SelectItem key={location.id} value={location.id}>
                              {location.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About Sermon:</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="what is the sermon about?"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sermon Image:</FormLabel>
                    <FormControl>
                      <div>
                        {imageUrl ? (
                          <div className="relative h-[400px] w-[400px] rounded-md overflow-hidden">
                            <Image
                              src={imageUrl}
                              alt="sermonImage"
                              fill
                              className="object-contain"
                            />

                            <button
                              type="button"
                              className="absolute top-2 right-2 rounded-full border bg-destructive/15 p-1"
                              onClick={() => handleImageDelete(imageUrl)}
                            >
                              {imageIsDeleting ? (
                                <Loader2 className="h-6 w-6 text-destructive" />
                              ) : (
                                <X className="w-6 h-6 text-destructive" />
                              )}
                            </button>
                          </div>
                        ) : (
                          <UploadDropzone
                            endpoint="authorImage"
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
                name="isPublished"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <div>
                          <div className="flex items-center space-x-2 relative">
                            <Label htmlFor="isPublished">
                              Publish this sermon
                            </Label>
                            <Checkbox
                              onCheckedChange={field.onChange}
                              checked={field.value}
                              id="isPublished"
                            />
                          </div>
                          <p className="text-xs text-slate-500 mt-1">
                            <span className="text-destructive">*</span> Click on
                            the checkbox if you wish to publish this sermon.
                          </p>
                        </div>
                      </FormControl>
                    </FormItem>
                  );
                }}
              />

              <div className=" flex justify-end gap-4 items-center">
                <Button
                  variant="outline"
                  type="button"
                  disabled={isLoading}
                  onClick={() => {
                    router.push("/admin/sermons");
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

export default SermonForm;
