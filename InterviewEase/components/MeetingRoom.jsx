"use client";

import { cn } from "@/lib/utils";
import {
  CallControls,
  CallingState,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList } from "lucide-react";
import EndCallButton from "./EndCallButton";
import Loader from "./Loader";

const MeetingRoom = () => {
  const [layout, setLayout] = useState("speaker-left");
  const {useCallCallingState} = useCallCallingState();
  const callingState = useCallCallingState();

  if(callingState !== CallingState.JOINED)  return <Loader/>;
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
    <section className="relative h-screen w-full overflow-hidden pt-4 text-black">
      <div className="relative fle size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center ">
          <CallLayout />
        </div>
        <div className="h-[calc(100vh-86px)] ml-2">Questions and Chat</div>
      </div>
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">
        <CallControls />
        <DropdownMenu>
            <div className="flex items-center">
                <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
                    <LayoutList size={20}
                    className="text-black"/>
                </DropdownMenuTrigger>
            </div>
          
          <DropdownMenuContent className="border-gray-800 bg-gray-400 text-white">
            {["grid", "speaker-right", "speaker-left"].map((item, index) =>(
                <div key={index}>
                    <DropdownMenuItem className="cursor-pointer" onClick={()=>{
                        setLayout(item.toLocaleLowerCase());
                    }}>
                        {item}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="border-gray-800"/>
                </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton/>
        <EndCallButton/>
      </div>
    </section>
  );
};

export default MeetingRoom;
