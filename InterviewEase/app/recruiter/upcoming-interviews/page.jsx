"use client";
import CallList from "@/components/recruiter/CallList";
import React, { useEffect } from "react";

const UpcomingInterview = () => {
  useEffect(() => {
    localStorage.setItem("isMeetingOwner", true);
    }
    , [])
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <CallList type="upcoming" />
    </section>
  );
};

export default UpcomingInterview;
