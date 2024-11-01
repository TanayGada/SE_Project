const mongoose = require('mongoose');

// Define the Job Schema
const jobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true,
    },
    jobDescription: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    employmentType: {
        type: String, // e.g., Full-time, Part-time, Contract
        required: true,
    },
    salary: {
        type: Number,
        required: false, // Salary can be optional
    },
    requirements: {
        type: [String], // Array of strings for job requirements
        required: true,
    },
    responsibilities: {
        type: [String], // Array of strings for job responsibilities
        required: true,
    },
    datePosted: {
        type: Date,
        default: Date.now,
    },
    applicantIds: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Applicant', // Reference to the Applicant model
    },
});

// Create the Job model
const Job = mongoose.model('Job', jobSchema);

module.exports = Job;