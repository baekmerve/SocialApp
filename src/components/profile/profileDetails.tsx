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
      <div className="w-full p-2 space-y-2 text-sm text-muted-foreground relative ">
        {!currentUserId && (
          <div className="absolute rounded-2xl h-full inset-0 flex flex-col gap-2 items-center justify-center bg-black/40  bg-bg/50 backdrop-blur-sm z-10">
            <LockIcon className="text-white size-7 mb-2" />
            <p className=" text-white mt-2 font-semibold text-md">
              로그인 후 전체 내용을 확인하세요
            </p>
          </div>
        )}
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
    </>
  );
}
