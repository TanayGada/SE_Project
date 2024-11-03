"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const MeetingCard = ({
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link, // Link for the meeting
  resumeLink,
  buttonText,
}) => {
  console.log("title", title);
  console.log("date", date);
  console.log("isPreviousMeeting", isPreviousMeeting);
  console.log("buttonIcon1", buttonIcon1);
  console.log("link", link);
  console.log("resumeLink", resumeLink);
  console.log("buttonText", buttonText);

  return (
    <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-red-300 px-5 py-8 xl:max-w-[568px]">
      <article className="flex flex-col gap-5">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-base font-normal">{date}</p>
          </div>
        </div>
      </article>
      <article className={cn("flex justify-center relative", {})}>
        <div className="relative flex w-full max-sm:hidden"></div>
        <div className="flex gap-2">
          {isPreviousMeeting ? (
            // Buttons for previous meetings
            <>
              <Button
                onClick={() => {
                  // Handle feedback button action
                  console.log("Feedback button clicked");
                }}
                className="bg-green-500 px-6"
              >
                Feedback
              </Button>
              <Button
                onClick={() => {
                  // Handle view recording action
                  console.log("View Recording button clicked");
                }}
                className="bg-yellow-500 px-6"
              >
                View Recording
              </Button>
              <Button
                onClick={() => window.open(link, '_blank')}
                className="bg-blue-500 px-6"
              >
                Meet Link
              </Button>
            </>
          ) : (
            // Buttons for current meetings
            <>
              <Button onClick={handleClick} className="rounded bg-blue-500 px-6">
                {buttonIcon1 && (
                  <Image src={buttonIcon1} alt="feature" width={20} height={20} />
                )}
                &nbsp; {buttonText}
              </Button>
              <Button
                onClick={() => window.open(resumeLink, '_blank')}
                className="bg-red-900 px-6"
                disabled={!resumeLink} // Disable if no resumeLink is provided
              >
                View Resume
              </Button>
              <Button
                onClick={() => {
                  // Handle template for interview button action
                  console.log("Template for Interview button clicked");
                }}
                className="bg-purple-500 px-6"
              >
                Interview Template 
              </Button>
            </>
          )}
        </div>
      </article>
    </section>
  );
};

export default MeetingCard;