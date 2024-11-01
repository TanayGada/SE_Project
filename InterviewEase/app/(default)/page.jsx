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
import Header from "@/components/ui/header";

export default function Home() {
  const { user, isSignedIn } = useUser();
  const router = useRouter(); // Initialize the router
  const publicMetaData = user?.publicMetadata;
  console.log("publicMetaData",publicMetaData)

  const createApplicant = async (applicantData) => {
    try {
      console.log("step1 from createApplicant");
      const response = await fetch("/api/users/applicant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicantData),
      });
      const data = await response.json();
      console.log("Applicant data:", data);
      return data;
    } catch (error) {
      console.error("Error creating applicant:", error);
    }
  };

  const createRecruiter = async (recruiterData) => {
    try {
      const response = await fetch("/api/users/recruiter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recruiterData),
      });
      const data = await response.json();
      console.log("Recruiter data:", data);
      return data;
    } catch (error) {
      console.error("Error creating recruiter:", error);
    }
  };

  const assignUserRole = async (user_Id, role) => {
      const response = await setUserRole({ userId: user_Id, role: role });
      console.log("Response from setUserRole:", response);
    }
  


  useEffect(() => {

    if (isSignedIn && !publicMetaData.role) {
      const role = localStorage.getItem("userRole"); // Retrieve role from localStorage
      console.log("Role:", role);
      console.log("User ID:", user?.id);
      console.log("Public Metadata:", publicMetaData);
      console.log("User Details:", {
        userId: user.id,
        name: user.fullName,
        email: user.emailAddresses[0].emailAddress,
      });

      if (role && user?.id) {
        if(role === "applicant"){
          console.log("Creating applicant...");
        createApplicant({ clerkId: user.id , name: user.fullName, email: user.emailAddresses[0].emailAddress}); // Call the async function to create applicant
        }
        else{
          console.log("Creating recruiter...");
        createRecruiter({ clerkId: user.id , name: user.fullName, email: user.emailAddresses[0].emailAddress}); // Call the async function to create recruiter
        }
        console.log("Assigning user role...");
        assignUserRole(user.id, role); // Call the async function to assign role
        console.log("User role assigned successfully.");
        console.log(user?.publicMetadata);

        // Redirect user based on their role
        if (role === "applicant") {
          router.push("/applicant/upcoming-interviews");
        } else if (role === "recruiter") {
          router.push("/recruiter/upcoming-interviews");
        }
      } else {
        console.log("No role found or user ID is undefined.");
      }
    }
  }, [isSignedIn, user?.id, router]); // Add router to the dependency array

  return (
    <>
    <Header/>
      <Hero />
      <Features />
      <FeaturesBlocks />
      <Testimonials />
      <Newsletter />
    </>
  );
}