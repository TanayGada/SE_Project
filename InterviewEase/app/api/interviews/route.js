import { connectDb } from "@/lib/mongodb";
import Interview from "@/models/interview";
import { NextResponse } from "next/server";

// create a new interview
export async function POST(req) {
  try {
    await connectDb();
    // Parse request data from the client
    const { applicantClerkId, recruiterClerkId, interviewDateTime, meetLink } =
      await req.json();

    // Validation: Ensure all necessary data is present
    if (
      !applicantClerkId ||
      !recruiterClerkId ||
      !interviewDateTime ||
      !meetLink
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create a new Interview document
    const newInterview = new Interview({
      applicantClerkId,
      recruiterClerkId,
      interviewDateTime,
      meetLink,
    });

    // Save the new interview to the database
    await newInterview.save();

    return NextResponse.json(
      { message: "Interview scheduled successfully", interview: newInterview },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating interview:", error);
    return NextResponse.json(
      { message: "Error scheduling interview", error: error.message },
      { status: 500 }
    );
  }
}
