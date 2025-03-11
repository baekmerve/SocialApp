"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { BellIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import NotificationsDropdown from "@/components/notifications/notificationDropdown";
import { useState, useEffect } from "react";
import { getNotifications } from "@/actions/notificationActions";
import { UserNotification } from "@/types/type";

export default function NotificationBell() {
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [notifications, setNotifications] = useState<UserNotification[]>([]);

  useEffect(() => {
    async function fetchNotifications() {
      const data = await getNotifications();
      setNotifications(data);
      setUnreadCount(data.filter((notification) => !notification.read).length);
    }
    fetchNotifications();
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          aria-label="profile Button"
          className="relative p-2 cursor-pointer "
        >
          <BellIcon className="w-4 h-4" />
          <span className="hidden lg:inline"> Notifications</span>

          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-fit max-w-[500px]  p-0 ">
        <NotificationsDropdown notifications={notifications} />
      </PopoverContent>
    </Popover>
  );
}
