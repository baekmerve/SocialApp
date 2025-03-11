import { getNotifications } from "@/actions/notificationActions";
import { getProfileByUsername, getUserPosts } from "@/actions/profileActions";

type UserNotifications = Awaited<ReturnType<typeof getNotifications>>;
export type UserNotification = UserNotifications[number];

export type User = Awaited<ReturnType<typeof getProfileByUsername>>;

export type Posts = Awaited<ReturnType<typeof getUserPosts>>;
export type Post = Posts[number];

export interface UserStats {
  following: number;
  followers: number;
  posts: number;
}

export interface UserProfileDetails {
  bio: string | null;
  location: string | null;
  website: string | null;
  createdAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  author: {
    id: string;
    name: string | null;
    username: string;
    image?: string | null;
  };
}

export interface CommentsProps {
  comments: Comment[];
  postId: string;
}
