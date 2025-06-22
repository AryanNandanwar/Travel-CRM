

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
      client: client._id,
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

const getClientQueryById = asyncHandler(async (req, res) => {
  const { queryId } = req.params;

  // 1) Validate the param
  if (!mongoose.Types.ObjectId.isValid(queryId)) {
    throw new ApiError(400, "Invalid queryId");
  }

  // 2) Lookup the Query and populate its client
  const query = await Query.findById(queryId)
    .populate("client", "fullName contactNo")
    .lean();

  if (!query) {
    throw new ApiError(404, "Query not found");
  }

  // 3) Return the populated Query
  return res
    .status(200)
    .json(new ApiResponse(200, query, "Query fetched successfully"));
});

const getAllQueries = asyncHandler(async (req, res) => {
  const queries = await Query.find({}).populate("client", "fullName contactNo")
  .lean();
  return res.status(200).json(new ApiResponse(200, queries, "Queries fetched successfully"));
});

const updateClientQueries = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array().map(e => e.msg).join(", "));
  }

  const { queryId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(queryId)) {
    throw new ApiError(400, "Invalid queryId");
  }

  // Fields you allow updating on Query vs. Client
  const queryAllowed  = ["destination","NoOfAdults","NoOfChildren","NoOfChildrenBelowFive",
                         "TripDuration","StartingPoint","EndingPoint",
                         "PreferredHotelCategory","Budget","DateOfInquiry","TravelDate","status"];
  const clientAllowed = ["fullName","contactNo"];

  // Split incoming body into two update objects
  const queryUpdates  = {};
  const clientUpdates = {};
  Object.entries(req.body).forEach(([key, val]) => {
    if (queryAllowed.includes(key))  queryUpdates[key]  = val;
    if (clientAllowed.includes(key)) clientUpdates[key] = val;
  });

  if (!Object.keys(queryUpdates).length && !Object.keys(clientUpdates).length) {
    throw new ApiError(400, "No valid fields provided for update");
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1) Update the Query itself
    const queryDoc = await Query.findById(queryId).session(session);
    if (!queryDoc) throw new ApiError(404, "Query not found");

    if (Object.keys(queryUpdates).length) {
      await Query.findByIdAndUpdate(
        queryId,
        { $set: queryUpdates },
        { new: true, runValidators: true, session }
      );
    }

    // 2) Update its Client
    if (Object.keys(clientUpdates).length) {
      await Client.findByIdAndUpdate(
        queryDoc.client,
        { $set: clientUpdates },
        { new: true, runValidators: true, session }
      );
    }

    await session.commitTransaction();
    session.endSession();

    // 3) Return the refreshed Query with populated client
    const updated = await Query.findById(queryId)
      .populate("client", "fullName contactNo")
      .lean();
    res
      .status(200)
      .json(new ApiResponse(200, updated, "Query and client updated successfully"));
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw new ApiError(500, err.message);
  }
});

const deleteClientQuery = asyncHandler(async (req, res) => {
  const { queryId } = req.params;

  // Validate queryId
  if (!mongoose.Types.ObjectId.isValid(queryId)) {
    throw new ApiError(400, "Invalid queryId");
  }

  // Find the query to delete
  const query = await Query.findById(queryId);
  if (!query) {
    throw new ApiError(404, "Query not found");
  }

  // Remove the queryId from the client's query array
  await Client.updateOne(
    { _id: query.client },
    { $pull: { query: queryId } }
  );

  // Delete the query document
  await Query.findByIdAndDelete(queryId);

  return res.status(200).json(
    new ApiResponse(200, null, "Query deleted successfully")
  );
});



export {
    createClientQuery,
    validateClientQuery,
    getClientQueryById,
    getAllQueries,
    updateClientQueries,
    deleteClientQuery
}

