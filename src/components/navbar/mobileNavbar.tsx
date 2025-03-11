"use client";

import React, { useState } from "react";

import { HomeIcon, LogOutIcon, MenuIcon, UserIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Link from "next/link";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import ModeToggle from "../modeToggle";
import NotificationBell from "../notifications/notificationBell";
import { Button } from "../ui/button";

export default function MobileNavbar() {
  const { user } = useUser();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="flex md:hidden items-center space-x-2 ">
      <ModeToggle />
      <NotificationBell />

      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger asChild>
          <Button
            aria-label="menu Button"
            variant="ghost"
            size="icon"
            className="cursor-pointer"
          >
            <MenuIcon className="h-5 w-5 " />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-[300px] backdrop-blur-sm bg-white dark:bg-black"
        >
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col space-y-4 mt-6">
            <Button
              aria-label="home Button"
              variant="ghost"
              className="flex items-center gap-3 justify-start cursor-pointer"
              asChild
            >
              <Link href="/">
                <HomeIcon className="w-4 h-4" />
                Home
              </Link>
            </Button>

            {user ? (
              <>
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 justify-start cursor-pointer"
                  asChild
                  aria-label="profile Button"
                >
                  <Link
                    href={`/profile/${
                      user?.username ??
                      user?.emailAddresses[0].emailAddress.split("@")[0]
                    }`}
                  >
                    <UserIcon className="w-4 h-4" />
                    Profile
                  </Link>
                </Button>
                <SignOutButton>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-3 justify-start w-full cursor-pointer"
                  >
                    <LogOutIcon className="w-4 h-4" />
                    Logout
                  </Button>
                </SignOutButton>
              </>
            ) : (
              <SignInButton mode="modal">
                <Button variant="default" className="w-full cursor-pointer">
                  Sign In
                </Button>
              </SignInButton>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
