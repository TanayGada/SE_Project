"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // For routing in Next.js

const MockInterview = () => {
  // State for form inputs
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const router = useRouter();

  // Dummy list of companies and roles for demonstration
  const companies = ['Google', 'Amazon', 'Microsoft', 'Meta', 'Apple'];
  const roles = ['Software Engineer', 'Product Manager', 'Data Scientist', 'UX/UI Designer'];

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Redirect to the mock interview page with selected company and role as query parameters
    router.push(`/mock-interview/start?company=${company}&role=${role}`);
  };

  return (
    <div className=" flex justify-center  bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Virtual Mock Interview</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Selection */}
          <div className="flex flex-col">
            <label htmlFor="company" className="font-medium text-gray-700">Select Company</label>
            <select
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="p-3 border border-gray-300 rounded-md"
            >
              <option value="">Select a Company</option>
              {companies.map((comp, index) => (
                <option key={index} value={comp}>{comp}</option>
              ))}
            </select>
          </div>

          {/* Role Selection */}
          <div className="flex flex-col">
            <label htmlFor="role" className="font-medium text-gray-700">Select Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="p-3 border border-gray-300 rounded-md"
            >
              <option value="">Select a Role</option>
              {roles.map((r, index) => (
                <option key={index} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 w-full"
              disabled={!company || !role}
            >
              Start Mock Interview
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MockInterview;