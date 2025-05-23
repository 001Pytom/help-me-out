'use client'

import Image from "next/image";
import Link from "next/link";
import { Copy, Facebook, SquarePen} from "lucide-react";
import DropDown from "@/components/ui/dropdown";
// import { Button } from "@/components/ui/button";

export default function SingleVideo() {
    const steps = [
        { time: "0:01", text: "First step. Open Facebook on your desktop or mobile device and locate \"Marketplace\" in the left-hand menu or at the top of the First step. Open Facebook on your desktop or mobile device and locate \"Marketplace\" in the left-hand menu or at the top of the" },
        { time: "0:15", text: "First step. Open Facebook on your desktop or mobile device and locate \"Marketplace\" in the left-hand menu or at the top of the . Open Facebook on your desktop or mobile device and locate \"Marketplace\" in the left-ha" },
        { time: "0:30", text: "First step. Open Facebook on your desktop or mobile device and locate \"Marketplace\" in the left-hand menu or at the top of the" },
        { time: "0:45", text: "First step. Open Facebook on your desktop or mobile device and locate \"Marketplace\" in the left-hand menu or at the top of the" },
        { time: "0:59", text: "First step. Open Facebook on your desktop or mobile device and locate \"Marketplace\" in the left-hand menu or at the top of the" },
        { time: "1:15", text: "First step. Open Facebook on your desktop or mobile device and locate \"Marketplace\" in the left-hand menu or at the top of the" },
    ]

    const options = ["English", "French", "German", "Turkish"]
      
    return (
        <main className="mx-auto max-w-[1440px] md:px-8 px-4">
            <nav className="sm:text-sm text-xs text-[#141414] text-opacity-70 mt-4">
                <ol className="flex sm:space-x-2 space-x-1">
                    <li>
                        <Link href="/dashboard" className="hover:underline font-normal text-[#141414] text-opacity-70">Home</Link>
                        <span className="sm:mx-1 mx-0.5">/</span>
                    </li>
                    {/* <li>
                        <Link href="/dashboard" className="hover:underline font-normal text-[#141414] text-opacity-70">Recent Videos</Link>
                        <span className="sm:mx-1 mx-0.5">/</span>
                    </li> */}
                    <li className="text-[#413C6D] w-[400px] truncate font-medium leading-normal">How To Create A Facebook Ad Listing</li>
                </ol>
            </nav>

            <div className="flex items-center sm:gap-4 gap-2 sm:my-6 my-2 flex-wrap">
                <h3 className="text-[#141414] font-semibold sm:text-xl text-lg">How To Create A Facebook Ad Listing </h3>
                <SquarePen className="w-5 h-5"/>
            </div>   

            <div className="w-full sm:mb-10 mb-4">
                <Image 
                    src={"/single-vid-card.png"}
                    alt="sample video card"
                    width={1208}
                    height={458}
                    className="w-full h-auto object-fit"
                />
            </div>

            <div className="mb-6">
                <h4 className="sm:text-lg text-base font-medium leading-normal text-black mb-3">Transcript</h4>

                <div className="py-3">
                    <DropDown
                        options={options}
                        placeholder="Select Language"
                        onSelectionChange={(val) => console.log("You selected:", val)}
                    />
                </div>

                <div className="h-72 overflow-y-scroll md:pr-6 pr-2">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            data-index={index}
                            className="flex items-start gap-4 sm:mb-10 mb-6"
                        >
                            <p className="text-[#141414] md:text-lg text-base font-medium leading-normal">
                                {step.time}
                            </p>
                            <p className="text-black md:text-lg text-base font-normal leading-6">
                                {step.text}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="sm:my-10 my-6 flex items-center justify-between flex-wrap lg:gap-1 gap-4">
                    <div className="border border-[#E7E7ED] rounded-[12px] sm:min-w-[450px] min-w-full py-2.5 sm:px-5 px-2 flex items-center justify-between gap-1 focus-within:border-[#120B48]">
                        <input 
                            type="email" 
                            placeholder="Enter email of receiver" 
                            className=" border-0 w-[85%] py-2 outline-none"
                        />
                        <button className="py-2 px-4 rounded-[8px] border cursor-pointer">Send</button>
                    </div>

                    <div className="flex items-center justify-between bg-[#FAFAFA] border border-[#929292] sm:p-3 p-2 rounded-[12px] sm:min-w-[540px] min-w-full">
                        <p className="text-[#4B4B4B] text-base max-[440px]:text-sm max-[390px]:text-xs font-normal leading-5">https://www.helpmeout/Untitled_Video_20232509</p>
                        <button className="rounded-[8px] sm:border border-0 border-[#120B48] flex items-center sm:gap-2 gap-0 py-1.5 px-4 cursor-pointer hover:bg-white ease-in-out duration-300 transition">
                            <Copy className="w-4 h-4 max-[390px]:w-3"/>
                            <span className="hidden sm:inline">Copy URL</span>
                        </button>
                    </div>
                </div>

                <div>
                    <h4 className="sm:text-lg text-base font-medium leading-normal text-black mb-3">Share your video</h4>

                    <div className="flex items-center gap-3 flex-wrap">
                        <button className="flex items-center gap-2 border rounded-[6px] border-[#0A0628] px-4 py-2">
                            <Image
                                src={"/facebook.svg"}
                                alt="facebook logo"
                                width={24}
                                height={24}
                                className="w-4 h-4"
                            />
                            <span className="text-[#08051E] sm:text-base text-sm font-medium leading-6">Facebook</span>
                        </button>

                        <button className="flex items-center gap-2 border rounded-[6px] border-[#0A0628] px-4 py-2">
                            <Image
                                src={"/whatsapp.svg"}
                                alt="whatsapp logo"
                                width={24}
                                height={24}
                                className="w-4 h-4"
                            />
                            <span className="text-[#08051E] sm:text-base text-sm font-medium leading-6">Whatsapp</span>
                        </button>

                        <button className="flex items-center gap-2 border rounded-[6px] border-[#0A0628] px-4 py-2">
                            <Image
                                src={"/telegram.svg"}
                                alt="telegram logo"
                                width={24}
                                height={24}
                                className="w-4 h-4"
                            />
                            <span className="text-[#08051E] sm:text-base text-sm font-medium leading-6">Telegram</span>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
