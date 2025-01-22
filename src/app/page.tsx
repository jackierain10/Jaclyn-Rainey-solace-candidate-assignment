"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);

    useEffect(() => {
        const fetchAdvocates = async () => {
            try {
                console.log("Fetching advocates...");
                const response = await fetch("/api/advocates");
                const jsonResponse = await response.json();
                setAdvocates(jsonResponse.data);
                setFilteredAdvocates(jsonResponse.data);
            } catch (error) {
                console.error("Error fetching advocates:", error);
            }
        };
        fetchAdvocates();
    }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
          advocate.firstName.toLowerCase().includes(searchTerm) ||
          advocate.lastName.toLowerCase().includes(searchTerm) ||
          advocate.city.toLowerCase().includes(searchTerm) ||
          advocate.degree.toLowerCase().includes(searchTerm) ||
          advocate.specialties.some((s) => s.toLowerCase().includes(searchTerm)) ||
          advocate.yearsOfExperience.toString().includes(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
      setFilteredAdvocates(advocates);
      const input = document.getElementById("searchBar");
      input ? input.value = "" : null;
  };

    const formatPhoneNumber = (phoneNumberString: string) => {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        return match ? `(${match[1]}) ${match[2]}-${match[3]}` : phoneNumberString;
    }

  return (
    <main style={{ margin: "24px" }}>
        <h1 style={{ fontFamily: "Mollie Glaston, sans-serif", fontSize: "2.5rem", color: "#265b4e", fontWeight: "500", textAlign: "center" }}>Solace Advocates</h1>
        <h2 style={{ padding: "10px 200px", textAlign: "center" }}>At Solace, we aim to match you with the best advocate to meet your needs.
              Have a look below at our available advocates and their specialties to see which ones are of interest to you!
        </h2>
        <br />
        <br />
        <div>
            <div style={{ display: "flex" }}>
                <p style={{ fontSize: "1.25rem", margin: "0px 15px" }}>Search: </p>
                <input id="searchBar" style={{ border: "1px solid black", marginRight: "10px" }} onChange={handleSearch} />
                <button onClick={onClick}>
                    <svg width="25px" height="25px" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                        <g fill="none" fill-rule="evenodd" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" transform="translate(2 2)">
                            <path d="m4.5 1.5c-2.4138473 1.37729434-4 4.02194088-4 7 0 4.418278 3.581722 8 8 8s8-3.581722 8-8-3.581722-8-8-8" />
                            <path d="m4.5 5.5v-4h-4" />
                        </g>
                    </svg>
                </button>
            </div> 
        </div>
        <br />
        <br />
        <table style={{ width: "100%", marginTop: "30px"}}>
            <thead style={{ height: "50px", background: "#265b4e", color: "#FFF" }}>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>City</th>
                    <th>Degree</th>
                    <th>Specialties</th>
                    <th>Years of Experience</th>
                    <th>Phone Number</th>
                </tr>
            </thead>
            <tbody>
            {filteredAdvocates.map((advocate, index) => {
                return (
                    <tr key={index}>
                        <td>{advocate.firstName}</td>
                        <td>{advocate.lastName}</td>
                        <td>{advocate.city}</td>
                        <td>{advocate.degree}</td>
                        <td>
                            {advocate.specialties.map((specialty, index) => (
                                <li key={index}>{specialty.toString()}</li>
                            ))}
                        </td>
                        <td>{advocate.yearsOfExperience}</td>
                        <td>{formatPhoneNumber(advocate.phoneNumber.toString())}</td>
                     </tr>
                );
            })}
            </tbody>
        </table>
    </main>
  );
}
