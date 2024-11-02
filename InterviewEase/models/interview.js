import mongoose from "mongoose";

// Define the Interview Schema
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
    interviewDate: {
        type: Date,
        required: true,
    },
    interviewTime: {
        type: String, // Could be in 24-hour format (HH:mm)
        required: true,
    },
    meetLink: {
        type: String,
        required: true,
    },
    feedback: {
        type: String,
        required: false, // Feedback can be optional at the time of creating the interview
    },
});

// Create the Interview model, checking for existence to prevent overwriting
const Interview = mongoose.models.Interview || mongoose.model('Interview', interviewSchema);

export default Interview;