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
  linkedinLink,
  githubLink,
  resumeLink, // Initial resume link passed as a prop
}) => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(resumeLink || ""); // Initialize with resumeLink
  const [uploading, setUploading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handle file selection
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle file upload
  const uploadFile = async () => {
    if (!file) {
      alert("No file selected");
      return;
    }
    try {
      setUploading(true);
      const data = new FormData();
      data.append("file", file);
      data.append("clerkId", clerkId); // Use clerkId consistently

      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });

      if (!uploadRequest.ok) {
        throw new Error("Failed to upload file");
      }

      const response = await uploadRequest.json();
      console.log("Uploaded file:", response);
      setUrl(response.resumeLink); // Update with the newly uploaded file's URL
      setFile(null); // Reset the file state to allow new uploads
      setIsDialogOpen(false); // Close the dialog on success
    } catch (e) {
      console.error(e);
      alert("Trouble uploading file");
    } finally {
      setUploading(false);
    }
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

      <div className="flex flex-col items-center mb-4">
        <div className="flex space-x-2 mt-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger className="bg-blue-500 text-white px-4 py-2 rounded-md w-[150px]">
              Update Resume
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Your Resume</DialogTitle>
                <DialogDescription>
                  Select a file to upload your resume.
                </DialogDescription>
              </DialogHeader>
              <input type="file" onChange={handleChange} className="mt-4" />
              <button
                onClick={uploadFile}
                disabled={uploading}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </DialogContent>
          </Dialog>

          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-500 text-white px-4 py-2 rounded-md w-[150px] flex items-center justify-center"
            >
              View Resume
            </a>
          )}
        </div>
      </div>

      <div className="flex justify-center space-x-4 mb-4">
        {linkedinLink && (
          <a
            href={linkedinLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 transition duration-200 text-lg"
          >
            LinkedIn
          </a>
        )}
        {githubLink && (
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-gray-600 transition duration-200 text-lg"
          >
            GitHub
          </a>
        )}
      </div>

      <div className="text-center p-5">
        <h3 className="text-xl font-semibold mb-2">Bio</h3>
        <p className="text-gray-700 leading-relaxed">{bio}</p>
      </div>
    </div>
  );
};

export default ProfileComponent;