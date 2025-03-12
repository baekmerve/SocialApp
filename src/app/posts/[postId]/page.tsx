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
    <div className="flex flex-col items-center w-full min-h-screen p-5 ">
      <h1 className="font-bold text-2xl ">Post Details</h1>
      <div className=" w-[90%] mt-10 h-fit ">
        <Post postId={postId} />
      </div>
    </div>
  );
}
