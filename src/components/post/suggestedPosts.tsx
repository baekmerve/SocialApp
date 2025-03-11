import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import Link from "next/link";
import { getRandomPosts } from "@/actions/postActions";
import Image from "next/image";
import { Avatar, AvatarImage } from "../ui/avatar";

export default async function SuggestedPosts() {
  const posts = await getRandomPosts();

  if (posts.length === 0) return null;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-foreground">Suggested Posts For You</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/posts/${post.id}`}
              className="cursor-pointer"
            >
              <div
                className="flex flex-col gap-2 items-start justify-between p-4 border rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-200
                hover:bg-gray-50  dark:hover:bg-[#0a0a0a] dark:hover:shadow-shadow "
              >
                <div className="flex items-center gap-2">
                  <Avatar className=" w-12 h-12 border-2 rounded-[10px]">
                    <AvatarImage
                      src={post.author.image ?? "/avatar.avif"}
                      alt="user's avatar"
                      className="object-cover w-full h-full"
                    />
                  </Avatar>

                  <div className="text-sm">
                    <p className="font-medium text-primary-500 hover:text-primary-700 cursor-pointer">
                      {post.author.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      @{post.author.username}
                    </p>
                  </div>
                </div>

                <div className=" w-full space-y-2 ">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {post.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {post.content}
                  </p>
                  {post.image && (
                    <div className=" w-fit h-fit rounded-[10px] overflow-hidden border shadow-md">
                      <Image
                        src={post.image}
                        alt="post image"
                        width={100}
                        height={100}
                        className="object-cover w-full h-full "
                      />
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
