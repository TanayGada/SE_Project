"use client";
import React, { useState } from "react";
import MeetingModal from "./MeetingModal";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from "react-datepicker";

const ScheduleInterview = () => {
  const [modalState, setModalState] = useState(false);
  const [applicantEmail, setApplicantEmail] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const createMeeting = () => {
    console.log(applicantEmail);
    console.log(dateTime);
    console.log("Meeting Created");
  };

  return (
    <>
      <button
        className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3"
        onClick={() => setModalState(true)} // Wrap in a function to delay execution
      >
        Schedule Interview
      </button>
      <MeetingModal
        isOpen={modalState}
        onClose={() => setModalState(false)}
        title="Schedule an Interview"
        className="text-center"
        buttonText="Schedule Interview"
        handleClick={createMeeting}
      >
        <div className="flex flex-col gap-2.5">
          <label className="text-base text-normal leading-[22px] text-sky-300">
            Enter Email Id
          </label>
          <Textarea
            className="border-none bg-red-400 focus-visible:ring-0 focus-visible:ring-offset-0"
            onChange={(e) => {
              setApplicantEmail(e.target.value);
            }}
          />
        </div>
        <div className="flex w-full flex-col gap-2.5">
          <label className="text-base text-normal leading-[22px] text-sky-300">
            Select Date and Time
          </label>
          <ReactDatePicker
          selected={dateTime}
          onChange={(date) => setDateTime(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
          className="w-full rounded bg-black p-2 focus:outline-none"
          />
        </div>
      </MeetingModal>
    </>
  );
};

export default ScheduleInterview;
