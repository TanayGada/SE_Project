import mongoose from "mongoose";

// Define the Interview Schema with combined interviewDateTime
const interviewSchema = new mongoose.Schema({
    applicantClerkId: {
        type: String,
        ref: 'Applicant', // Reference to the Applicant model
        required: true,
    },
    recruiterClerkId: {
        type: String,
        ref: 'Recruiter', // Reference to the Recruiter model
        required: true,
    },
    interviewDateTime: {
        type: Date, // Stores both date and time in a single field
        required: true,
    },
    meetLink: {
        type: String,
        required: true,
    },
    feedback: {
        type: String,
        required: false, // Feedback is optional at the time of interview creation
    },
});

// Create the Interview model, checking for existence to prevent overwriting
const Interview = mongoose.models.Interview || mongoose.model('Interview', interviewSchema);

export default Interview;