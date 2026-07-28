import express from 'express';
import {
  getAllSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject
} from '../controllers/subjectController.js';

import ensureAuth from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllSubjects);
router.get('/:id', getSubjectById);

// Protected routes
router.post('/', ensureAuth, createSubject);
router.put('/:id', ensureAuth, updateSubject);
router.delete('/:id', ensureAuth, deleteSubject);

export default router;