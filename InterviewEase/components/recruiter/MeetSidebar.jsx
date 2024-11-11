"use client";

import { useParams } from "next/navigation";
import React, { useState } from "react";

const MeetSidebar = () => {
    const params = useParams();
  const [question, setQuestion] = useState("This is the sample question?");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(5); 
  const [questionType, setQuestionType] = useState("");
  const [expectedAnswer, setExpectedAnswer] = useState("");

    console.log(params.id);
  const handleGenerateQuestion = () => {
    let difficulty;
    if (score <= 3) difficulty = "easy";
    else if (score <= 7) difficulty = "medium";
    else difficulty = "hard";

    console.log(`Generating a ${difficulty} question based on score: ${score}`);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleQuestionTypeChange = (e) => {
    setQuestionType(e.target.value);
  };

  const handleExpectedAnswerChange = (e) => {
    setExpectedAnswer(e.target.value);
  };

  return (
    <div className="w-[400px] bg-[#2C2F35] p-6 text-white h-[90vh] overflow-y-auto">
      <h2 className="text-xl font-semibold">Question & Feedback</h2>

      {/* Display Question */}
      <div className="mb-6">
        <label htmlFor="question" className="block text-sm mb-2 font-medium">
          Current Question:
        </label>
        <textarea
          id="question"
          className="w-full p-3 rounded-md bg-[#3C4043] text-white border-none focus:outline-none resize-none"
          value={question}
          rows="6"
          readOnly
        />
      </div>

      {/* Expected Answer Section */}
      <div className="mb-6">
        <label htmlFor="expectedAnswer" className="block text-sm mb-2 font-medium">
          Expected Answer:
        </label>
        <textarea
          id="expectedAnswer"
          className="w-full p-3 rounded-md bg-[#3C4043] text-white border-none focus:outline-none resize-none"
          placeholder="Type the expected answer here..."
          value={expectedAnswer}
          onChange={handleExpectedAnswerChange}
          rows="4"
        />
      </div>

      {/* Feedback Section */}
      <div className="mb-6">
        <label htmlFor="feedback" className="block text-sm mb-2 font-medium">
          Feedback
        </label>
        <textarea
          id="feedback"
          className="w-full p-3 rounded-md bg-[#3C4043] text-white border-none focus:outline-none resize-none"
          placeholder="Type your feedback here..."
          value={feedback}
          onChange={handleFeedbackChange}
          rows="4"
        />
      </div>

      {/* Score Section */}
      <div className="mb-6 flex items-center">
        <label htmlFor="score" className="block text-sm mr-2 font-medium">
          Score (Out of 10):
        </label>
        <input
          type="number"
          id="score"
          className="w-full max-w-[60px] p-3 rounded-md bg-[#3C4043] text-white border-none focus:outline-none"
          value={score}
          min="0"
          max="10"
          onChange={(e) => setScore(Number(e.target.value))}
        />
      </div>

      {/* Specific Question Type Section */}
      <div className="mb-6">
        <label htmlFor="questionType" className="block text-sm mb-2 font-medium">
          Select Question Type:
        </label>
        <select
          id="questionType"
          className="w-full p-3 rounded-md bg-[#3C4043] text-white border-none focus:outline-none"
          value={questionType}
          onChange={handleQuestionTypeChange}
        >
          <option value="Resume based">Resume Based</option>
          <option value="OOP">Object Oriented Programming</option>
          <option value="DBMS">Database Management</option>
          <option value="OS">Operating System</option>
          <option value="coding">Coding</option>
          <option value="behavioral">Behavioral</option>
        </select>
      </div>

      {/* Generate New Question & Feedback Section */}
      <div className="mb-6">
        <button
          className="w-full bg-[#DC433B] hover:bg-[#cb7671] py-3 rounded-md text-white font-semibold"
          onClick={handleGenerateQuestion}
        >
          Submit Feedback & Generate New Question
        </button>
      </div>
    </div>
  );
};

export default MeetSidebar;