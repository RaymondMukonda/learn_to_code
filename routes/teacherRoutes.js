import express from 'express';
import {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher
} from '../controllers/teacherController.js';

import ensureAuth from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllTeachers);
router.get('/:id', getTeacherById);

// Protected routes
router.post('/', ensureAuth, createTeacher);
router.put('/:id', ensureAuth, updateTeacher);
router.delete('/:id', ensureAuth, deleteTeacher);

export default router;
