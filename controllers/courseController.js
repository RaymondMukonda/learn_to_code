import mongoose from 'mongoose';
import Course from '../models/course.js';

// GET all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('teacher').sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving courses', error: error.message });
  }
};

// GET course by ID
export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid course ID' });
    }
    const course = await Course.findById(id).populate('teacher');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving course', error: error.message });
  }
};

// CREATE course
export const createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    const savedCourse = await course.save();
    res.status(201).json({ message: 'Course created successfully', course: savedCourse });
  } catch (error) {
    res.status(500).json({ message: 'Error creating course', error: error.message });
  }
};

// UPDATE course
export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid course ID' });
    }
    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedCourse) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json({ message: 'Course updated successfully', course: updatedCourse });
  } catch (error) {
    res.status(500).json({ message: 'Error updating course', error: error.message });
  }
};

// DELETE course
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid course ID' });
    }
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting course', error: error.message });
  }
};
