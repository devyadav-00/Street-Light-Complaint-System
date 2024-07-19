import axios from "axios";
import React, { lazy, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { setUserData } from "../services/store";
import Navigation from "../components/Navigation";

const url = import.meta.env.VITE_BACKEND_URL;

export default function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        url + "api/v1/users/register",
        {
          name,
          phoneNo: phone,
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Registration Successful");
      console.log("response", response);

      dispatch(setUserData(response.data.data.user));
      sessionStorage.setItem("user", JSON.stringify(response.data.data));
      navigate("/complaint");
      console.log("Registration successful", response.data);
    } catch (error) {
      alert("Fill all fields");
      console.log("error", error);
    }

    setName("");
    setPhone("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <Navigation text="Sign Up" />
      <main className="">
        <form className="flex flex-col items-start w-full h-full gap-4 ml-10">
          <label htmlFor="name">Enter Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="p-2 border-b-2 w-[350px] bg-transparent border-gray-500"
          />

          <label htmlFor="phone">Enter Phone Number</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone No."
            className="p-2 border-b-2 w-[350px] bg-transparent border-gray-500"
          />

          <label htmlFor="username"> Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="p-2 border-b-2 w-[350px] bg-transparent border-gray-500"
          />

          <label htmlFor="password"> Password</label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="p-2 border-b-2 w-[350px] bg-transparent border-gray-500"
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="text"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Password"
            className="p-2 border-b-2 w-[350px] bg-transparent border-gray-500"
          />

          <div className="flex flex-row items-start gap-4 mt-10 align-middle">
            <Link
              className="text-white hover:text-blue-200 font-thin"
              to="/newComplaint"
            >
              Continue as Guest?
            </Link>
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-transparent border-2 border-red-500 p-2 px-4 rounded-lg hover:bg-red-600 hover:border-red-600 transition-all duration-500"
            >
              Sign Up
            </button>
            <Link
              className="text-white hover:text-blue-200 font-thin"
              to="/login"
            >
              Already Registered?
            </Link>
          </div>
        </form>
      </main>
    </>
  );
}
