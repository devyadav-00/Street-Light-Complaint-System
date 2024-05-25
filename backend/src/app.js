import express from "express";
import cookieParser from "cookie-parser";


const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());



import authRoute from "./routes/authRoute.js";
import complaintRoute from "./routes/complaintRoute.js";

app.use("/api/v1/users", authRoute);
app.use("/api/v1/complaints", complaintRoute);

export { app };
