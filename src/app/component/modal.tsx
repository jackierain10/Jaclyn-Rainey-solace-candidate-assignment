"use client";

import { useEffect, useState } from "react";
import { Advocate } from "../type";

interface CreateAdvocateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (advocateData: Partial<Advocate>) => void;
  advocateData: Partial<Advocate>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CreateAdvocateModal: React.FC<CreateAdvocateModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  advocateData,
  onChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/2">
        <h2 className="text-lg font-semibold mb-4">Create New Advocate</h2>
        <input
          className="border px-4 py-2 rounded mb-2 w-full"
          placeholder="First Name"
          name="firstName"
          value={advocateData.firstName || ""}
          onChange={onChange}
        />
        <input
          className="border px-4 py-2 rounded mb-2 w-full"
          placeholder="Last Name"
          name="lastName"
          value={advocateData.lastName || ""}
          onChange={onChange}
        />
        <input
          className="border px-4 py-2 rounded mb-2 w-full"
          placeholder="City"
          name="city"
          value={advocateData.city || ""}
          onChange={onChange}
        />
        <input
          className="border px-4 py-2 rounded mb-2 w-full"
          placeholder="Degree"
          name="degree"
          value={advocateData.degree || ""}
          onChange={onChange}
        />
        <input
          className="border px-4 py-2 rounded mb-2 w-full"
          placeholder="Specialties (comma-separated)"
          name="specialties"
          value={advocateData.specialties || ""}
          onChange={onChange}
        />
        <input
          className="border px-4 py-2 rounded mb-2 w-full"
          placeholder="Years of Experience"
          name="yearsOfExperience"
          type="number"
          value={advocateData.yearsOfExperience || ""}
          onChange={onChange}
        />
        <input
          className="border px-4 py-2 rounded mb-2 w-full"
          placeholder="Phone Number"
          name="phoneNumber"
          type="tel"
          value={advocateData.phoneNumber || ""}
          onChange={onChange}
        />
        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => onSubmit(advocateData)}
          >
            Create Advocate
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAdvocateModal;
