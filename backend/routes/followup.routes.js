import express from 'express';
import { body, param } from 'express-validator';
import {
  getFollowUps,
  addFollowUp,
  updateFollowUp,
  deleteFollowUp
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

router.put(
  '/:id/update-followup',
  [
    param('id', 'Invalid follow‑up ID').isMongoId(),
    body('content').optional().trim().notEmpty().withMessage('Content cannot be empty'),
    body('status').optional().isIn(['Completed','Pending','Not Completed']),
    body('type').optional().isIn(['Call','Meeting','Task']),
    body('date').optional().isISO8601().withMessage('Date must be ISO8601'),
  ],
  updateFollowUp
);

router.delete(
  '/:id/delete',
  [
    param('id', 'Invalid follow‑up ID').isMongoId()
  ],
  deleteFollowUp
);



export default router;