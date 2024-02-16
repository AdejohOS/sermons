import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  
  authorImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    

    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", );
      console.log("file url", file.url);
      
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;