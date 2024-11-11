"use client";

import React, { useState } from 'react';

const InterviewPreparation = () => {
  // State to handle form inputs
  const [topic, setTopic] = useState('');
  const [subtopic, setSubtopic] = useState('');
  const [questions, setQuestions] = useState([]); // For storing generated questions and answers
  const [isLoading, setIsLoading] = useState(false);

  // Dummy function to simulate question generation (replace with real LLM logic)
  const generateQuestions = async () => {
    setIsLoading(true);
    const generatedQuestions = [];

    // Simulate question generation based on subtopic
    for (let i = 0; i < 5; i++) {  // Adjust the number of questions generated
      generatedQuestions.push({
        question: `What is ${subtopic} in ${topic}?`,
        answer: `This is the answer to the question about ${subtopic} in ${topic}.`
      });
    }

    setQuestions(generatedQuestions);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* Form Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-blue-600 mb-4">Interview Preparation</h1>
          <p className="text-gray-600 mb-6">Prepare for your interview with dynamic questions based on the given inputs.</p>
          
          {/* Form Inputs - Topic and Subtopic in one line */}
          <div className="flex space-x-6 mb-6">
            <div className="flex flex-col flex-1">
              <label className="font-medium text-gray-700">Topic Name</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="p-3 border border-gray-300 rounded-md"
                placeholder="Enter topic name"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="font-medium text-gray-700">Subtopic</label>
              <input
                type="text"
                value={subtopic}
                onChange={(e) => setSubtopic(e.target.value)}
                className="p-3 border border-gray-300 rounded-md"
                placeholder="Enter subtopic name"
              />
            </div>
          </div>
          
          {/* Generate Questions Button - Aligned in a single row */}
          <div className="text-center">
            <button
              onClick={generateQuestions}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
              disabled={isLoading}
            >
              {isLoading ? 'Generating...' : 'Generate Questions'}
            </button>
          </div>
        </div>

        {/* Display Generated Questions and Answers */}
        <div className="mt-8">
          {questions.length === 0 ? (
            <p className="text-center text-gray-500">No questions generated yet. Please fill in the form and click 'Generate Questions'.</p>
          ) : (
            questions.map((qa, index) => (
              <div key={index} className="mb-6 p-6 bg-gray-50 border border-gray-300 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-700">{qa.question}</h3>
                <p className="mt-2 text-gray-600">{qa.answer}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewPreparation;