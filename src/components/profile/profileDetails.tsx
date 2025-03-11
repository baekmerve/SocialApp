import { UserProfileDetails } from "@/types/type";
import { format } from "date-fns";
import {
  CalendarIcon,
  LinkIcon,
  MapPinIcon,
  MessageSquareText,
} from "lucide-react";

export default function ProfileDetails({
  stats,
}: {
  stats: UserProfileDetails;
}) {
  const formattedDate = format(new Date(stats.createdAt), "MMMM yyyy");
  return (
    <div className="w-full space-y-2 text-sm text-muted-foreground">
      <div className="flex gap-2 text-left">
        <MessageSquareText className="size-5 " />
        {stats.bio || "No bio info"}
      </div>

      <div className="flex gap-2 ">
        <MapPinIcon className="size-5" />
        {stats.location || "No location info "}
      </div>

      <div className="flex gap-2">
        <LinkIcon className="size-5 " />
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
  );
}
