/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LogInIcon, SendIcon } from "lucide-react";
import toast from "react-hot-toast";
import { createComment } from "@/actions/postActions";
import { SignInButton, useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage } from "../ui/avatar";


interface CommentInputProps {
  postId: string;
}

export default function CommentInput({ postId }: CommentInputProps) {
  const [newComment, setNewComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const {user}= useUser();

  const handleAddComment = async () => {
    if (!newComment.trim() || isCommenting) return;

    try {
      setIsCommenting(true);
      const result = await createComment(postId, newComment);

      if (result?.success) {
        toast.success("Comment posted successfully");
        setNewComment("");
      }
    } catch (error) {
      toast.error("Failed to add a comment");
    } finally {
      setIsCommenting(false);
    }
  };

  return (
    <>
      {user ? (
        <div className="flex space-x-4">
           <Avatar className="w-12 h-12 border-2 ">
            <AvatarImage
              src={user?.imageUrl || "/avatar.avif"}
              alt="user's avatar"
              className="w-full h-full object-cover"
            />
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[50px] resize-none border rounded-[10px] p-3 shadow-sm focus:ring-2 "
            />
            <div className="flex justify-end mt-2">
              <Button
                onClick={handleAddComment}
                aria-label="Add Comment Button"
                className="flex items-center gap-2 cursor-pointer"
                disabled={!newComment.trim() || isCommenting}
              >
                {isCommenting ? (
                  "Posting..."
                ) : (
                  <>
                    <SendIcon className="size-4" /> Comment
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center p-4  rounded-lg bg-muted/50">
          <SignInButton mode="modal">
            <Button variant="outline" className="gap-2 cursor-pointer">
              <LogInIcon className="size-4" />
              Sign in to comment
            </Button>
          </SignInButton>
        </div>
      )}
    </>
  );
}
