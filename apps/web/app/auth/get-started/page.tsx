"use client";

import AuthForm from "@/components/AuthForm";
import Navbar from "@/components/layout/navbar";
import SocialButton from "@/components/social-button";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import toast from "react-hot-toast";

const GetStartedPage = () => {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const handleSocialLogin = async (provider: "google" | "facebook") => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        toast.error(`${provider} login failed: ${error.message}`);
        console.error(`${provider} login error:`, error.message);
      } else {
        toast.success(`Redirecting to ${provider}...`);
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="pt-10 px-6 w-full mb-9 flex flex-col gap-9 items-center">
      <Navbar />

      <main className="w-full max-w-[475px] space-y-8  ">
        <div className=" text-center space-y-2 ">
          <h3 className="font-bold text-3xl font-inter text-black">
            Log in or Sign up
          </h3>
          <p className="font-light text-sm  font-inter">
            Join millions of others in sharing successful <br /> moves on{" "}
            <span className="font-sen text-gray-light ">HelpMeOut</span>.
          </p>
        </div>

        <div className="space-y-6">
          <SocialButton
            label={loading ? "Loading..." : "Continue with Google"}
            icon={
              <Image src="/google.png" alt="google" width={24} height={24} />
            }
            onClick={() => handleSocialLogin("google")}
            disabled={loading}
          />
          {/* <SocialButton
            label="Continue with Facebook"
            icon={
              <Image
                src="/facebook.png"
                alt="facebook"
                width={24}
                height={24}
              />
            }
            onClick={() => handleSocialLogin("facebook")}
          /> */}
        </div>

        <div className="flex items-center justify-center ">
          <hr className="w-1/2 self-center bg-gray-line" />
          <p className="py-0.5 px-2.5 font-inter font-medium text-gray-line">
            or
          </p>{" "}
          <hr className="w-1/2 self-center" />
        </div>

        <AuthForm />

      </main>
      
    </div>
  );
};

export default GetStartedPage;
