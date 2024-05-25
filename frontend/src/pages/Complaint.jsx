import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Complaint() {
  const user = JSON.parse(sessionStorage.getItem("user")) || null;
  // console.log("user", user);
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState();

  const handleComplaint = async () => {
    try {
      const response = await axios.get(
        `api/v1/complaints/${user.user.username}`
      );
      // console.log('response', response);
      
      setComplaints(response.data.data);
    } catch (error) {
      // alert("Error", error);
      console.log('No user found', error);
      
    }
  };

  useEffect(() => {
    if(user) handleComplaint();
  }, []);

  // console.log("complaints", complaints);

  return (
    <>
      <header className="sticky left-0 top-0 w-full z-10 bg-red-500 font-bold text-white text-3xl p-2 mb-10">
        Complaints
      </header>
      <main className="h-auto">
        <div className="flex flex-col items-center gap-4">
          {Array.isArray(complaints) &&
            complaints.map((complaint) => (
              <div
                key={complaint._id}
                className="flex flex-col items-start w-[400px] h-[200px] bg-gray-200 bg-opacity-60 p-4 rounded-xl"
              >
                <h2 className="text-xl font-bold">{complaint.area}</h2>
                <p className="text-lg">{complaint.callerAddress}</p>
                <p className="text-lg">{complaint.centre}</p>
                <p className="text-lg">{complaint.remarks}</p>
              </div>
            ))}
        </div>
        {/* file new complaint */}

        <div className="flex justify-center items-end h-full">
          <Link to="/newComplaint" className="text-red-500 font-bold text-lg">
            File new complaint !
          </Link>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/login");
          }}
          className="bg-red-500 mt-6 text-white px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </main>
    </>
  );
}

export default Complaint;
