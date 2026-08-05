import mongoose from 'mongoose';
import Teacher from '../models/teacher.js';

// GET all teachers
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().sort({ createdAt: -1 });
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving teachers', error: error.message });
  }
};

// GET teacher by ID
export const getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid teacher ID' });
    }
    const teacher = await Teacher.findById(id);
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving teacher', error: error.message });
  }
};

// CREATE teacher
export const createTeacher = async (req, res) => {
  try {
    const teacher = new Teacher(req.body);
    const savedTeacher = await teacher.save();
    res.status(201).json({ message: 'Teacher created successfully', teacher: savedTeacher });
  } catch (error) {
    res.status(500).json({ message: 'Error creating teacher', error: error.message });
  }
};

// UPDATE teacher
export const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid teacher ID' });
    }
    const updatedTeacher = await Teacher.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedTeacher) return res.status(404).json({ message: 'Teacher not found' });
    res.status(200).json({ message: 'Teacher updated successfully', teacher: updatedTeacher });
  } catch (error) {
    res.status(500).json({ message: 'Error updating teacher', error: error.message });
  }
};

// DELETE teacher
export const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid teacher ID' });
    }
    const deletedTeacher = await Teacher.findByIdAndDelete(id);
    if (!deletedTeacher) return res.status(404).json({ message: 'Teacher not found' });
    res.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting teacher', error: error.message });
  }
};
