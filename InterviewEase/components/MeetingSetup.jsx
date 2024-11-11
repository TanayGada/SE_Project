"use client";
import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import "@/app/globals.css";

const MeetingSetup = ({ setIsSetupComplete }) => {
  const [isMicCamToggleOn, setIsMicCamToggleOn] = useState(false);

  const call = useCall();

  if (!call) {
    throw new Error("useCall must be used within StreamCall Component");
  }

  useEffect(() => {
    if (isMicCamToggleOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggleOn, call?.camera, call?.microphone]);

  return (
    <div className="flex h-screen w-full flex-col bg-[#1C1F24] text-gray-200 px-4 sm:px-8 py-6">
      {/* Top Header */}
      <h1 className="text-2xl sm:text-3xl font-semibold text-center  mb-6">
        Meeting Setup
      </h1>

      {/* Main Setup Area */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12 mx-auto w-full max-w-5xl">
        {/* Video Preview Area */}
        <div className="w-full max-w-full sm:max-w-md lg:max-w-2xl bg-[#2A2D32] rounded-lg p-4 str-video__video-preview-responsive shadow-lg">
          <VideoPreview />
        </div>

        {/* Controls Area */}
        <div className="flex flex-col gap-4 p-4 bg-[#2A2D32] rounded-lg w-full max-w-xs shadow-lg text-center lg:text-left">
          <label className="flex items-center justify-center lg:justify-start gap-3 font-medium text-gray-300">
            <input
              type="checkbox"
              checked={isMicCamToggleOn}
              onChange={() => setIsMicCamToggleOn(!isMicCamToggleOn)}
              className="w-4 h-4 text-[#58A6FF] border-gray-400 rounded focus:ring-2 focus:ring-[#58A6FF] focus:ring-opacity-50"
            />
            <span>Join with Mic and Video Off</span>
          </label>

          <DeviceSettings />

          <Button
            className="w-full bg-[#58A6FF] px-5 py-3 mt-4 font-semibold text-white rounded-md transition-transform transform hover:scale-105 hover:bg-[#4690E0] focus:ring-4 focus:ring-[#58A6FF] focus:ring-opacity-50"
            onClick={() => {
              call.join();
              setIsSetupComplete(true);
            }}
          >
            Join Meeting
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MeetingSetup;