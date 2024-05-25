import express from "express";

const router = express.Router();

import { createComplaint, getComplaints } from "../controllers/complaintController.js";

router.post("/create", createComplaint)

router.get("/:username", getComplaints)
// router.get("/", getComplaints)

export default router;