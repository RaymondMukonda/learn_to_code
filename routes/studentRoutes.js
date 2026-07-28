import express from 'express';
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} from '../controllers/studentController.js';

import ensureAuth from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllStudents);
router.get('/:id', getStudentById);

// Protected routes
router.post('/', ensureAuth, createStudent);
router.put('/:id', ensureAuth, updateStudent);
router.delete('/:id', ensureAuth, deleteStudent);

export default router;