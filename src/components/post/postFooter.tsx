"use client";

import React, { Suspense, useState } from "react";
import { Button } from "../ui/button";
import { MessageCircleIcon } from "lucide-react";
import CommentSkeleton from "../comment/commentSkeleton";
import CommentInput from "../comment/commentInput";
import { Comment } from "@/types/type";
import LikeButton from "./likeButton";
import dynamic from "next/dynamic";

const CommentList = dynamic(() => import("../comment/commentList"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

interface Props {
  postId: string;
  comments: Comment[];
  currentUserId: string | null;
  initialLiked: boolean;
  initialLikesCount: number;
}

export default function PostFooter({
  postId,
  initialLiked,
  initialLikesCount,
  comments,
  currentUserId,
}: Props) {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="w-full">
      <div className="flex items-center space-x-4  mb-2">
        {/* LIKE BUTTON */}
        <LikeButton
          postId={postId}
          initialLiked={initialLiked}
          initialLikesCount={initialLikesCount}
        />

        {/* COMMENT BUTTON */}
        <Button
          variant="ghost"
          size="sm"
          aria-label="Comment Button"
          className="gap-2 hover:text-blue-500 cursor-pointer transition-all"
          onClick={() => setShowComments((prev) => !prev)}
        >
          <MessageCircleIcon
            className={`size-5 ${
              showComments ? "fill-blue-500 text-blue-500" : ""
            }`}
          />
          <span>{comments.length}</span>
        </Button>
      </div>

      {/* COMMENTS SECTION */}
      {showComments && (
        <div className="w-full space-y-5 pt-5 border-t-2 animate-in ">
          {/* DISPLAY COMMENTS */}
          <Suspense fallback={<CommentSkeleton />}>
            <CommentList comments={comments} currentUserId={currentUserId} />
          </Suspense>

          {/* ADD COMMENT */}
          <CommentInput postId={postId} />
        </div>
      )}
    </div>
  );
}
