import express from 'express';
import { body, param } from 'express-validator';
import {
  getFollowUps,
  addFollowUp
} from '../controllers/followup.controller.js';

const router = express.Router();

// GET all follow‑ups for a query
router.get(
  '/:queryId/get-followups',
  [
    param('queryId', 'Invalid query ID').isMongoId()
  ],
  getFollowUps
);

// POST a new follow‑up
router.post(
  '/:queryId/add-followups',
  [
    param('queryId', 'Invalid query ID').isMongoId(),
    body('content', 'Content is required').trim().notEmpty(),
    body('status').optional().isIn(['Completed','Pending','Not Completed']),
    body('type').optional().isIn(['Call','Meeting','Task']),
    body('date').optional().isISO8601()
  ],
  addFollowUp
);

export default router;