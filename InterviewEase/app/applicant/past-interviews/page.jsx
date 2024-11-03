import CallList from "@/components/applicant/CallList";
import React from "react";

const PastInterviews = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <CallList type="ended" />
    </section>
  );
};

export default PastInterviews;
