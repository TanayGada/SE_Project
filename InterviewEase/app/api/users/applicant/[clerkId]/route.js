import { connectDb } from "@/lib/mongodb"; // Adjust import as necessary

// GET request handler
export async function GET(req, { params }) {
    const { clerkId } = params; // Extract clerkId from parameters
    console.log("Received clerkId:", clerkId); // Log the received clerkId

    // Connect to the database
    console.log("Connecting to the database...");
    const db = await connectDb();
    console.log("Connected to the database");

    try {
        const startTime = Date.now();
        // Fetch the applicant from the database
        const applicant = await db.collection("applicants").findOne({ clerkId });
        const duration = Date.now() - startTime;
        console.log(`Query time: ${duration}ms`);

        if (!applicant) {
            console.warn(`No applicant found with clerkId: ${clerkId}`);
            return new Response(JSON.stringify({ message: "Applicant not found" }), { status: 404 });
        }

        // Return the applicant data
        return new Response(JSON.stringify(applicant), { status: 200 });
    } catch (error) {
        console.error("Error fetching applicant data:", error.message, error.stack);
        return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
    }
}