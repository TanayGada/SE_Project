// models/Recruiter.js
import mongoose from 'mongoose';

const recruiterSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true, // Clerk ID to uniquely identify recruiters
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Recruiter = mongoose.models.Recruiter || mongoose.model('Recruiter', recruiterSchema);

export default Recruiter;