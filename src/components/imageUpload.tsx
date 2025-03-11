"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";

interface Props {
  onChange: (url: string) => void;
  value: string;
  endpoint: "postImage";
}

export default function ImageUpload({ onChange, value, endpoint }: Props) {
  if (value) {
    return (
      <div className="relative size-40">
        <Image
          src={value}
          alt="Upload"
          height={200}
          width={200}
          className="rounded-md size-40 object-cover"
        />
        <Button
          onClick={() => onChange("")}
          aria-label="image upload Button"
          className="absolute top-0 right-0  bg-red-700 rounded-full shadow-sm cursor-pointer"
          type="button"
        >
          <XIcon className="h-5 w-5 text-white" />
        </Button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log("onUploadError", error);
      }}
    />
  );
}
