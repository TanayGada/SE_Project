import { connectDb } from "@/lib/mongodb";
import Interview from "@/models/interview";

export async function GET(request, { params }) {
    const { clerkId } = params;

    await connectDb()

    try {
        // Fetch interviews where applicantId matches the provided clerkId
        const interviews = await Interview.find({ applicantClerkId: clerkId })
        
        return new Response(JSON.stringify(interviews), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Error fetching interviews' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}