import React, { lazy, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { resetUserData, setUserData } from "../services/store";

export default function Login() {
  const [username, setUsername] = useState("");
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
        .post("api/v1/users/login", {
          username,
          password,
        })
        .then((response) => {
          alert("Login Successful");
          dispatch(setUserData(response.data.data.user));
          sessionStorage.setItem("user", JSON.stringify(response.data.data));
          navigate("/complaint");
        })
        .catch((error) => {
          alert("No user found!");
          console.error("Error logging in:", error);
        });
      console.log("Login successful", response.data);

      // console.log("final data : ",response.data.data);
    } catch (error) {
      alert("Error", error);
      console.error("Error logging in:", error);
      setUsername("");
      setPassword("");
    }
  };

  return (
    <>
      <header className="sticky left-0 top-0 w-full z-10 bg-red-500 font-bold text-white text-3xl p-2 mb-10">
        Login
      </header>

      <main className="">
        <form className="flex flex-col items-start w-full h-full gap-4 ml-10">
          <label htmlFor="username">Enter Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
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
            <Link
              className="text-white hover:text-blue-200 font-semibold"
              to="/register"
            >
              New User?
            </Link>
          </div>
        </form>
      </main>
    </>
  );
}
