"use client";

import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/imageUpload";
import { ImageIcon, Loader2Icon, SendIcon } from "lucide-react";
import { createPost } from "@/actions/postActions";
import toast from "react-hot-toast";

export default function CreatePost() {
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return;
    setIsPosting(true);
    try {
      const result = await createPost(title, content, imageUrl);
      if (result?.success) {
        setTitle("");
        setContent("");
        setImageUrl("");
        setShowImageUpload(false);
        toast.success("Post created successfully");
      }
    } catch (error) {
      console.log("error in create post", error);
      toast.error("Failed to create post");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <Card className="mb-6 shadow-lg border border-muted-foreground/20 rounded-2xl">
      <CardContent className="pt-6 pb-4">
        <div className="space-y-4">
          {/* User Info & Textarea */}
          <div className="flex gap-3 items-start">
            <Avatar className="w-12 h-12 border-2 ">
              <AvatarImage
                src={user?.imageUrl || "/avatar.avif"}
                alt="user's avatar"
                className="w-full h-full object-cover"
              />
            </Avatar>

            <div className="flex flex-col w-full gap-4">
              <Textarea
                placeholder="Enter post title"
                className="w-full min-h-[50px] text-base resize-none rounded-[10px] p-3 focus:ring-2 focus:ring-primary transition-all border"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isPosting}
              />

              <Textarea
                placeholder="What's on your mind?"
                className="w-full min-h-[100px] resize-none border  p-3 text-base focus:ring-2 focus:ring-primary transition-all rounded-[10px]"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isPosting}
              />
            </div>
          </div>

          {/* Image Upload Section */}
          {(showImageUpload || imageUrl) && (
            <div className="border rounded-xl p-4 bg-muted">
              <ImageUpload
                endpoint="postImage"
                value={imageUrl}
                onChange={(url) => {
                  setImageUrl(url);
                  if (!url) setShowImageUpload(false);
                }}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between border-t pt-4">
            {/* Add Image Button */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-muted-foreground transition-all rounded-[10px] cursor-pointer"
              onClick={() => setShowImageUpload(!showImageUpload)}
              disabled={isPosting}
              aria-label="Add Image Button"
            >
              <ImageIcon className="size-4" />
              Upload Photo
            </Button>

            {/* Post Button */}
            <Button
              className="flex items-center px-4 py-2  shadow-md transition-all hover:bg-primary/90 rounded-[10px]"
              onClick={handleSubmit}
              aria-label="Post Button"
              disabled={!title.trim() || !content.trim() || isPosting}
            >
              {isPosting ? (
                <>
                  <Loader2Icon className="size-4 mr-2 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <SendIcon className="size-4 mr-2" />
                  Post
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
