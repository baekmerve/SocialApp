import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import NotificationItem from "./notificationItem";
import { UserNotification } from "@/types/type";
import { Suspense } from "react";
import NotificationSkeleton from "./notificationSkeleton";

export default function NotificationsDropdown({
  notifications,
}: {
  notifications: UserNotification[];
}) {
  return (
    <Card className="  border-2 p-2 bg-card ">
      <CardContent className="p-0  ">
        <ScrollArea className="pr-2  max-h-[350px] overflow-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              No notifications yet
            </div>
          ) : (
            notifications.map((notification) => (
              <Suspense
                key={notification.id}
                fallback={<NotificationSkeleton />}
              >
                <NotificationItem notification={notification} />
              </Suspense>
            ))
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
