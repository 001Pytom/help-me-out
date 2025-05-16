"use client";

import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/format-date";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface VideoCardProps {
  videoUrl: string;
  title: string;
  date: string;
}

export default function VideoCard({ videoUrl, title, date }: VideoCardProps) {
  return (
    <Link href={"/single-video"}  >
      <Card className="w-full md:max-w-[557px] overflow-hidden rounded-xl border border-gray-input  bg-white-card-bg">
        {/* <video src={videoUrl} className="w-full h-48 object-cover" controls /> */}
        {/* use image for now till we get real videos */}
        <Image
          src={videoUrl}
          alt="recording"
          className="w-full h-52 object-cover "
          width={557}
          height={208}
        />
        <CardContent className="flex flex-col gap-2 pb-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm lg:text-xl  font-semibold  text-black line-clamp-2">
              {title}
            </h3>
            <div className="flex items-center space-x-3 lg:space-x-6">
              <div className="w-4 h-4 lg:w-6 lg:h-6 relative">
                <Image
                  src="/link.png"
                  alt="link"
                  fill
                  className="object-contain"
                />
              </div>
              <MoreVertical className="w-4 h-4 lg:w-6 lg:h-6 cursor-pointer" />
            </div>
          </div>
          <span className="text-sm lg:text-base text-gray-input  uppercase ">
            {formatDate(date)}
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
