import React from "react";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";
import { getUserByClerkId } from "@/actions/userActions";

import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import { ProfileStats } from "./profileStats";
import ProfileDetails from "./profileDetails";
import UnAuthenticatedSidebar from "../navbar/unAuthenticatedSidebar";

export default async function SideProfile() {
  const { userId } = await auth();

  if (!userId) return <UnAuthenticatedSidebar />;

  const user = await getUserByClerkId(userId);

  if (!user) return null;

  return (
    <Card className="shadow-lg ">
      <CardContent className="pt-6 px-4">
        <div className="flex flex-col items-center text-center">
          <Link
            href={`/profile/${user.username}`}
            className="flex flex-col items-center justify-center"
          >
            <Avatar className="w-24 h-24 border-4 mb-4">
              <AvatarImage
                src={user.image || "/avatar.avif"}
                alt={`${user.username}'s avatar`}
                className="w-full h-full object-cover"
              />
            </Avatar>

            <div className="space-y-1">
              <h3 className="font-semibold text-xl text-foreground dark:text-white ">
                {user.name}
              </h3>
              <p className="text-sm text-muted-foreground dark:text-muted-foreground ">
                @{user.username}
              </p>
            </div>
          </Link>

          <div className="w-full mt-4">
            <Separator className="my-4" />
            <ProfileStats
              stats={{
                following: user._count.following,
                followers: user._count.followers,
                posts: user._count.posts,
              }}
            />
            <Separator className="my-4" />
          </div>

          <ProfileDetails
            currentUserId={userId}
            stats={{
              bio: user.bio,
              location: user.location,
              website: user.website,
              createdAt: user.createdAt,
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
