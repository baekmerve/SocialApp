"use client";

import { markNotificationsAsRead } from "@/actions/notificationActions";
import { UserNotification } from "@/types/type";
import { formatDistanceToNow } from "date-fns";
import { HeartIcon, MessageCircleIcon, UserPlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "LIKE":
      return <HeartIcon className="size-4 text-primary" />;
    case "COMMENT":
      return <MessageCircleIcon className="size-4 text-blue-500" />;
    case "FOLLOW":
      return <UserPlusIcon className="size-4 text-green-500" />;
    default:
      return null;
  }
};



export default function NotificationItem({
  notification,
}: {
  notification: UserNotification;
}) {
  const [read, setRead] = useState(notification.read);

  useEffect(() => {
    if (!read) {
      markNotificationsAsRead([notification.id]).then(() => setRead(true));
    }
  }, [read, notification.id]);

  return (
    <div
      className={`flex items-center  hover:bg-muted/25 transition-colors w-full p-2 rounded-2xl mt-2
        ${!read ? "bg-muted/50" : ""}`}
    >
      <div className="flex-1 space-y-2  ">
        <div className="flex justify-between">
          <div className="flex items-center gap-2 ">
            {getNotificationIcon(notification.type)}
            <span className="text-sm">
              <span className="font-sans ">
                {notification.creator.username}
              </span>{" "}
              {notification.type === "FOLLOW"
                ? "started following you."
                : notification.type === "LIKE"
                ? "liked your post."
                : "commented on your post."}
            </span>
          </div>
          <div className="">
            <p className="text-xs text-muted-foreground pl-6">
              {formatDistanceToNow(new Date(notification.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
        {notification.type === "FOLLOW" ? (
          <Link
            href={`/profile/${notification.creator.username}`}
            className="block"
          >
            <div className="flex items-center mt-3  p-2 rounded-[8px] bg-muted/50 ">
              <span className="flex-1 text-sm font-sans">
                {`Go to ${notification.creator.username}'s profile`}
              </span>
              <div className="size-14 rounded-[10px] overflow-hidden border shadow-md">
                <Image
                  src={notification.creator.image ?? "/avatar.avif"}
                  alt="Post content"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Link>
        ) : (
          notification.post &&
          (notification.type === "LIKE" || notification.type === "COMMENT") && (
            <Link href={`/posts/${notification.post.id}`} className="block">
              <div className="flex items-center justify-between mt-3 gap-3 p-2 rounded-[8px] bg-muted/50 ">
                {/* Notification Content */}
                <div className=" space-y-2 p-2 bg-muted/50 rounded-[8px] max-w-[350px]">
                  {/* Post Title */}
                  <p className=" text-md font-bold text-foreground truncate ">
                    {notification.post.title}
                  </p>

                  {/* Comment (if available) */}
                  {notification.type === "COMMENT" && notification.comment && (
                    <div className="text-sm p-2 bg-primary/50 text-primary-foreground rounded-[8px] truncate ">
                      {notification.comment.content}
                    </div>
                  )}
                </div>

                {/* Post Image */}
                {notification.post.image && (
                  <div className="size-14 rounded-[10px] overflow-hidden border shadow-md">
                    <Image
                      src={notification.post.image}
                      alt="Post content"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
