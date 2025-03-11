/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HeartIcon } from "lucide-react";
import toast from "react-hot-toast";
import { toggleLike } from "@/actions/postActions";
import { SignInButton, useUser } from "@clerk/nextjs";

interface Props {
  postId: string;
  initialLiked: boolean;
  initialLikesCount: number;
}

export default function LikeButton({
  postId,
  initialLiked,
  initialLikesCount,
}: Props) {
  const [hasLiked, setHasLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikesCount);
  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  const handleLike = async () => {
    if (!user) return;
    if (loading) return;

    try {
      setLoading(true);
      setHasLiked((prev) => !prev);
      setLikeCount((prev) => prev + (hasLiked ? -1 : 1));
      await toggleLike(postId);
      toast.success(hasLiked ? "Unliked post" : "Liked post");
    } catch (error) {
      setLikeCount(initialLikesCount);
      setHasLiked(initialLiked);
      toast.error("Error in liking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {user ? (
        <Button
          variant="ghost"
          size="sm"
          aria-label={hasLiked ? "Unlike Post" : "Like Post"}
          className={`gap-2 cursor-pointer transition-all duration-150  ${
            hasLiked ? "text-primary hover:text-primary" : "hover:text-primary"
          }`}
          onClick={handleLike}
          disabled={loading}
        >
          <HeartIcon className={`size-5 ${hasLiked ? "fill-current" : ""}`} />
          <span>{likeCount}</span>
        </Button>
      ) : (
        <SignInButton mode="modal">
          <Button
            variant="ghost"
            size="sm"
            aria-label="SignIn Button"
            className="gap-2 cursor-pointer hover:text-primary"
          >
            <HeartIcon className="size-5" />
            <span>{likeCount}</span>
          </Button>
        </SignInButton>
      )}
    </>
  );
}
