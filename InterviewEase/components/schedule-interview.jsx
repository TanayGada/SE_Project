import React, { useState } from "react";
import MeetingModal from "./MeetingModal";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from "react-datepicker";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const ScheduleInterview = () => {
  const [modalState, setModalState] = useState(false);
  const [applicantEmail, setApplicantEmail] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const { user } = useUser();
  const router = useRouter();
  const client = useStreamVideoClient();
  const { toast } = useToast();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState();

  const createMeeting = async () => {
    try {
        // Check if client and user exist
        if (!client || !user) return;
        if (!values.dateTime) {
            toast({ title: "Please Select a Date and Time" });
            return;
        }

        // Step 1: Generate Meet Link
        const id = crypto.randomUUID();
        const call = client.call("default", id);
        if (!call) throw new Error("Failed to create call");

        const startsAt = values.dateTime.toISOString();
        const description = values.description || "Instant Interview";

        await call.getOrCreate({
            data: { starts_at: startsAt, custom: { description } },
        });

        // Construct meet link
        const meetLink = `/meeting/${call.id}`;

        setCallDetails(call);
        setModalState(false);
        toast({ title: "Meeting Created" });

        // Step 2: Fetch Applicant ID based on the email
        const applicantResponse = await axios.get(
            `/api/users/applicant/getApplicantByEmailId/${applicantEmail}`
        );
        const applicant = applicantResponse.data;
        if (!applicant) {
            console.error("Applicant not found.");
            return;
        }

        // Step 3: Prepare interview data with combined dateTime and meetLink
        const interviewData = {
            applicantClerkId: applicant.applicant.clerkId,
            recruiterClerkId: user.id,
            interviewDateTime: dateTime.toISOString(), // Store as ISO string
            meetLink: meetLink, // Store the generated meet link
        };

        // Step 4: Save the interview data in the Interview collection
        await axios.post("/api/interviews", interviewData);
        
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
        <div className="flex flex-col gap-2.5">
          <label className="text-base text-normal leading-[22px] text-sky-300">
            Enter Email Id
          </label>
          <Textarea
            className="border-none bg-red-400 focus-visible:ring-0 focus-visible:ring-offset-0"
            onChange={(e) => setApplicantEmail(e.target.value)}
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
