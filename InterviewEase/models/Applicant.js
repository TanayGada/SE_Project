// models/Applicant.js
import mongoose from 'mongoose';

const applicantSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true, // Clerk ID to uniquely identify applicants
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  resumeLink: {
    type: String,
  },
  interviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Interview', // Reference to Interview collection
    },
  ],
}, { timestamps: true });

// Check if the model already exists before defining it to prevent OverwriteModelError
const Applicant = mongoose.models.Applicant || mongoose.model('Applicant', applicantSchema);

export default Applicant;