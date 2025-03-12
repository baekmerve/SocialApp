import { UserProfileDetails } from "@/types/type";
import { format } from "date-fns";
import {
  CalendarIcon,
  LinkIcon,
  LockIcon,
  MapPinIcon,
  MessageSquareText,
} from "lucide-react";

interface Props {
  currentUserId: string | null;
  stats: UserProfileDetails;
}

export default function ProfileDetails({ stats, currentUserId }: Props) {
  const formattedDate = format(new Date(stats.createdAt), "MMMM yyyy");

  return (
    <>
      {currentUserId ? (
        <div className="w-full space-y-2 text-sm text-muted-foreground">
          <div className="flex gap-2 text-left">
            <MessageSquareText className="size-5" />
            {stats.bio || "No bio info"}
          </div>

          <div className="flex gap-2">
            <MapPinIcon className="size-5" />
            {stats.location || "No location info"}
          </div>

          <div className="flex gap-2">
            <LinkIcon className="size-5" />
            {stats.website ? (
              <a
                href={
                  stats.website.startsWith("http")
                    ? stats.website
                    : `https://${stats.website}`
                }
                className="text-left hover:underline break-all text-cyan-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                {stats.website}
              </a>
            ) : (
              "No website info"
            )}
          </div>

          <div className="flex gap-2">
            <CalendarIcon className="size-5" />
            Joined {formattedDate}
          </div>
        </div>
      ) : (
        <div className=" rounded-2xl min-h-24 w-full relative p-6 shadow-lg backdrop-blur-sm">
          <div className="absolute rounded-2xl inset-0 flex items-center justify-center bg-gray-200 dark:bg-zinc-800 bg-opacity-50 backdrop-blur-sm ">
            <LockIcon className="text-muted-foreground" />
          </div>
          <p className="text-muted-foreground blur-sm">
            This is some private text that is blurred and not seen properly.
          </p>
          <p className="text-muted-foreground blur-sm">
            This is some private text that is blurred and not seen properly.
          </p>
        </div>
      )}
    </>
  );
}
