import Link from "next/link";
import React from "react";
import DesktopNavbar from "./desktopNavbar";
import MobileNavbar from "./mobileNavbar";
import { syncUser } from "@/actions/userActions";
import { auth } from "@clerk/nextjs/server";

export default async function Navbar() {
  const { userId } = await auth();

  if (userId) await syncUser();

  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="w-[90%] mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-primary font-mono tracking-wider"
            >
              SocialApp
            </Link>
          </div>
          <DesktopNavbar />
          <MobileNavbar />
        </div>
      </div>
    </nav>
  );
}
