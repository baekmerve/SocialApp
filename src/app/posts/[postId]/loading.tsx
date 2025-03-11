import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PostSkeleton() {
  return (
    <div className="mx-auto w-full min-w-[700px] h-full p-2 ">
      <div className="grid grid-cols-1 gap-6">
        <Card className="w-full h-full ">
          <CardHeader className="">
            <div className="flex items-center justify-between"></div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex items-start gap-4 p-4 ">
              <Skeleton className="h-10 w-10 rounded-full " />

              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-40" />

                <div className=" mt-5 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-20 w-full" />
                </div>
                <div className="flex gap-5">
                  <Skeleton className="size-5 rounded-full " />
                  <Skeleton className="size-5 rounded-full " />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
