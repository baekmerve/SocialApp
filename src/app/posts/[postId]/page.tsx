import { getPostById } from "@/actions/postActions";
import { getDbUserId } from "@/actions/userActions";
import React from "react";
import PostCard from "../postCard";
import { notFound } from "next/navigation";

async function Post({ postId }: { postId: string }) {
  const post = await getPostById(postId);
  const currentUserId = await getDbUserId();
  if (!post) notFound();

  return <PostCard post={post} currentUserId={currentUserId} useLink={false} />;
}

export default async function SinglePostPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;

  return (
    <div className="flex flex-col ">
      <h1 className="font-bold self-center text-2xl mb-5">Post Details</h1>
      <div className="self-center max-w-[90%] h-fit p-2 ">
        <Post postId={postId} />
      </div>
    </div>
  );
}
