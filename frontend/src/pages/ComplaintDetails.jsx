import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "../components/Navigation";
import axios from "axios";
import ComplaintImages from "../components/ComplaintImages";

const url = import.meta.env.VITE_BACKEND_URL;

const ComplaintDetails = () => {
  const { isAdmin, complaintId } = useParams();

  const navigate = useNavigate();

  const [complaint, setComplaint] = useState({});
  const [status, setStatus] = useState("");
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const response = await axios.get(
          "https://street-light-complaint-system-api.vercel.app/api/v1/complaints/" +
            complaintId
        );
        setComplaint(response.data.data);
      } catch (error) {}
    };

    fetchComplaint();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "https://street-light-complaint-system-api.vercel.app//api/v1/complaints/" +
          complaintId,
        {
          status,
          remarks,
        }
      );
      console.log("response", response);

      navigate("/admin/complaint");
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log("complaint", complaint);

  return (
    <div>
      <Navigation text={"Complaint"} />
      <main className="h-[680px] overflow-auto no-scrollbar flex flex-col items-center  gap-2 mt-10 bg-black/70 rounded-3xl mx-8 py-10">
        <h1 className="text-3xl mb-5 font-semibold">Complaint Details</h1>
        <div className="flex flex-col items-center w-full gap-4">
          <div className="p-4 rounded-md w-[400px] gap-2 px-12 flex flex-col items-start ">
            <h1 className="text-xl font-semibold">
              Fault : {complaint.typeOfFault}
            </h1>
            <p className="">Category : {complaint.category}</p>
            <p className="font-semibold">Location: {complaint.location}</p>
            <p className="tracking-tight">Remarks : {complaint.remarks}</p>
            <p className="">Date: {complaint.createdAt?.split("T")[0]}</p>
            <p className="">
              Time: {complaint.createdAt?.split("T")[1]?.split(".")[0]} ISD
            </p>
            <div className="p-2 px-20 font-bold">Customer Details</div>
            <p>Name : {complaint.callerName}</p>
            <p>Address : {complaint.callerAddress}</p>
            <p>Phone : {complaint.callerPhone}</p>
          </div>
        </div>
        <ComplaintImages complaint={complaint} />
        <div></div>

        {complaint.status === "pending" && isAdmin === "admin" && (
          <div className="flex flex-col items-center bg-white/10 gap-4 rounded-md p-4 mt-6">
            <h1 className="text-xl font-semibold ">Actions</h1>
            <select
              name="status"
              id="status"
              value={status}
              className="p-2 border-b-2 w-[250px] bg-transparent border-gray-500 text-lg"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option className="bg-black/90" value="">
                Select the status
              </option>
              <option className="bg-black/90" value="approved">
                Approve
              </option>
              <option className="bg-black/90" value="deny">
                Deny
              </option>
            </select>
            <textarea
              type="text"
              placeholder="Remarks"
              className="p-2 border-b-2 w-[250px] bg-transparent border-gray-500 text-lg"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
            <button
              onClick={onSubmit}
              className="bg-red-400 text-black border border-black"
            >
              Submit
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ComplaintDetails;
