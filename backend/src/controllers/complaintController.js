import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Complaint } from "../models/complaint.js";

const createComplaint = asyncHandler(async (req, res) => {
  const {
    alternatePhone,
    area,
    callerAddress,
    callerName,
    callerPhone,
    category,
    complainCentre,
    complainCentrePhone,
    division,
    location,
    remarks,
    typeOfFault,
    picture,
    signature,
    username
  } = req.body;
  console.log("req.body", req.body);



  if (
    !alternatePhone ||
    !area ||
    !callerAddress ||
    !callerName ||
    !callerPhone ||
    !category ||
    !complainCentre ||
    !complainCentrePhone ||
    !division ||
    !location ||
    !remarks ||
    !typeOfFault
  ) {
    return new ApiError(400, "Please provide all the required fields");
  }

  try {
    const newComplaint = await Complaint.create({
      alternatePhone,
      area,
      callerAddress,
      callerName,
      callerPhone,
      category,
      complainCentre,
      complainCentrePhone,
      division,
      location,
      remarks,
      typeOfFault,
      picture,
      signature,
      username,
    });
    return res
      .status(201)
      .json(
        new ApiResponse(true, newComplaint, "Complaint created successfully!")
      );
  } catch (error) {
    // console.log("error", error);
    throw new ApiError(500, "Error creating complaint:");
  }
});

const getComplaints = asyncHandler(async (req, res) => {
  const username = req?.params?.username;
  // console.log("username", username);

  const complaints = await Complaint.find({ username });
  return res.status(200).json(new ApiResponse(true, complaints));
});

export { createComplaint, getComplaints };
