import { formatDistanceToNow } from "date-fns";
import { Comment } from "@/types/type";
import { deleteComment } from "@/actions/postActions";
import DeleteItem from "../deleteItem";
import { Avatar, AvatarImage } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";

interface Props {
  comments: Comment[];
  currentUserId: string | null;
}

export default function CommentList({ comments, currentUserId }: Props) {
  return (
    <ScrollArea className="pr-4 max-h-[500px] overflow-auto ">
      <div className="space-y-3">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="flex space-x-4 border p-2 rounded-2xl"
          >
            <Avatar className="w-12 h-12 self-center border-2">
              <AvatarImage
                src={comment.author.image ?? "/avatar.avif"}
                alt="user's avatar"
                className="w-full h-full object-cover"
              />
            </Avatar>
            <div className="flex-1 space-y-2 ">
              <div className="flex flex-wrap items-center gap-2 ">
                <Link
                  href={`/profile/${comment.author.name}`}
                  className="hover:scale-105  text-"
                >
                  {comment.author.name}
                </Link>

                <Link
                  href={`/profile/${comment.author.username}`}
                  className="hover:scale-105 text-muted-foreground text-sm"
                >
                  @{comment.author.username}
                </Link>
                <span className="text-sm text-foreground">•</span>
                <span className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.createdAt))} ago
                </span>
              </div>
              <p className="text-sm break-all ">{comment.content}</p>
            </div>
            {currentUserId === comment.author.id && (
              <DeleteItem
                itemId={comment.id}
                deleteFunction={deleteComment}
                title="Delete Comment"
              />
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
