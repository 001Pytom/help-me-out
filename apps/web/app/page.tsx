import Footer from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const features = [
    {
      icon: "/record.svg",
      alt: "recording icon",
      title: "Simple Screen Recording",
      description:
        "Effortless screen recording for everyone. Record with ease, no tech expertise required.",
    },
    {
      icon: "/share.svg",
      alt: "share icon",
      title: "Easy-to-Share URL",
      description:
        "Share your recordings instantly with a single link. No attachments, no downloads.",
    },
    {
      icon: "/revisit.svg",
      alt: "reload icon",
      title: "Revisit Recordings",
      description:
        "Access and review your past content effortlessly. Your recordings, always at your fingertips.",
    },
  ];

  const steps = [
    {
      number: 1,
      title: "Record Screen",
      description:
        'Click the "Start Recording" button in our extension. Choose which part of your screen to capture and who you want to send it to.',
      image: "/worksImg.png",
    },
    {
      number: 2,
      title: "Share Your Recording",
      description:
        "We generate a shareable link for your video. Simply send it to your audience via email or copy the link to send via any platform.",
      image: "/worksImg.png",
    },
    {
      number: 3,
      title: "Learn Effortlessly",
      description:
        "Recipients can access your video effortlessly through the provided link, with our user-friendly interface suitable for everyone.",
      image: "/worksImg.png",
    },
  ];

  return (
    <>
      <Header />
      <div className="mx-auto max-w-[1440px] md:px-8 px-4">
        <section className="w-full flex sm:flex-row flex-col items-center justify-between md:pt-36 pt-12 md:pb-28 pb-12 gap-12">
          <div className="max-w-lg w-full sm:w-1/2">
            <h1 className="text-[#141414] font-bold sm:text-5xl text-4xl mb-5 sm:leading-12 leading-10">Show Them <br /> Don&apos;t Just Tell</h1>
            <p className="mb-12 text-base font-normal text-[rgba(0, 0, 0, 0.75)]">Help your friends and loved ones by creating and sending videos on how to get things done on a website.</p>
            <Button variant="default" className="cursor-pointer bg-[#120B48] text-white p-6 font-medium hover:bg-transparent hover:text-[#120848] border border-[#120848] transition-all duration-500 ease-in-out">
              Install HelpMeOut
              <ArrowRight />
            </Button>
          </div>

          <div className="relative w-full sm:w-1/2">
            <Image 
              src={"/heroImg.png"}
              alt="hero image"
              width={680}
              height={450}
              className="relative z-10"
            />

            <Image 
              src={"/hero-decor.svg"}
              alt="hero image"
              width={800}
              height={450}
              className="absolute -top-10 left-0 z-0 sm:scale-110"
            />
          </div>
        </section>

        <section id="features" className="md:py-20 py-12">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-[#141414] font-bold md:text-3xl text-2xl mb-2">Features</h2>
            <p className="text-[#616163] sm:text-base text-sm font-normal leading-5">Key Highlights Of Our Extension</p>
          </div>

          <div className="w-full flex md:flex-row flex-col items-center justify-between mt-12 gap-10">
            <div className="space-y-12 md:w-1/2 w-full">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-10 h-10 p-2 rounded-full bg-[#413C6D]">
                    <Image
                      src={feature.icon}
                      alt={feature.alt}
                      width={32}
                      height={32}
                    />
                  </div>
                  <div>
                    <h3 className="text-[#1B233D] font-semibold text-xl">{feature.title}</h3>
                    <p className="text-[#616163] sm:text-base text-sm leading-5 mt-2">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="md:w-1/2 w-full">
              <Image 
                src={"/featureImg.png"}
                alt="feature image"
                width={630}
                height={450}
                className="w-full object-fit mx-auto"
              />
            </div>
          </div>
        </section>

        <section id="how-it-works" className="md:py-20 py-12">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-[#141414] font-bold md:text-3xl text-2xl mb-2">How It Works</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-16 gap-4 mt-12">
            {steps.map((step) => (
              <div className="text-center" key={step.number}>
                <div className="w-12 h-12 rounded-full bg-[#120B48] text-white font-bold text-xl flex items-center justify-center mx-auto">
                  {step.number}
                </div>
                <h3 className="text-[#1B233D] font-semibold text-xl mt-6">{step.title}</h3>
                <p className="text-[#616163] sm:text-base text-sm leading-6 mt-3">
                  {step.description}
                </p>
                <Image
                  src={step.image}
                  alt={`step-${step.number}`}
                  width={327}
                  height={250}
                  className="w-full mt-1"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
