import {
  getProfileByUsername,
  getUserLikedPosts,
  getUserPosts,
  isFollowing,
} from "@/actions/profileActions";
import { notFound } from "next/navigation";
import React from "react";
import { getDbUserId } from "@/actions/userActions";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ProfileStats } from "@/components/profile/profileStats";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { FileTextIcon, HeartIcon, UserPlus } from "lucide-react";
import ProfileEditDialog from "../../../components/profile/profileEditDialog";
import FollowButton from "@/components/profile/followButton";
import ProfileDetails from "@/components/profile/profileDetails";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostCard from "@/app/posts/postCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const user = await getProfileByUsername(username);

  if (!user) return;
  return {
    title: `${user.name ?? user.username}`,
    description: user.bio || `Check out ${user.username}'s profile `,
  };
}

export default async function ProfilePageServer({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  //profile owner
  const profileOwner = await getProfileByUsername(username);
  //current logged in
  const currentUserId = await getDbUserId();

  if (!profileOwner) notFound();
  const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
    getUserPosts(profileOwner.id),
    getUserLikedPosts(profileOwner.id),
    isFollowing(profileOwner.id),
  ]);
  const isOwnProfile = currentUserId === profileOwner.id;

  return (
    
      <div className="grid grid-cols-1 gap-6 ">
        <Card className="p-6 rounded-2xl shadow-lg bg-background">
          <CardContent className="space-y-6 min-h-[300px] border-2 rounded-2xl py-5">
            {/* Profile Header - Image, Name, Username, Stats, Follow Button */}
            <div className="flex flex-col items-center text-center">
              <Avatar className="w-40 h-40 border-4 shadow-md">
                <AvatarImage
                  src={profileOwner.image ?? "/avatar.avif"}
                  alt="user's avatar"
                  className="w-full h-full object-cover"
                />
              </Avatar>

              <h1 className="mt-4 text-2xl font-bold">
                {profileOwner.name ?? profileOwner.username}
              </h1>
              <p className="text-sm text-muted-foreground">
                @{profileOwner.username}
              </p>

              <ProfileStats
                stats={{
                  following: profileOwner._count.following,
                  followers: profileOwner._count.followers,
                  posts: profileOwner._count.posts,
                }}
              />

              {/* Follow / Edit Button */}
              <div className="mt-4">
                {!currentUserId ? (
                  <SignInButton mode="modal">
                    <Button className="h-10 flex items-center">
                      <UserPlus className="size-5 mr-2" />
                      Follow
                    </Button>
                  </SignInButton>
                ) : isOwnProfile ? (
                  <ProfileEditDialog profileOwner={profileOwner} />
                ) : (
                  <FollowButton
                    userId={profileOwner.id}
                    isFollowing={isCurrentUserFollowing}
                  />
                )}
              </div>
            </div>
            {/* Profile Details - Bio, Location, Website, Join Date */}
            <ProfileDetails
              stats={{
                bio: profileOwner.bio,
                location: profileOwner.location,
                website: profileOwner.website,
                createdAt: profileOwner.createdAt,
              }}
            />
          </CardContent>
        </Card>
        <Tabs defaultValue="posts" className="w-full md:w-3/4  mx-auto flex ">
          {/* Tabs List */}
          <TabsList className="w-full flex border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger
              value="posts"
              className="flex items-center gap-2 rounded-none px-6 py-3 font-semibold text-muted-foreground data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary transition-colors duration-200"
            >
              <FileTextIcon className="size-4" />
              Posts
            </TabsTrigger>
            <TabsTrigger
              value="likes"
              className="flex items-center gap-2 rounded-none px-6 py-3 font-semibold text-muted-foreground data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary transition-colors duration-200"
            >
              <HeartIcon className="size-4" />
              Likes
            </TabsTrigger>
          </TabsList>

          {/* Posts Tab Content */}
          <TabsContent value="posts" className="mt-6 animate-fade-in">
            <div className="space-y-6 ">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    profileOwnerId={profileOwner.id}
                    currentUserId={currentUserId}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No posts yet
                </div>
              )}
            </div>
          </TabsContent>

          {/* Likes Tab Content */}
          <TabsContent value="likes" className="mt-6 animate-fade-in">
            <div className="space-y-6">
              {likedPosts.length > 0 ? (
                likedPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    profileOwnerId={profileOwner.id}
                    currentUserId={currentUserId}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No liked posts to show
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    
  );
}
