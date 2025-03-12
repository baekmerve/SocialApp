import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Post } from "@/types/type";
import { LockIcon } from "lucide-react";
import DeleteItem from "@/components/deleteItem";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { deletePost } from "@/actions/postActions";
import PostFooter from "@/components/post/postFooter";

interface Props {
  post: Post;
  currentUserId: string | null;
  profileOwnerId?: string;
  useLink?: boolean;
}

export default function TestPostCard({
  post,
  currentUserId,
  profileOwnerId,
  useLink = true,
}: Props) {
  const isLoggedIn = Boolean(currentUserId);

  return (
    <Card className="relative mx-auto w-[90%] overflow-hidden rounded-2xl shadow-lg border-2 dark:shadow-shadow px-4">
      {/* Overlay for blur effect and lock icon */}
      {!isLoggedIn && (
        <div className="absolute inset-0 flex  flex-col gap-2 items-center justify-center bg-black/40  bg-bg/50 backdrop-blur-sm z-10">
          <LockIcon className="text-white size-7 mb-2" />
          <p className=" text-white mt-2 font-semibold text-md">
            로그인 후 전체 내용을 확인하세요
          </p>
        </div>
      )}
      {/* POST HEADER */}
      <CardHeader className="px-6 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          {/* User Info */}
          <Link
            href={`/profile/${post.author.username}`}
            className="flex items-center gap-4 group"
          >
            <Avatar className="w-12 h-12 border-2  ">
              <AvatarImage
                src={post.author.image ?? "/avatar.avif"}
                alt="User's avatar"
                className="w-full h-full object-cover "
              />
            </Avatar>
            <div className="flex flex-col">
              <p className="font-semibold text-foreground text-md group-hover:text-cyan-500 transition-colors">
                {post.author.name || "Unknown User"}
              </p>
              <p className="text-muted-foreground text-sm group-hover:text-cyan-600 transition-colors">
                @{post.author.username}
              </p>
            </div>
          </Link>

          {/* Timestamp & Actions */}
          <div className="flex items-center gap-4 text-muted-foreground text-xs">
            <span>{formatDistanceToNow(new Date(post.createdAt))} ago</span>

            {currentUserId === post.authorId && (
              <DeleteItem
                itemId={post.id}
                deleteFunction={deletePost}
                title="Delete Post"
              />
            )}
          </div>
        </div>
      </CardHeader>

      {/* POST CONTENT */}
      {useLink ? (
        <Link href={`/posts/${post.id}`} className="block">
          <CardContent className="py-1 px-4 space-y-3">
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
                  priority
                />
              </div>
            )}
          </CardContent>
        </Link>
      ) : (
        <CardContent className="py-1 px-4 space-y-3">
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
      )}
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
