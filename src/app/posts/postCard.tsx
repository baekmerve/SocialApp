import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Post } from "@/types/type";
import DeleteItem from "@/components/deleteItem";
import { deletePost } from "@/actions/postActions";
import PostFooter from "@/components/post/postFooter";

interface Props {
  post: Post;
  currentUserId: string | null;
  profileOwnerId?: string;
}

export default function PostCard({
  post,
  profileOwnerId,
  currentUserId,
}: Props) {
  return (
    <Card className="overflow-hidden rounded-2xl shadow-lg border-2 dark:shadow-shadow">
      {/* POST HEADER */}
      <CardHeader className="px-4 ">
        <div className="flex items-center ">
          <Link href={`/profile/${post.author.username}`}>
            <Avatar className="w-12 h-12 border-2 ">
              <AvatarImage
                src={post.author.image ?? "/avatar.avif"}
                alt="user's avatar"
                className="w-full h-full object-cover"
              />
            </Avatar>
          </Link>

          <div className="flex-1 min-w-0 p-2 ">
            <div className="flex justify-between items-start">
              <div className="w-full flex space-x-2 justify-between  ">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Link
                    href={`/profile/${post.author.username}`}
                    className="font-semibold text-foreground text-base hover:scale-105 "
                  >
                    {post.author.name}
                  </Link>

                  <Link
                    href={`/profile/${post.author.username}`}
                    className="hover:scale-105 "
                  >
                    @{post.author.username}
                  </Link>
                  <span className="text-foreground">•</span>
                  <span>
                    {formatDistanceToNow(new Date(post.createdAt))} ago
                  </span>
                </div>
                {currentUserId === post.authorId && (
                  <DeleteItem
                    itemId={post.id}
                    deleteFunction={deletePost}
                    title="Delete Post"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      {/* POST CONTENT */}
      <Link href={`/posts/${post.id}`} className="block ">
        <CardContent className="py-1 px-4 space-y-3 ">
          <p className="text-lg font-semibold break-words">{post.title}</p>
          <p className="text-sm break-words">{post.content}</p>

          {post.image && (
            <div className="relative mx-auto w-full max-w-[600px] max-h-[300px] overflow-hidden border-2 shadow-md hover:shadow-lg transition-shadow duration-200 rounded-2xl">
              <Image
                src={post.image}
                alt="Post content"
                width={200}
                height={200}
                className="w-full h-auto object-cover"
              />
            </div>
          )}
        </CardContent>
      </Link>

      <CardFooter className="flex flex-col px-4  ">
        <PostFooter
          postId={post.id}
          initialLiked={post.likes.some(
            (like) => like.userId === profileOwnerId
          )}
          initialLikesCount={post._count.likes}
          comments={post.comments}
          currentUserId={currentUserId}
        />
      </CardFooter>
    </Card>
  );
}
