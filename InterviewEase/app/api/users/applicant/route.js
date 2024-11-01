import Applicant from "@/models/Applicant";
import { connectDb } from "@/lib/mongodb";

export async function POST(req) {
  await connectDb();
  console.log("step1 from api/users/applicant/route.js");
  try {

    const { clerkId, name, email, resumeLink } = await req.json();
    console.log("step2 from api/users/applicant/route.js");
    console.log("clerkId", clerkId);
    console.log(typeof clerkId);
    console.log("email", email);
    console.log(typeof email)  
    const newApplicant = new Applicant({
      clerkId,
      name,
      email,
      resumeLink,
    });
    console.log("step3 from api/users/applicant/route.js");

    const savedApplicant = await newApplicant.save();
    console.log("step4 from api/users/applicant/route.js");
    return new Response(JSON.stringify(savedApplicant), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 400 });
  }
}