import express from 'express';
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} from '../controllers/courseController.js';

import ensureAuth from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllCourses);
router.get('/:id', getCourseById);

// Protected routes
router.post('/', ensureAuth, createCourse);
router.put('/:id', ensureAuth, updateCourse);
router.delete('/:id', ensureAuth, deleteCourse);

export default router;
