import { FollowUp } from "../models/followup.models.js";
import { Query } from "../models/query.models.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { validationResult } from 'express-validator';

const getFollowUps = asyncHandler(async (req, res) => {
  const { queryId } = req.params;

  // 1) Validate queryId
  if (!mongoose.Types.ObjectId.isValid(queryId)) {
    throw new ApiError(400, 'Invalid query ID');
  }

  // 2) Fetch the query and populate followups
  const query = await Query.findById(queryId).populate('followup');
  if (!query) {
    throw new ApiError(404, 'Query not found');
  }

  // 3) Return only the follow‑ups array
  return res.status(200).json(
    new ApiResponse(200, query.followup, 'Follow‑ups fetched successfully')
  );
});

const addFollowUp = asyncHandler(async (req, res) => {
  const { queryId } = req.params;

  // 1) ValidationResult (if you have express-validator in your route)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array().map(e => e.msg).join(', '));
  }

  // 2) Validate queryId
  if (!mongoose.Types.ObjectId.isValid(queryId)) {
    throw new ApiError(400, 'Invalid query ID');
  }

  const { content, status = 'Pending', type = 'Task', date } = req.body;

  // 3) Start a transaction so both docs stay in sync
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 4) Ensure query exists
    const query = await Query.findById(queryId).session(session);
    if (!query) {
      throw new ApiError(404, 'Query not found');
    }

    // 5) Create the follow‑up
    const followUpDoc = await FollowUp.create(
      [
        { content, status, type, date }
      ],
      { session }
    );

    // 6) Push its _id into the query.followups array
    query.followup.push(followUpDoc[0]._id);
    await query.save({ session });

    // 7) Commit & end session
    await session.commitTransaction();
    session.endSession();

    // 8) Return the created follow‑up
    return res
      .status(201)
      .json(
        new ApiResponse(201, followUpDoc[0], 'Follow‑up added successfully')
      );
  } catch (err) {
    // Roll back on error
    await session.abortTransaction();
    session.endSession();
    throw new ApiError(500, `Could not add follow‑up: ${err.message}`);
  }
});

const updateFollowUp = asyncHandler(async(req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid Id");
    }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array().map(e => e.msg).join(', '));
  }

  const { content, status, type, date } = req.body;

  // 3) Find and update
  const followUp = await FollowUp.findById(id);
  if (!followUp) {
    throw new ApiError(404, 'Follow‑up not found');
  }

  // Only overwrite if provided
  if (content !== undefined) followUp.content = content;
  if (status  !== undefined) followUp.status  = status;
  if (type    !== undefined) followUp.type    = type;
  if (date    !== undefined) followUp.date    = date;

  await followUp.save();

  // 4) Return updated document
  return res
    .status(200)
    .json(
      new ApiResponse(200, followUp, 'Follow‑up updated successfully')
    );

})

const deleteFollowUp = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // 1) Validate ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, 'Invalid follow‑up ID');
  }

  // 2) Remove the follow‑up document
  const deleted = await FollowUp.findByIdAndDelete(id);
  if (!deleted) {
    throw new ApiError(404, 'Follow‑up not found');
  }

  // 3) Pull its reference from any Query.followups arrays
  await Query.updateMany(
    { followups: id },
    { $pull: { followups: id } }
  );

  // 4) Return success
  return res
    .status(200)
    .json(new ApiResponse(200, null, 'Follow‑up deleted successfully'));
});

export {
    addFollowUp,
    getFollowUps,
    updateFollowUp,
    deleteFollowUp
}