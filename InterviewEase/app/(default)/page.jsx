"use client";
import Hero from "@/components/hero";
import Features from "@/components/features";
import FeaturesBlocks from "@/components/features-blocks";
import Testimonials from "@/components/testimonials";
import Newsletter from "@/components/newsletter";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { setUserRole } from "./_actions"; // Ensure this is the correct path

export default function Home() {
  const { user, isSignedIn } = useUser();
  const router = useRouter(); // Initialize the router

  const assignUserRole = async (user_Id, role) => {
    if (user_Id && role) {
      const response = await setUserRole({ userId: user_Id, role: role });
      // Check response here if needed
      console.log("Response from setUserRole:", response);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      const role = localStorage.getItem("userRole"); // Retrieve role from localStorage

      if (role && user?.id) {
        assignUserRole(user.id, role); // Call the async function to assign role
        
        // Redirect user based on their role
        if (role === "applicant") {
          router.push("/applicant/dashboard");
        } else if (role === "recruiter") {
          router.push("/recruiter/dashboard");
        }
      } else {
        console.log("No role found or user ID is undefined.");
      }
    }
  }, [isSignedIn, user?.id, router]); // Add router to the dependency array

  return (
    <>
      <Hero />
      <Features />
      <FeaturesBlocks />
      <Testimonials />
      <Newsletter />
    </>
  );
}