"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Logo from "../ui/logo";

type HeaderProps = {
  onFeaturesClick: () => void
  onHowItWorksClick: () => void
}

export function Header({ onFeaturesClick, onHowItWorksClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="mx-auto max-w-[1440px] flex items-center justify-between py-3 px-4 md:px-8">
        <Logo />

        <ul className="hidden sm:flex items-center gap-10">
          <li>
            <button
              onClick={onFeaturesClick}
              className="text-[#141414] border-none text-base font-medium hover:text-[#120B48] hover:underline cursor-pointer transition-all duration-300 ease-in-out"
            >
              Features
            </button>
          </li>

          <li>
            <button
              onClick={onHowItWorksClick}
              className="text-[#141414] border-none text-base font-medium hover:text-[#120B48] hover:underline cursor-pointer transition-all duration-300 ease-in-out"
            >
              How It Works
            </button>
          </li>
        </ul>

        <button
          className="sm:hidden cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <Link
          href="/auth/get-started"
          className="hidden sm:inline-block text-[#120B48] font-semibold text-lg cursor-pointer"
        >
          Get Started
        </Link>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className={`sm:hidden absolute top-full left-0 w-full bg-white transition-all duration-300 ease-in-out z-40 shadow-sm ${
            isOpen
              ? "max-h-60 opacity-100"
              : "max-h-0 overflow-hidden opacity-0"
          }`}
        >
          <nav className="flex flex-col items-center gap-6 py-6">
            <button
              className="text-[#141414] text-base font-medium border-none cursor-pointer"
              onClick={() => {
                onFeaturesClick();
                setIsOpen(false);
              }}
            >
              Features
            </button>
            <button
              className="text-[#141414] text-base font-medium border-none cursor-pointer"
              onClick={() => {
                onHowItWorksClick();
                setIsOpen(false);
              }}
            >
              How It Works
            </button>
            <Link
              href="/"
              className="text-[#120B48] font-semibold text-lg cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
