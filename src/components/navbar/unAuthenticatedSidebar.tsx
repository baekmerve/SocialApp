import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "../ui/button";

export default function UnAuthenticatedSidebar() {
  return (
    <div className="sticky top-24">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Welcome to SocialApp!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground mb-4">
            Login to access your profile and connect with others.
          </p>
          <SignInButton mode="modal">
            <Button
              className="w-full cursor-pointer hover:bg-white hover:text-primary"
              variant="outline"
            >
              Login
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button className="w-full mt-2 cursor-pointer" variant="default">
              Sign Up
            </Button>
          </SignUpButton>
        </CardContent>
      </Card>
    </div>
  );
}
