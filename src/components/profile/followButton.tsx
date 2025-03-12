/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Loader2, UserMinus, UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import { toggleFollow } from "@/actions/userActions";
import { SignInButton, useUser } from "@clerk/nextjs";

interface Props {
  userId: string;
  isFollowing: boolean;
}

export default function FollowButton({
  userId,
  isFollowing: initialFollowing,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(initialFollowing);

  const { user } = useUser();

  const handleFollow = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      await toggleFollow(userId);
      setIsFollowing(!isFollowing);
      toast.success(isFollowing ? "Unfollowed" : "Successfully followed");
    } catch (error) {
      toast.error("Failed to update follow status");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4">
      {!user ? (
        <SignInButton mode="modal">
          <Button className="h-10 flex items-center">
            <UserPlus className="size-5 mr-2" />
            Follow
          </Button>
        </SignInButton>
      ) : (
        <Button
          className="h-10 flex items-center cursor-pointer"
          aria-label="follow Button"
          onClick={handleFollow}
          disabled={isLoading}
          variant={isFollowing ? "outline" : "default"}
        >
          {isLoading ? (
            <Loader2 className="animate-spin size-5 mr-2" />
          ) : (
            <div className="flex items-center">
              {isFollowing ? (
                <>
                  <UserMinus className="size-5 mr-2" />
                  <span>Unfollow</span>
                </>
              ) : (
                <>
                  <UserPlus className="size-5 mr-2" />
                  <span>Follow</span>
                </>
              )}
            </div>
          )}
        </Button>
      )}
    </div>
  );
}
