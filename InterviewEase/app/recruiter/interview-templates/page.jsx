"use client";

import React, { useState } from 'react';

const Interviewtemplate = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [templateGenerated, setTemplateGenerated] = useState(false);

  const roles = ["Software Engineer", "Data Scientist", "Product Manager"];
  
  const handleGenerateTemplate = () => {
    setTemplateGenerated(true);  // Simulate template generation
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        {/* Header */}
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-8">Interview Template Generator</h1>

        {/* Form Section */}
        <div className="flex space-x-6 mb-8">
          <div className="flex flex-col flex-1">
            <label htmlFor="email" className="text-lg font-medium text-gray-700">Applicant's Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 border border-gray-300 rounded-md"
              placeholder="Enter applicant's email"
              required
            />
          </div>

          <div className="flex flex-col flex-1">
            <label htmlFor="role" className="text-lg font-medium text-gray-700">Role Applied For</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="p-3 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Role</option>
              {roles.map((roleOption) => (
                <option key={roleOption} value={roleOption}>
                  {roleOption}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Generate Button */}
        <div className="text-center mb-8">
          <button
            onClick={handleGenerateTemplate}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Generate Interview Template
          </button>
        </div>

        {/* Generated Template */}
        {templateGenerated && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Generated Interview Template</h2>
            <div className="space-y-6">
              {/* Each Section */}
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-xl font-medium text-gray-700 mb-2">Introduction</h3>
                <p>Introduce the company, discuss the role, and set the context for the interview.</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-xl font-medium text-gray-700 mb-2">Resume-based Questions</h3>
                <p>Questions related to the candidate's experience and skills listed in their resume.</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-xl font-medium text-gray-700 mb-2">CS Fundamentals</h3>
                <ul className="list-disc pl-5">
                  <li>Database Management Systems (DBMS)</li>
                  <li>Operating Systems (OS)</li>
                  <li>Object-Oriented Programming (OOP)</li>
                  <li>Computer Networks (CN)</li>
                </ul>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-xl font-medium text-gray-700 mb-2">Coding (DSA)</h3>
                <p>Ask coding problems related to Data Structures and Algorithms (DSA).</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-xl font-medium text-gray-700 mb-2">Behavioral/HR Questions</h3>
                <p>Behavioral questions such as "Tell me about yourself," "Why do you want to join our company?"</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-xl font-medium text-gray-700 mb-2">Role-Specific Questions</h3>
                <p>Role-specific questions for the job applied, such as system design for a Software Engineer.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Interviewtemplate;