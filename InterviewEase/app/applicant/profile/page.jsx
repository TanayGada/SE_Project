"use client";
import ProfileCard from '@/components/applicant/applicant-profile-card';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';

const Profile = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [applicantData, setApplicantData] = useState(null);
  const [loading, setLoading] = useState(true);
  const clerkId = user?.id; // clerkId may be undefined initially

  useEffect(() => {
    // Fetch applicant data only if the user is signed in and loaded
    if (isLoaded && isSignedIn && clerkId) {
      const fetchApplicant = async () => {
        setLoading(true); // Set loading to true before fetching
        try {
          const response = await fetch(`/api/users/applicant/${clerkId}`);
          if (response.ok) {
            const data = await response.json();
            setApplicantData(data);
          } else {
            console.error("Error fetching applicant data");
          }
        } catch (error) {
          console.error("Failed to fetch applicant data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchApplicant();
    } else {
      setLoading(false); // If user is not signed in, stop loading
    }
  }, [isLoaded, isSignedIn, clerkId]); // Include all dependencies

  // Show a loading state while Clerk is fetching user data
  if (!isLoaded || loading) {
    return <div>Loading...</div>;
  }

  // If the user is not signed in, prompt them to sign in
  if (!isSignedIn) {
    return <div>Please sign in to view your profile.</div>;
  }

  // Extract user details, with fallbacks for missing data
  const userDetails = {
    name: user?.fullName || "John Doe",
    email: user?.emailAddresses[0]?.emailAddress || "john.doe@example.com",
    bio: user?.publicMetadata?.bio || `${user?.firstName} is a software engineer with over 5 years of experience in building web applications using React and Node.js.`,
    profileImage: user?.imageUrl || "https://picsum.photos/200",
    linkedinLink: user?.publicMetadata?.linkedin || "https://linkedin.com/in/johndoe",
    githubLink: user?.publicMetadata?.github || "https://github.com/johndoe",
  };

  return (
    <div className="flex min-h-screen items-start justify-center">
      <ProfileCard 
        clerkId={clerkId}
        name={userDetails.name}
        email={userDetails.email}
        bio={userDetails.bio}
        profileImage={userDetails.profileImage}
        linkedinLink={userDetails.linkedinLink}
        githubLink={userDetails.githubLink}
        resumeLink={applicantData?.resumeLink} // Pass the fetched resume link
      />
    </div>
  );
};

export default Profile;