'use client'

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Link from "next/link";
export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
            <div className="mx-auto max-w-[1440px] flex items-center justify-between py-3 px-4 md:px-8">
                <Link href="/home">
                    <Image 
                        src={"/logo.png"}
                        alt="help me out logo"
                        width={137}
                        height={40}
                    />
                </Link>

                <ul className="hidden sm:flex items-center gap-10">
                    <li>
                        <Link href="#features" className="text-[#141414] text-base font-medium hover:text-[#120B48] hover:underline transition-all duration-300 ease-in-out">Features</Link>
                    </li>

                    <li>
                        <Link href="#how-it-works" className="text-[#141414] text-base font-medium hover:text-[#120B48] hover:underline transition-all duration-300 ease-in-out">How It Works</Link>
                    </li>
                </ul>

                <button
                    className="sm:hidden cursor-pointer"
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>

                <Link href="/" className="hidden sm:inline-block text-[#120B48] font-semibold text-lg cursor-pointer">
                    Get Started
                </Link>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div
                    className={`sm:hidden absolute top-full left-0 w-full bg-white transition-all duration-300 ease-in-out z-40 shadow-sm ${
                        isOpen ? "max-h-60 opacity-100" : "max-h-0 overflow-hidden opacity-0"
                    }`}
                >
                    <nav className="flex flex-col items-center gap-6 py-6">
                        <Link 
                            href="#features" 
                            className="text-[#141414] text-base font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            Features
                        </Link>
                        <Link 
                            href="#how-it-works" 
                            className="text-[#141414] text-base font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            How It Works
                        </Link>
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