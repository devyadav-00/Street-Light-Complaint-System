import React, { useEffect, useState } from "react";
import NavWithProfile from "../components/NavWithProfile";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ComplaintCard from "../components/ComplaintCard";

const url = import.meta.env.VITE_BACKEND_URL;

const AdminComplaints = () => {
  const user = JSON.parse(sessionStorage.getItem("user")) || null;
  // console.log("user", user);
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState();
  const [showAll, setShowAll] = useState(false); 

  const handleComplaint = async () => {
    try {
      const response = await axios.get(
        `${url}/api/v1/complaints/admin?area=${user.user.area}&&centre=${user.user.centre}&&division=${user.user.division}`
      );
      // console.log("response", response);

      setComplaints(response.data.data);
      // complaints.sort([createdAt, 1]);
    } catch (error) {
      // alert("Error", error);
      console.log("No user found", error);
    }
  };

  useEffect(() => {
    if (user) handleComplaint();
  }, []);

  return (
    <div>
      <NavWithProfile text="All Complaints" />
      <main className="h-[680px] overflow-scroll no-scrollbar flex flex-col items-center gap-2 transition-all duration-200 ease-in-out">
        <h1 className="text-3xl mb-5">All Pending Complaints</h1>
        <div className="flex flex-col items-center gap-4">
          {Array.isArray(complaints) &&
            complaints
              .filter((complaint) => complaint.status === "pending")
              .map((complaint, index) => (
                <ComplaintCard complaint={complaint} key={index} type="admin" />
              ))}
        </div>
        {/* file new complaint */}

        {showAll && (
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-2xl font-bold text-white/60">Old Records</h1>
            {Array.isArray(complaints) &&
              complaints
                .filter((complaint) => complaint.status !== "pending")
                .map((complaint, index) => (
                  <ComplaintCard
                    complaint={complaint}
                    key={index}
                    type="admin"
                  />
                ))}
          </div>
        )}
        <button
          className="bg-blue-500 mt-6 text-white px-4 py-2 rounded-md"
          onClick={() => {
            setShowAll(!showAll);
          }}
        >
          {showAll ? "Show only pending" : "Show all Records"}
        </button>

        <button
          onClick={() => {
            sessionStorage.removeItem("user");
            navigate("/login");
          }}
          className="bg-red-500 mt-6 text-white px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </main>
    </div>
  );
};

export default AdminComplaints;
