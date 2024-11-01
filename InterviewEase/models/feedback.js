const mongoose = require('mongoose');

// Define the Feedback Schema
const feedbackSchema = new mongoose.Schema({
    interviewId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Interview', // Reference to the Interview model
        required: true,
    },
    interviewerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recruiter', // Reference to the Recruiter model
        required: true,
    },
    applicantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Applicant', // Reference to the Applicant model
        required: true,
    },
    comments: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        min: 0,
        max: 10, // Assuming a score out of 10
        required: true,
    },
    dateGiven: {
        type: Date,
        default: Date.now,
    },
});

// Create the Feedback model
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;