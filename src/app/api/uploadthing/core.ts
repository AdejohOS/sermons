import { currentUser } from "@/lib/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
  const user = await currentUser();
  if (!user?.id) throw new Error("Unauthorized");
  return { user };
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  authorImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())

    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.user?.id);
      console.log("file url", file.url);
      return { uploadedBy: metadata.user.id };
    }),
  categoryImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())

    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.user?.id);
      console.log("file url", file.url);
      return { uploadedBy: metadata.user.id };
    }),
  locationImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())

    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.user?.id);
      console.log("file url", file.url);
      return { uploadedBy: metadata.user.id };
    }),

  sermonImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())

    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.user?.id);
      console.log("file url", file.url);
      return { uploadedBy: metadata.user.id };
    }),
  sermonFile: f(["video", "audio"])
    .middleware(() => handleAuth())

    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.user?.id);
      console.log("file url", file.url);
      return { uploadedBy: metadata.user.id };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
