import Recruiter from "@/models/Recruiter";
import { connectDb } from "@/lib/mongodb";

export async function POST(req) {
  await connectDb();
  try {
    const { clerkId, name, email} = await req.json();

    const newRecruiter = new Recruiter({
      clerkId,
      name,
      email
    });

    const savedRecruiter = await newRecruiter.save();
    return new Response(JSON.stringify(savedRecruiter), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 400 });
  }
}