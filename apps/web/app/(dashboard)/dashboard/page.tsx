"use client";
import Navbar from "@/components/layout/navbar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import VideoCard from "@/components/video-card";
import { videos } from "@/lib/video-data";
import { useUser } from "../../hooks/useUser";

const now = new Date();
const recent = videos.filter(
  (v) =>
    (now.getTime() - new Date(v.date).getTime()) / (1000 * 60 * 60 * 24) <= 7
);
const older = videos.filter(
  (v) =>
    (now.getTime() - new Date(v.date).getTime()) / (1000 * 60 * 60 * 24) > 7
);

export default function Home() {
  const { user, loading } = useUser();

  if (loading) return null;

  const name = user?.user_metadata?.full_name?.split(" ")[0] || "User";

  return (
    <div className="space-y-10">
      <Navbar showUser userName={name} />

      <section className="flex flex-col lg:flex-row justify-between w-full items-center px-4 lg:px-26 pt-4 lg:pt-0 space-y-4">
        <div>
          <h1 className="font-sora font-bold text-3xl text-black">
            Hello, {name}
          </h1>
          <p className="font-sans text-gray-light text-lg">
            Here are your recorded videos
          </p>
        </div>
        <div className="  w-full max-w-sm flex items-center justify-center bg-grayy-input-bg border border-gray-border rounded-xl pr-10 pl-6 lg:py-2">
          <Search className=" text-input-placeholder h-5 w-5" />

          <Input
            placeholder="Search for a particular video"
            type="text"
            className="w-full border-none outline-none bg-transparent shadow-none   mt-0 placeholder:text-input-placeholder placeholder:font- placeholder:text-sm"
          />
        </div>
      </section>

      <hr className="bg-black-light" />

      <section className=" px-4 sm:px-10 lg:px-26 pb-5">
        <h2 className="lg:text-lg font-work-sans font-medium mb-6">
          Recent Videos
        </h2>
        <div className="grid grid-cols-1  md:grid-cols-2 gap-16 ">
          {recent.map((v) => (
            <VideoCard key={v.id} {...v} />
          ))}
        </div>
        <h2 className="lg:text-lg font-work-sans font-medium mt-10 mb-6">
          Files from Last Week
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {older.map((v) => (
            <VideoCard key={v.id} {...v} />
          ))}{" "}
        </div>
        {/* <LogoutButton/> */}
      </section>
    </div>
  );
}
