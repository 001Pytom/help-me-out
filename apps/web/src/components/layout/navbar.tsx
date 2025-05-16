"use client";

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
          <Image src="/profileCircle.png" alt="user" width={40} height={40} />
          <span className="text-black font-work-sans">{userName}</span>{" "}
          <Image src="/arrow-down.png" alt="dropdown" width={20} height={20} />
          {/* <ChevronDown className="w-6 h-6 text-black font-extralight " /> */}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
