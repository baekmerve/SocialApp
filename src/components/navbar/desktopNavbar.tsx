import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import ModeToggle from "../modeToggle";
import Link from "next/link";
import { Button } from "../ui/button";
import { HomeIcon, UserIcon } from "lucide-react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import NotificationBell from "../notifications/notificationBell";


export default async function DesktopNavbar() {
  const user = await currentUser();

  return (
    <div className="hidden md:flex items-center space-x-4">
      <ModeToggle />

      <Button
        variant="ghost"
        aria-label="Home Button"
        className="flex items-center gap-2 cursor-pointer"
        asChild
      >
        <Link href="/">
          <HomeIcon className="w-4 h-4" />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>

      {user ? (
        <>
          <NotificationBell />
          <Button
            variant="ghost"
            className="flex items-center gap-2 cursor-pointer hover:bg-transparent"
            asChild
            aria-label="profile Button"
          >
            <Link
              href={`/profile/${
                user.username ??
                user.emailAddresses[0].emailAddress.split("@")[0]
              }`}
            >
              <UserIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Profile</span>
            </Link>
          </Button>
          <UserButton />
        </>
      ) : (
        <SignInButton mode="modal">
          <Button variant="default" className="cursor-pointer">
            Sign In
          </Button>
        </SignInButton>
      )}
    </div>
  );
}
