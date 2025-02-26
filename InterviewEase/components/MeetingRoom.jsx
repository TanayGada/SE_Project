"use client";

import {
  CallControls,
  CallingState,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList } from "lucide-react";
import EndCallButton from "./EndCallButton";
import Loader from "./Loader";
import "@/app/globals.css";
import MeetSidebar from "./recruiter/MeetSidebar";
import { useRouter } from "next/navigation";

const MeetingRoom = () => {
  const [layout, setLayout] = useState("speaker-left");
  const router = useRouter();
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  const isMeetingOwner = localStorage.getItem("isMeetingOwner");

  if(callingState=="left" && isMeetingOwner=="false"){
    router.push("/applicant/upcoming-interviews");
  }


  if (callingState !== CallingState.JOINED) return <Loader />;


  const CallLayout = () => {
    switch (layout) {
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      case "grid":
        return <PaginatedGridLayout />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative h-screen w-full pt-4 text-white bg-[#202124]">
      <div className="flex h-full">
        {/* Main Call Layout */}
        <div
          className={`flex-grow ml-5 ${
            isMeetingOwner=="false" ? "max-w-[1435px]" : "max-w-[1040px]"
          }`}
        >
          <div className="flex size-full items-center">
            <CallLayout />
          </div>
        </div>

        {/* Conditionally render the Sidebar based on the meeting owner */}
        {isMeetingOwner=="true" && (
          <MeetSidebar/>
        )}
      </div>

      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap bg-[#202124]">
        <CallControls />
        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#3C4043] px-4 py-2 hover:bg-[#4c535b]">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent className="bg-[#3C4043] text-white">
            {["grid", "speaker-right", "speaker-left"].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    setLayout(item.toLocaleLowerCase());
                  }}
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-gray-800" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <EndCallButton />
      </div>
    </section>
  );
};

export default MeetingRoom;