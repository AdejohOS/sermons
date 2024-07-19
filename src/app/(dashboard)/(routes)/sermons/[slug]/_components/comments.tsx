import { Comment, User } from "@prisma/client";
import CommentList from "./comment-list";
import { db } from "@/lib/db";

const Comments = async ({ sermonId }: { sermonId: string }) => {
  const comments = await db.comment.findMany({
    where: {
      sermonId,
    },
    include: {
      user: true,
    },
  });
  return (
    <>
      <CommentList sermonId={sermonId} comments={comments} />
    </>
  );
};

export default Comments;
