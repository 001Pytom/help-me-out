"use client";

import { ChevronDown } from "lucide-react";
import Logo from "../ui/logo";
import Image from "next/image";

interface NavbarProps {
  showUser?: boolean;
  userName?: string;
}

function Navbar({ showUser = false, userName = "" }: NavbarProps) {
  return (
    <nav className="w-full hidden md:flex items-center justify-between px-26 py-2  bg-white mt-10 ">
      <Logo />

      {showUser && (
        <div className="flex items-center space-x-2">
          <Image src="/profile-circle.png" alt="user" width={40} height={40} />
          <span className="text-black font-work-sans">{userName}</span>{" "}
          <ChevronDown className="w-6 h-6 text-black " />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
