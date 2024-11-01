const mongoose = require('mongoose');

// Define the Interview Schema
const interviewSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job', // Reference to the Job model
        required: true,
    },
    applicantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Applicant', // Reference to the Applicant model
        required: true,
    },
    interviewerId: {
        type: mongoose.Schema.Types.ObjectId,
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
    status: {
        type: String,
        enum: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'], // Define possible statuses
        default: 'Scheduled',
    },
    feedback: {
        type: String,
        required: false, // Feedback can be optional at the time of creating the interview
    },
});

// Create the Interview model
const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;