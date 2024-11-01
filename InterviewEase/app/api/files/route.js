import { NextResponse } from "next/server";
import { pinata } from "@/lib/pinata";
import Applicant from "@/models/Applicant";
import { connectDb } from "@/lib/mongodb";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  try {

    await connectDb();
    const data = await request.formData();
    const file = data.get("file");
    const clerkId = data.get("clerkId");

    console.log("FormData received:", data);
    console.log("File received:", file);
    console.log("Clerk ID received:", clerkId);

    if (!file || !clerkId) {
      return NextResponse.json({ error: "File or clerkId missing" }, { status: 400 });
    }

    // Upload the file using Pinata
    const uploadData = await pinata.upload.file(file);
    const url = await pinata.gateways.createSignedURL({
      cid: uploadData.cid,
      expires: 3600,
    });

    console.log("File uploaded to Pinata with URL:", url);

    // Update the applicant's resume URL using clerkId
    const updatedApplicant = await Applicant.findOneAndUpdate(
      { clerkId: clerkId },
      { resumeLink: url },
      { new: true }
    );

    if (!updatedApplicant) {
      return NextResponse.json({ error: "Applicant not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, resumeLink: url }, { status: 200 });
  } catch (e) {
    console.error("Error in POST /api/files:", e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}