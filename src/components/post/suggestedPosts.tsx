import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import Link from "next/link";

import { auth } from "@clerk/nextjs/server";
import {
  getRandomPostsPrivate,
  getRandomPostsPublic,
} from "@/actions/postActions";
export default async function SuggestedPosts() {
  const { userId } = await auth();

  let posts;
  if (userId) {
    posts = await getRandomPostsPrivate();
  } else {
    posts = await getRandomPostsPublic();
  }

  if (posts.length === 0) return null;

  return (
    <Card className="shadow-lg">
      <CardHeader className="">
        <CardTitle className="text-foreground">
          Suggested Posts For You
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/posts/${post.id}`}
              className="cursor-pointer"
            >
              <div
                className="flex flex-col gap-2 items-start justify-between px-4 py-2 border rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-200
                hover:bg-gray-50  dark:hover:bg-[#0a0a0a] dark:hover:shadow-shadow "
              >
                <div className=" w-full space-y-1 ">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {post.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {post.content}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-2 self-end">
                  <p className="text-xs text-muted-foreground">
                    {userId ? (
                      <span>{post.author.name || "Anonymous"}</span>
                    ) : (
                      <span>
                        {post.author.name?.substring(0, 2) || "Anonymous"}**
                      </span>
                    )}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {userId ? (
                      <span>{post.author.username}</span>
                    ) : (
                      <span>{post.author.username.substring(0, 3)}**</span>
                    )}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
