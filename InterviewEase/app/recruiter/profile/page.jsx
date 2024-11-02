"use client";
import ProfileCard from '@/components/recruiter-profile-card';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';

const Profile = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const clerkId = user?.id; // clerkId may be undefined initially
    console.log("user", user?.id)
    console.log("isLoaded", isLoaded)
    console.log("isSignedIn", isSignedIn)

  // Show a loading state while Clerk is fetching user data
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

    console.log("step1")

  // If the user is not signed in, prompt them to sign in
  if (!isSignedIn) {
    return <div>Please sign in to view your profile.</div>;
  }

    console.log("step2")
  // Extract user details, with fallbacks for missing data
  const userDetails = {
    name: user?.fullName || "John Doe",
    email: user?.emailAddresses[0]?.emailAddress || "john.doe@example.com",
    bio: `${user?.firstName} is a software engineer with over 5 years of experience in building web applications using React and Node.js.`,
    profileImage: user?.imageUrl || "https://picsum.photos/200",
  };

  console.log("userDetails", userDetails) 

  return (
    <div className="flex min-h-screen items-start justify-center">
      <ProfileCard 
        clerkId={clerkId}
        name={userDetails.name}
        email={userDetails.email}
        bio={userDetails.bio}
        profileImage={userDetails.profileImage}
      />
    </div>
  );
};


export default Profile;