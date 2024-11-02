"use client";
import React, { useState } from "react";
import MeetingModal from "./MeetingModal";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from "react-datepicker";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

const ScheduleInterview = () => {
  const [modalState, setModalState] = useState(false);
  const [applicantEmail, setApplicantEmail] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const { user } = useUser();

  // Function to create a meeting
  const createMeeting = async () => {
    try {

      // Step 1: Fetch Applicant ID based on the email
      console.log("applicantEmail", applicantEmail);
      const applicantResponse = await axios.get(
        `/api/users/applicant/getApplicantByEmailId/${applicantEmail}`
      );
      console.log("applicantResponse", applicantResponse);
      const applicant = applicantResponse.data;
      if (!applicant) {
        console.error("Applicant not found.");
        return;
      }


      // Step 2: Prepare interview data
      const interviewData = {
        applicantClerkId: applicant.applicant.clerkId,
        recruiterClerkId: user.id,
        interviewDate: dateTime,
        interviewTime: dateTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        meetLink: "https://meet.google.com/abc-def-ghi",
      };

      // Step 3: Save the interview data in the Interview collection
      await axios.post("/api/interviews", interviewData);

      console.log("Meeting Created");
      setModalState(false); // Close the modal after creation
    } catch (error) {
      console.error("Error creating meeting:", error);
    }
  };

  return (
    <>
      <button
        className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3"
        onClick={() => setModalState(true)}
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
        {/* Applicant Email Input */}
        <div className="flex flex-col gap-2.5">
          <label className="text-base text-normal leading-[22px] text-sky-300">
            Enter Email Id
          </label>
          <Textarea
            className="border-none bg-red-400 focus-visible:ring-0 focus-visible:ring-offset-0"
            onChange={(e) => setApplicantEmail(e.target.value)}
          />
        </div>

        {/* Date and Time Picker */}
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
