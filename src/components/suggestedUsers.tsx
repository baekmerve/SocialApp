import {
  getRandomUsersPrivate,
  getRandomUsersPublic,
} from "@/actions/userActions";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import FollowButton from "./profile/followButton";
import { auth } from "@clerk/nextjs/server";

export default async function SuggestedUsers() {
  const { userId } = await auth();

  let users;
  if (userId) {
    users = await getRandomUsersPrivate();
  } else {
    users = await getRandomUsersPublic();
  }

  if (users.length === 0) return null;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-foreground"> Users to Follow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex gap-4 items-center justify-between hover:bg-gray-50 p-4 transition-all duration-200 hover:shadow-lg rounded-2xl dark:hover:shadow-shadow dark:hover:bg-[#0a0a0a] border "
            >
              <div className="flex items-center gap-2 ">
                <Link href={`/profile/${user.username}`}>
                  <Avatar className="w-12 h-12 border-2 ">
                    <AvatarImage
                      src={user.image ?? "/avatar.avif"}
                      alt={`${user.username}'s avatar`}
                      className=" w-full h-full object-cover"
                    />
                  </Avatar>
                </Link>
                <div className="text-sm">
                  <Link
                    href={`/profile/${user.username}`}
                    className="font-semibold text-foreground hover:text-primary-700 cursor-pointer"
                  >
                    <p className="text-xs text-muted-foreground">
                      {userId ? (
                        <span>{user.name || "Anonymous"}</span>
                      ) : (
                        <span>
                          {user.name?.substring(0, 2) || "Anonymous"}**
                        </span>
                      )}
                    </p>
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {userId ? (
                      <span>{user.username}</span>
                    ) : (
                      <span>{user.username.substring(0, 3)}**</span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user._count.followers} followers
                  </p>
                </div>
              </div>
              <FollowButton userId={user.id} isFollowing={false} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
