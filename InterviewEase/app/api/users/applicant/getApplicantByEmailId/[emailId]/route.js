import { NextResponse } from "next/server";
import { connectDb } from "@/lib/mongodb";
import Applicant from "@/models/Applicant";



// Define the GET function to handle requests
export async function GET(request, { params }) {
  try {
    // Connect to the database
    await connectDb();
    console.log("step1")
    const { emailId } = params;
    console.log("emailId",emailId);
    // Find the applicant by email
    const applicant = await Applicant.findOne({ email: emailId });

    if (!applicant) {
      return NextResponse.json(
        { error: "Applicant not found From Server" },
        { status: 404 }
      );
    }

    // Return the applicant details as JSON
    return NextResponse.json({ applicant }, { status: 200 });
  } catch (error) {
    console.error("Error fetching applicant:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}