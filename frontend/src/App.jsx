import { useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useAsyncError,
} from "react-router-dom";
import "./App.css";
import image from "./assets/streetLight.webp";

import { Login, Register, Complaint, NewComplaint, Error } from "./pages";
import Loading from "./pages/Loading";

import Signature from "./components/Signature"


function App() {
  return (
    // <>
    // <Signature />
    // </>
    // set screen as mobile screen
    <div className="w-[450px] h-[800px] bg-backGround bg-opacity-40 bg-cover bg-center rounded-3xl">
      <Router>
        <Routes>
          <Route path="/" element={<Loading />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/complaint" element={<Complaint />} />
          <Route path="/newComplaint" element={<NewComplaint />} />

          <Route path="*" element={<Error />} />
          <Route path="*/*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
