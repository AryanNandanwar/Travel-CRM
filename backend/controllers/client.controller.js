

import mongoose from "mongoose";
import { check, validationResult } from "express-validator";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Client } from "../models/client.models.js";
import { Query } from "../models/query.models.js";

/**
 * Validation middleware for incoming client query requests.
 */
const validateClientQuery = [
  check("contactNo")
    .trim()
    .notEmpty()
    .withMessage("Contact number is required"),
  check("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required"),
  check("destination")
    .trim()
    .notEmpty()
    .withMessage("Destination is required"),
  check("NoOfAdults")
    .notEmpty()
    .withMessage("Number of adults is required")
    .isNumeric()
    .withMessage("NoOfAdults must be a number"),
  check("NoOfChildren")
    .notEmpty()
    .withMessage("Number of children is required")
    .isNumeric()
    .withMessage("NoOfChildren must be a number"),
  check("NoOfChildrenBelowFive")
    .notEmpty()
    .withMessage("Number of children below five is required")
    .isNumeric()
    .withMessage("NoOfChildrenBelowFive must be a number"),
  check("TripDuration")
    .trim()
    .notEmpty()
    .withMessage("Trip duration is required"),
  check("StartingPoint")
    .trim()
    .notEmpty()
    .withMessage("Starting point is required"),
  check("EndingPoint")
    .trim()
    .notEmpty()
    .withMessage("Ending point is required"),
  check("PreferredHotelCategory")
    .trim()
    .notEmpty()
    .withMessage("Preferred hotel category is required"),
  check("Budget")
    .notEmpty()
    .withMessage("Budget is required")
    .isNumeric()
    .withMessage("Budget must be a number"),
  check("DateOfInquiry")
    .notEmpty()
    .withMessage("Date of inquiry is required")
    .isISO8601()
    .withMessage("DateOfInquiry must be a valid date"),
  check("TravelDate")
    .notEmpty()
    .withMessage("Travel date is required")
    .isISO8601()
    .withMessage("TravelDate must be a valid date"),
];

/**
 * Controller to handle creating or updating a client and associating a query.
 */
const createClientQuery = asyncHandler(async (req, res) => {
  // Validate incoming data from express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array().map(err => err.msg).join(", "));
  }

  const {
    contactNo,
    fullName,
    destination,
    NoOfAdults,
    NoOfChildren,
    NoOfChildrenBelowFive,
    TripDuration,
    StartingPoint,
    EndingPoint,
    PreferredHotelCategory,
    Budget,
    DateOfInquiry,
    TravelDate,
  } = req.body;

  // Start a Mongoose session for transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Check if the client already exists based on the unique contact number.
    let client = await Client.findOne({ contactNo }).session(session);

    // If no client is found, create a new one.
    if (!client) {
      client = new Client({
        fullName,
        contactNo,
        queries: [],
      });
      await client.save({ session });
    }

    // Create and save the new query document.
    const newQuery = new Query({
      destination,
      NoOfAdults,
      NoOfChildren,
      NoOfChildrenBelowFive,
      TripDuration,
      StartingPoint,
      EndingPoint,
      PreferredHotelCategory,
      Budget,
      DateOfInquiry,
      TravelDate,
    });
    await newQuery.save({ session });

    // Associate the new query with the client.
    if (!client.query) {
      client.query = [];
    }

    client.query.push(newQuery._id);
    await client.save({ session });

    // Commit the transaction and end session.
    await session.commitTransaction();
    session.endSession();

    // Return response with a 201 Created status code.
    return res.status(201).json(
      new ApiResponse(
        201,
        newQuery,
        "Query created successfully and associated with client"
      )
    );
  } catch (error) {
    // Abort the transaction in case of error.
    await session.abortTransaction();
    session.endSession();
    throw new ApiError(500, `Transaction failed: ${error.message}`);
  }
});

const getClientQueries = asyncHandler(async (req, res) => {
  const { fullName, contactNo } = req.body;

  // Ensure both fields are provided
  if (!fullName || !contactNo) {
    throw new ApiError(400, "Both fullName and contactNo are required.");
  }

  // Find the client document and populate the queries field
  const client = await Client.findOne({ fullName, contactNo }).populate("query");

  // If no client is found, return a 404
  if (!client) {
    throw new ApiError(404, "Client not found.");
  }

  // Return the client's queries array
  return res.status(200).json(
    new ApiResponse(200, client.query, "Client queries retrieved successfully")
  );
});


export {
    createClientQuery,
    validateClientQuery,
    getClientQueries
}