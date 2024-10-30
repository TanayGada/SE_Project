"use client";
import VideoThumb from "@/public/images/hero-image.png";
import ModalVideo from "@/components/modal-video";
import { useEffect, useState } from "react";
import { SignedOut, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Hero() {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const role = user.publicMetadata?.UserRole;
      if (role === "applicant") {
        router.push("/applicant/dashboard");
      } else if (role === "recruiter") {
        router.push("/recruiter/dashboard");
      }
    }
  }, [user]);

  const handleSignUpClick = (role) => {
    localStorage.setItem("userRole", role);
    router.push("/sign-up");
  };

  return (
    <section className="relative">
      {/* SVG and UI elements here */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="text-center pb-12 md:pb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4">
              Streamline Your{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                Interview Process
              </span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-600 mb-8">
                Experience a new way of interviewing with real-time feedback,
                structured evaluation metrics, and more!
              </p>
              <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
                <SignedOut>
                  <button
                    className="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0"
                    onClick={() => handleSignUpClick("applicant")}
                  >
                    Signup as Applicant
                  </button>
                  <button
                    className="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0"
                    onClick={() => handleSignUpClick("recruiter")}
                  >
                    Signup as Recruiter
                  </button>
                </SignedOut>
              </div>
            </div>
          </div>
          <ModalVideo
            thumb={VideoThumb}
            thumbWidth={768}
            thumbHeight={432}
            thumbAlt="Modal video thumbnail"
            video="/videos/video.mp4"
            videoWidth={1920}
            videoHeight={1080}
          />
        </div>
      </div>
    </section>
  );
}
