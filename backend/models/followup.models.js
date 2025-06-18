import mongoose, {Schema} from "mongoose";

// Sub‑schema for a single follow‑up note
const FollowUpSchema = new Schema({
  date:     { type: Date,    required: true, default: () => new Date() },
  content:  { type: String,  required: true },
  status:   { 
    type: String, 
    enum: ['Completed','Pending','Not Completed'], 
    default: 'Pending' 
  },
  type:     { 
    type: String, 
    enum: ['Call','Meeting','Task'], 
    default: 'Task' 
  },
}, 
{
    timestamps: true 
});

export const FollowUp = mongoose.model("FollowUp", FollowUpSchema)