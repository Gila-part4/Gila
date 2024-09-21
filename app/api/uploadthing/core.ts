import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { createRouteHandler } from 'uploadthing/next';
import { getSessionUserData } from '@/app/data/user';

const f = createUploadthing();
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB', maxFileCount: 5 } })
    .middleware(async () => {
      const { id } = await getSessionUserData();
      return { userId: id };
    })
    .onUploadComplete(async ({ metadata }) => {
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
