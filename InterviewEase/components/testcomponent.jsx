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


const MeetingRoom = () => {
  const [layout, setLayout] = useState("speaker-left");
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const call = useCall();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();
  const [isMeetingOwner, setIsMeetingOwner] = useState(false);

  useEffect(() => {
    if (
      localParticipant &&
      call?.state.createdBy &&
      localParticipant.userId === call.state.createdBy.id
    ) {
      setIsMeetingOwner(true);
    } else {
      setIsMeetingOwner(false);
    }
  }, [localParticipant, call?.state.createdBy]); // Dependency array ensures this runs only when these values change

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
            !isMeetingOwner ? "max-w-[1435px]" : ""
          }`} // Conditionally apply max-width if not meeting owner
        >
          <div className="flex size-full items-center">
            <CallLayout />
          </div>
        </div>

        {/* Conditionally render the Sidebar based on the meeting owner */}
        {/* {isMeetingOwner && (
          <MeetSidebar/>
        )} */}
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