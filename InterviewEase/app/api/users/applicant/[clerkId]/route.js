import { connectDb } from "@/lib/mongodb"; // Adjust import as necessary

// GET request handler
export async function GET(req, { params }) {
    const { clerkId } = params; // Extract clerkId from parameters

    // Connect to the database
    const db = await connectDb();

    try {
        // Fetch the applicant from the database
        const applicant = await db.collection("applicants").findOne({ clerkId });

        if (!applicant) {
            return new Response(JSON.stringify({ message: "Applicant not found" }), { status: 404 });
        }

        // Return the applicant data
        return new Response(JSON.stringify({ resumeLink: applicant.resumeLink }), { status: 200 });
    } catch (error) {
        console.error("Error fetching applicant data:", error);
        return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
    }
}