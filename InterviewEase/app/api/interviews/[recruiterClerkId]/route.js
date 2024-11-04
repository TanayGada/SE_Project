import { NextResponse } from "next/server";
import { connectDb } from "@/lib/mongodb";
import Interview from "@/models/Interview";

export async function GET(req, { params }) {
  const { recruiterClerkId } = params; // Extract recruiterClerkId from params

  try {
    await connectDb(); // Connect to the database

    // Fetch interviews where recruiterClerkId matches the parameter
    const interviews = await Interview.find({ recruiterClerkId });

    // Return the fetched interviews as JSON
    return NextResponse.json(interviews);
  } catch (error) {
    console.error("Error fetching interviews:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
