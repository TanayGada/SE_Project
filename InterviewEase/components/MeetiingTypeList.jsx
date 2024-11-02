"use client";

import Image from "next/image";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";

const MeetiingTypeList = () => {
  const [meetigState, setMeetingState] = useState("undefined");
  const router = useRouter();   
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      <HomeCard
        title="New Meeting"
        description="Start an Instant Meeting"
        handleClick={() => setMeetingState("isJoiningMeeting")}
        className="bg-orange-400"
      />
      <HomeCard
        title="Schedule Meeting"
        description="Plan Your Meeting"
        handleClick={() => setMeetingState("isSchedulingMeeting")}
        className="bg-blue-400"
      />
      <HomeCard
        title="View Recordings"
        description="Check Out your Recordings"
        handleClick={() => router.push("/recordings")}
        className="bg-green-400"
      />
      <HomeCard
        title="New Meeting"
        description="Start an Instant Meeting"
        handleClick={() => setMeetingState("isJoining")}
        className="bg-purple-400"
      />
      
    </section>
  );
};

export default MeetiingTypeList;
