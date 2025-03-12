"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types/type";

interface Props {
  post: Post;
  useLink?: boolean;
}

const PostContent = ({ post, useLink = true }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const cardContent = (
    <div className="space-y-2">
      <p className="text-lg font-semibold break-words">{post.title}</p>
      <p
        className={`text-sm break-words overflow-hidden  ${
          !isExpanded ? "max-h-10" : "max-h-none"
        }`}
      >
        {post.content}
      </p>
      {post.content && post.content.length > 100 && (
        <button
          className="text-cyan-500 text-sm mt-2 hover:text-cyan-600 transition-colors"
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        >
          {isExpanded ? "Read less" : "Read more"}
        </button>
      )}
      {post.image && (
        <div className="relative mx-auto overflow-hidden border-2 max-w-[80%]  max-h-[300px] shadow-md rounded-2xl">
          <Image
            src={post.image}
            alt="Post content"
            width={200}
            height={100}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      )}
    </div>
  );

  return useLink ? (
    <Link href={`/posts/${post.id}`} className="block">
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
};

export default PostContent;
