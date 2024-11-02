import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ProfileComponent = ({
  clerkId,
  name,
  email,
  bio,
  profileImage,
}) => {
  const [uploading, setUploading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handle file selection
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };


  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
      <div className="flex flex-col items-center p-5">
        <img
          className="w-32 h-32 rounded-full border-4 border-gray-200 shadow-lg mb-4"
          src={profileImage}
          alt={`${name}'s Profile`}
        />
        <h2 className="text-3xl font-bold">{name}</h2>
        <p className="text-lg text-gray-600 mt-1">{email}</p>
      </div>

      
      <div className="text-center p-5">
        <h3 className="text-xl font-semibold mb-2">Bio</h3>
        <p className="text-gray-700 leading-relaxed">{bio}</p>
      </div>
    </div>
  );
};

export default ProfileComponent;