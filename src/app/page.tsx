"use client";

import { useEffect, useState } from "react";
import { Advocate } from "./type";
import CreateAdvocateModal from "./component/modal";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [newAdvocate, setNewAdvocate] = useState<Partial<Advocate>>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const pageSizeOptions = [5, 10, 20, 50];

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `/api/advocates?page=${currentPage}&limit=${recordsPerPage}&search=${encodeURIComponent(
            searchTerm
          )}`
        );
        const data = await response.json();

        setAdvocates(data.data || []);
        setTotalRecords(data.total || 0);
      } catch (error) {
        console.error("Error fetching advocates data:", error);
      }
    }

    fetchData();
  }, [currentPage, recordsPerPage, searchTerm]);

  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const onNewAdvocateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setNewAdvocate((prev) => ({ ...prev, [name]: value }));
  };

  const onCreateNewAdvocate = async () => {
    try {
      const response = await fetch("/api/seed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAdvocate),
      });

      if (response.ok) {
        setNewAdvocate({}); 
        setCurrentPage(1); 
        setIsModalOpen(false);
      } else {
        console.error("Failed to create advocate:", await response.text());
        alert("Failed to create advocate. Please try again.");
      }
    } catch (error) {
      console.error("Error creating advocate:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
  };

  const changePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRecordsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); 
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <div>
        <p>Search</p>
        <input
          className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={searchTerm}
          onChange={onChange}
          placeholder="Search advocates..."
        />
      </div>
      <br />
      <div>
        <label htmlFor="pageSize">Records per page: </label>
        <select
          id="pageSize"
          value={recordsPerPage}
          onChange={changePageSize}
          className="border rounded px-2 py-1"
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <br />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => setIsModalOpen(true)}
      >
        Create New Advocate
      </button>

      <CreateAdvocateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onCreateNewAdvocate}
        advocateData={newAdvocate}
        onChange={onNewAdvocateChange}
      />
      <table className="w-full border border-2">
        <thead>
          <tr>
            <th className="border border-2">First Name</th>
            <th className="border border-2">Last Name</th>
            <th className="border border-2">City</th>
            <th className="border border-2">Degree</th>
            <th className="border border-2">Specialties</th>
            <th className="border border-2">Years of Experience</th>
            <th className="border border-2">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {advocates.map((advocate, index) => (
            <tr key={index}>
              <td className="border border-2 text-center">
                {advocate.firstName}
              </td>
              <td className="border border-2 text-center">
                {advocate.lastName}
              </td>
              <td className="border border-2 text-center">{advocate.city}</td>
              <td className="border border-2 text-center">{advocate.degree}</td>
              <td className="border border-2 pl-2">
                {Array.isArray(advocate.specialties) && advocate.specialties.map((specialty, idx) => (
                  <div key={idx}>{specialty}</div>
                ))}
              </td>
              <td className="border border-2 text-center">
                {advocate.yearsOfExperience}
              </td>
              <td className="border border-2 text-center">
                {advocate.phoneNumber}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4 space-x-2">
        <button
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded border border-gray-300 ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </main>
  );
}
