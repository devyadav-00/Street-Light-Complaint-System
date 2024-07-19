import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const user = JSON.parse(sessionStorage.getItem("user")) || null;
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        if (user.user?.email) {
          setIsAdmin(true);
        }
        setUserData(user.user);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <Navigation text="Profile" />

      <main className="h-auto">
        <div className="flex flex-col items-start px-10 gap-4 mt-10">
          <div className="text-lg bg-white/10 p-4 rounded-xl flex flex-col items-start gap-4 w-full h-full">
            <ul className="gap-4 flex flex-col items-start">
              <li className="gap-4 flex flex-row ">
                <span className="font-bold">Name: </span>
                <span className="">{userData.name}</span>
              </li>
              {isAdmin ? (
                <li className="gap-4 flex flex-row ">
                  <span className="font-bold">Email: </span>
                  <span className="">{userData.email}</span>
                </li>
              ) : (
                <li className="gap-4 flex flex-row ">
                  <span className="font-bold">Username: </span>
                  <span className="">{userData.username}</span>
                </li>
              )}
              <li className="gap-4 flex flex-row ">
                <span className="font-bold">PhoneNo. : </span>
                <span className="">{userData.phoneNo}</span>
              </li>
              {isAdmin && (
                <>
                  <li className="gap-4 flex flex-row text-red-200 font-semibold px-20 py-4">
                    Assigned to :-
                  </li>
                  <li className="gap-4 flex flex-row ">
                    <span className="font-bold">Area : </span>
                    <span className="">{userData.area}</span>
                  </li>
                  <li className="gap-4 flex flex-row ">
                    <span className="font-bold">Centre : </span>
                    <span className="">{userData.centre}</span>
                  </li>{" "}
                  <li className="gap-4 flex flex-row ">
                    <span className="font-bold">Division : </span>
                    <span className="">{userData.division}</span>
                  </li>{" "}
                  <li className="gap-4 flex flex-row ">
                    <span className="font-bold">Centre PhoneNo. : </span>
                    <span className="">{userData.centrePhone}</span>
                  </li>{" "}
                </>
              )}
            </ul>
          </div>
          <div className="flex flex-col items-center justify-center w-full gap-8 mt-10 align-middle">
            <button
              type="submit"
              onClick={() => {
                sessionStorage.removeItem("user");
                navigate("/login");
              }}
              className="bg-red-600/80 border-2 border-red-500 p-2 px-4 rounded-lg hover:bg-red-600 hover:border-red-600 transition-all duration-500"
            >
              Logout
            </button>
            <Link
              className="text-white hover:text-blue-200 font-semibold"
              to={`${isAdmin ? "/admin/complaint" : "/complaint"}`}
            >
              Back to complaint page?
            </Link>
            {isAdmin && (
              <Link
                className="text-white hover:text-blue-200 font-semibold"
                to="/admin/register"
              >
                Register new Admin!
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
