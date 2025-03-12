import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function NotificationSkeleton() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle>Notifications</CardTitle>
            <Skeleton className="h-4 w-20 animate-pulse" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="flex items-start gap-4 p-4 border-b">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 animate-pulse" />
                  <Skeleton className="h-4 w-40 animate-pulse" />
                </div>
                <div className="pl-6 space-y-2">
                  <Skeleton className="h-20 w-full animate-pulse" />
                  <Skeleton className="h-4 w-24 animate-pulse" />
                </div>
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
