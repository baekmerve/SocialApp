import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";

export default function Loading() {
  return (
    <div className="mx-auto">
      <div className="grid grid-cols-1 gap-6">
        <Card className="p-6 rounded-xl shadow-lg bg-background border border-border">
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* LEFT SIDE - Profile Image & Info */}
            <div className="flex flex-col items-center text-center">
              <Skeleton className="w-40 h-40 rounded-full shadow-md border border-border mb-4" />
              <Skeleton className="w-40 h-6 mb-2" />
              <Skeleton className="w-24 h-4" />

              {/* Profile Stats */}
              <div className="flex justify-center gap-6 mt-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="text-center">
                    <Skeleton className="w-16 h-6 mb-2" />
                    <Skeleton className="w-12 h-4" />
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE - Profile Actions & Info */}
            <div className="flex flex-col justify-between h-full">
              {/* Follow / Edit Button */}
              <Skeleton className="w-36 h-10 mb-6 self-end" />

              {/* Bio, Location, Website */}
              <div className="space-y-3 text-sm mt-6 text-muted-foreground">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Skeleton className="w-6 h-6" />
                    <Skeleton className="w-48 h-4" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="posts" className="w-full">
          {/* Tabs List */}
          <TabsList className="w-full flex justify-evenly border-b rounded-none h-auto p-0 bg-transparent">
            <Skeleton className="w-24 h-10 " />
            <Skeleton className="w-24 h-10 " />
          </TabsList>

          {/* Tab Content */}
          <TabsContent value="posts" className="mt-6 animate-fade-in">
            <div className="space-y-6">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="w-full h-48 animate-pulse rounded-lg"
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
