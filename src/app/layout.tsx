import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar/navbar";
import { Toaster } from "react-hot-toast";
import SideProfile from "@/components/profile/sideProfile";

import SuggestedPosts from "@/components/post/suggestedPosts";
import SuggestedUsers from "@/components/suggestedUsers";
import { currentUser } from "@clerk/nextjs/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sociall App",
  description: "A modern social media application powered by Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authUser = await currentUser();

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen">
              <Navbar />
              <main className="py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 max-w-[95%] mx-auto px-4 relative min-h-screen">
                  {/* Left Sidebar */}
                  <div className="hidden lg:block lg:col-span-3 self-start sticky top-24 space-y-10">
                    <SideProfile />
                    <SuggestedUsers />
                  </div>

                  {/* Main Content */}
                  <div className="lg:col-span-6">{children}</div>

                  {/* Right Sidebar */}
                  <div className="hidden lg:block lg:col-span-3 self-start sticky top-24 ">
                    <SuggestedPosts />
                  </div>
                </div>
              </main>
            </div>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
