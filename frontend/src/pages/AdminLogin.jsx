import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { resetUserData, setUserData } from "../services/store";
import Navigation from "../components/Navigation";

const url = import.meta.env.VITE_BACKEND_URL;

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = JSON.parse(sessionStorage.getItem("user"));
  // console.log('token', token);

  useEffect(() => {
    if (token) {
      const logout = window.confirm("Are you sure you want to logout?");

      if (logout) {
        sessionStorage.removeItem("user");
        dispatch(resetUserData());
      } else {
        navigate("/complaint");
      }
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios
        .post(url + "/api/v1/admin/login", {
          email,
          password,
        })
        .then((response) => {
          alert("Login Successful");
          dispatch(setUserData(response.data.data.user));
          sessionStorage.setItem("user", JSON.stringify(response.data.data));
          navigate("/admin/complaint");
        });
      // console.log("Login successful", response.data);

      // console.log("final data : ",response.data.data);
    } catch (error) {
      alert("Error", error);
      console.error("Error logging in:", error);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <Navigation text="Admin Login" />

      <main className="">
        <form className="flex flex-col items-start w-full h-full gap-4 ml-10">
          <label htmlFor="email">Enter Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="p-2 border-b-2 w-[350px] bg-transparent border-gray-500"
          />

          <label htmlFor="password">Enter Password</label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="p-2 border-b-2 w-[350px] bg-transparent border-gray-500"
          />

          <div className="flex flex-col items-center justify-center w-full gap-8 mt-10 align-middle pr-16">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-transparent border-2 border-red-500 p-2 px-4 rounded-lg hover:bg-red-600 hover:border-red-600 transition-all duration-500"
            >
              Login
            </button>
            
          </div>
        </form>
      </main>
    </>
  );
}

export default AdminLogin