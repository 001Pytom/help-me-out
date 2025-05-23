"use client";

import Logo from "../ui/logo";
import UserAvatar from "../UserAvatar";
import { ChevronDown } from "lucide-react";

interface NavbarProps {
  showUser?: boolean;
  userName?: string;
}

function Navbar({ showUser = false, userName = "" }: NavbarProps) {
  return (
    <nav className="w-full flex  md:items-center justify-between px-4 md:px-26 py-2  bg-white mt-10 ">
      <Logo />

      {showUser && (
        <div className="flex items-center space-x-2">
          {/* <Image src="/profileCircle.png" alt="user" width={40} height={40} /> */}
          <UserAvatar size={40} editable={true} />
          <span className="text-black font-work-sans hidden md:block capitalize">
            {userName}
          </span>{" "}
          {/* <Image src="/arrow-down.png" alt="dropdown" width={20} height={20} /> */}
          <ChevronDown className="w-5 h-5 text-gray font-extralight " />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
