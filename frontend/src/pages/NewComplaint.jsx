import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Signature from "../components/Signature";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ImageStorage } from "../../services/firebaseConfig";
import { v4 } from "uuid";

export default function NewComplaint() {
  const [signatureTab, setSignatureTab] = useState("");
  const [image, setImage] = useState();
  const [signatureLink, setSignatureLink] = useState();

  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("user"))?.user || null;
  useEffect(() => {
    console.log("user", user);
  }, [user]);

  const [area, setArea] = useState("");
  const [location, setLocation] = useState("");
  const [centre, setCentre] = useState("");
  const [category, setCategory] = useState("");
  const [fault, setFault] = useState("");
  const [name, setName] = useState(user?.name || "");
  const [address, setAddress] = useState("");
  const [division, setDivision] = useState("");
  const [centrePhone, setCentrePhone] = useState("");
  const [callerPhone, setCallerPhone] = useState(user?.phoneNo || "");
  const [alternatePhone, setAlternatePhone] = useState("");
  const [remarks, setRemarks] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(
      "response: ",
      alternatePhone,
      area,
      address,
      name,
      callerPhone,
      category,
      centre,
      centrePhone,
      division,
      location,
      remarks,
      image,
      signatureLink,
      fault
    );

    try {
      const response = await axios
        .post(
          "api/v1/complaints/create",
          {
            username: user?.username || null,
            alternatePhone,
            area,
            callerAddress: address,
            callerName: name,
            callerPhone,
            category,
            complainCentre: centre,
            complainCentrePhone: centrePhone,
            division,
            location,
            remarks,
            picture: image,
            signature: signatureLink,
            typeOfFault: fault,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response);
          alert("Complaint Submitted Successfully");
          navigate("/complaint");
        })
        .catch((error) => {
          console.error("Error creating complaint:", error);
          alert("Fill all the fields");
        });
      console.log("response:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSignatureTab = (e) => {
    e.preventDefault();
    setSignatureTab(true);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setArea("");
    setLocation("");
    setCentre("");
    setCategory("");
    setFault("");
    setName("");
    setAddress("");
    setDivision("");
    setCentrePhone("");
    setCallerPhone("");
    setAlternatePhone("");
    setRemarks("");
    setImage("");
    setSignatureLink("");
  };

  const handleImage = (e) => {
    const imageUploaded = e.target.files[0];

    const imgRef = ref(ImageStorage, `images/${v4()}`);
    uploadBytes(imgRef, imageUploaded).then((snapshot) => {
      // console.log("Uploaded a blob or file!", snapshot);
      setImage(snapshot.metadata.fullPath);
      // console.log('image:', image);
    });
    // console.log('imgRef: ', imgRef);
  };

  return (
    <>
      <header className="sticky left-0 top-0 w-full z-10 bg-red-500 font-bold text-white text-3xl p-2 mb-2">
        Street Light Complaint
      </header>
      <main className="mx-2 h-[640px]">
        <div className="text-2xl font-bold text-red-500 border p-4 mb-8 rounded-lg">
          New Complaint Page
        </div>

        <form className="flex flex-col items-start w-full h-full gap-4 ml-8 overflow-y-scroll no-scrollbar">
          <label htmlFor="area" className="text-blue-500">
            Area
          </label>
          <input
            type="text"
            id="area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="p-2 border-b-2 w-[350px] bg-transparent border-gray-500 text-lg"
          />
          <label htmlFor="centre" className="text-blue-500">
            Complaint Centre
          </label>
          <input
            type="text"
            id="centre"
            value={centre}
            onChange={(e) => setCentre(e.target.value)}
            className="p-2 border-b-2 w-[350px] bg-transparent border-gray-500 text-lg"
          />
          <label htmlFor="category" className="text-blue-500">
            Complaint Category
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border-b-2 w-[350px] bg-transparent border-gray-500 text-lg"
          />

          <label htmlFor="fault" className="text-blue-500">
            Type of Fault
          </label>
          <input
            type="text"
            id="fault"
            value={fault}
            onChange={(e) => setFault(e.target.value)}
            className="p-2 border-b-2 w-[350px] bg-transparent border-gray-500 text-lg"
          />

          <label htmlFor="name" className="text-blue-500">
            Caller Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border-b-2 w-[350px] bg-transparent border-gray-500 text-lg"
          />

          <label htmlFor="address" className="text-blue-500">
            Caller Address
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="p-2 border-b-2 w-[350px] bg-transparent border-gray-500 text-lg"
          />

          <label htmlFor="division" className="text-blue-500">
            Division
          </label>
          <input
            type="text"
            id="division"
            value={division}
            onChange={(e) => setDivision(e.target.value)}
            className="p-2 border-b-2 w-[350px] bg-transparent border-gray-500 text-lg"
          />

          <label htmlFor="centrePhone" className="text-blue-500">
            Complaint Center Phone
          </label>
          <input
            type="text"
            id="centrePhone"
            value={centrePhone}
            onChange={(e) => setCentrePhone(e.target.value)}
            className="p-2 border-b-2 w-[350px] bg-transparent border-gray-500 text-lg"
          />

          <label htmlFor="callerPhone" className="text-blue-500">
            Caller Phone
          </label>
          <input
            type="text"
            id="callerPhone"
            value={callerPhone}
            onChange={(e) => setCallerPhone(e.target.value)}
            className="p-2 border-b-2 w-[350px] bg-transparent border-gray-500 text-lg"
          />

          <label htmlFor="alternatePhone" className="text-blue-500">
            Alternate Phone
          </label>
          <input
            type="text"
            id="alternatePhone"
            value={alternatePhone}
            onChange={(e) => setAlternatePhone(e.target.value)}
            className="p-2 border-b-2 w-[350px] bg-transparent border-gray-500 text-lg"
          />

          <label htmlFor="remarks" className="text-blue-500">
            Remarks
          </label>
          <input
            type="text"
            id="remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="p-2 border-b-2 w-[350px] bg-transparent border-gray-500 text-lg"
          />

          <label htmlFor="location" className="text-blue-500">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-2 border-b-2 w-[350px] bg-transparent border-gray-500 text-lg"
          />

          <div className="grid grid-cols-2 pb-10 items-center justify-center w-full gap-8 mt-10 align-middle pr-16">
            {/* buttons for camera, signature, register and reset */}

            <div className="flex relative border-2 h-full border-red-500 rounded-lg hover:bg-red-500 w-full transition-all duration-500">
              <span className="w-full h-full p-2 font-semibold justify-center items-center">
                Upload Image
              </span>
              <input
                type="file"
                onChange={handleImage}
                className="absolute opacity-0 block bg-transparent top-0 w-full p-2 rounded-lg hover:bg-red-600 cursor-pointer border-red-600 transition-all duration-500"
              />
            </div>
            <button
              onClick={handleSignatureTab}
              className="bg-transparent  border-2 border-red-500 p-2 px-4 rounded-lg hover:bg-red-600 hover:border-red-600 transition-all duration-500"
            >
              Signature
            </button>
            <button
              type="submit"
              onClick={handleRegister}
              className="bg-transparent border-2 border-red-500 p-2 px-4 rounded-lg hover:bg-red-600 hover:border-red-600 transition-all duration-500"
            >
              Register
            </button>

            <button
              type="submit"
              onClick={handleReset}
              className="bg-transparent border-2 border-red-500 p-2 px-4 rounded-lg hover:bg-red-600 hover:border-red-600 transition-all duration-500"
            >
              Reset
            </button>
          </div>
        </form>
        {signatureTab && (
          <Signature
            setSignatureLink={setSignatureLink}
            onClose={() => setSignatureTab(false)}
          />
        )}
      </main>
    </>
  );
}
