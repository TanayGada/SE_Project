import Signup from '@/app/(auth)/sign-up/[[...sign-up]]/page';
import { SignInButton } from '@clerk/nextjs';
import React, { useState } from 'react';

const RoleSelectionModal = ({ isOpen, onClose, onSubmit }) => {
  const [role, setRole] = useState(""); // Initialize with an empty string

  const handleRoleChange = (event) => {
    setRole(event.target.value); // Update the state with the selected role
  };

  const handleConfirm = () => {
    if (role) {
      Signup(role); 
      onClose(); // Close the modal
    } else {
      alert("Please select a role."); // Optional: Alert if no role is selected
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${!isOpen ? 'hidden' : ''
        }`}
    >
      <div className="bg-white p-5 rounded-md shadow-lg">
        <h2 className="text-lg font-bold mb-4">Select Your Role</h2>
        <select onChange={handleRoleChange} value={role} defaultValue="">
          <option value="" disabled>Select Role</option>
          <option value="applicant">Applicant</option>
          <option value="interviewer">Interviewer</option>
        </select>
        <div className="flex justify-end mt-4">
          <button className="btn" onClick={handleConfirm}>Confirm</button>TypeError: onSubmit is not a function
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionModal;