import { Router } from 'express';
import { body, param, query } from 'express-validator';
import {
  createLead,
  listLeads,
  getLead,
  updateLead,
  updateStatus,
  deleteLead
} from '../controllers/lead.controller.js';
import { runValidation } from '../middlewares/validate.js';
import { LEAD_STATUS } from '../models/Lead.js';

const router = Router();

// validators
const createValidators = [
  body('name').trim().isLength({ min: 2, max: 80 }).withMessage('Name 2–80 chars'),
  body('email').isEmail().withMessage('Invalid email').toLowerCase().trim(),
  body('phone').trim().matches(/^\d{10,15}$/).withMessage('Phone must be 10–15 digits'),
  body('message').optional().isLength({ max: 1000 }).withMessage('Message too long'),
  body('status').optional().isIn(LEAD_STATUS).withMessage('Invalid status')
];

const updateValidators = [
  body('name').optional().trim().isLength({ min: 2, max: 80 }),
  body('email').optional().isEmail().toLowerCase().trim(),
  body('phone').optional().trim().matches(/^\d{10,15}$/),
  body('message').optional().isLength({ max: 1000 }),
  body('status').optional().isIn(LEAD_STATUS)
];

const idParam = [param('id').isMongoId().withMessage('Invalid ID')];

router.post('/leads', createValidators, runValidation, createLead);

router.get(
  '/leads',
  [
    query('status').optional().isIn(LEAD_STATUS),
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
    query('sortBy').optional().isIn(['createdAt', 'name', 'email', 'status']),
    query('sortOrder').optional().isIn(['asc', 'desc'])
  ],
  runValidation,
  listLeads
);

router.get('/leads/:id', idParam, runValidation, getLead);

router.put('/leads/:id', [...idParam, ...updateValidators], runValidation, updateLead);

router.patch(
  '/leads/:id/status',
  [
    ...idParam,
    body('status').isIn(LEAD_STATUS).withMessage('Invalid status')
  ],
  runValidation,
  updateStatus
);

router.delete('/leads/:id', idParam, runValidation, deleteLead);

export default router;
