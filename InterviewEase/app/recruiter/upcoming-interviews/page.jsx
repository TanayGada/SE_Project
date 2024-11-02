import CallList from "@/components/CallList";
import React from "react";

const UpcomingInterview = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <CallList type="upcoming" />
    </section>
  );
};

export default UpcomingInterview;
