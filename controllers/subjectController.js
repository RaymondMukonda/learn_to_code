import mongoose from 'mongoose';
import Subject from '../models/subject.js';

// GET all subjects
export const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ createdAt: -1 });

    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving subjects',
      error: error.message
    });
  }
};

// GET subject by ID
export const getSubjectById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid subject ID'
      });
    }

    const subject = await Subject.findById(id);

    if (!subject) {
      return res.status(404).json({
        message: 'Subject not found'
      });
    }

    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving subject',
      error: error.message
    });
  }
};

// CREATE subject
export const createSubject = async (req, res) => {
  try {
    const subject = new Subject(req.body);

    const savedSubject = await subject.save();

    res.status(201).json({
      message: 'Subject created successfully',
      subject: savedSubject
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation failed',
        errors: Object.values(error.errors).map((err) => err.message)
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        message: 'Subject code already exists'
      });
    }

    res.status(500).json({
      message: 'Error creating subject',
      error: error.message
    });
  }
};

// UPDATE subject
export const updateSubject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid subject ID'
      });
    }

    const updatedSubject = await Subject.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedSubject) {
      return res.status(404).json({
        message: 'Subject not found'
      });
    }

    res.status(200).json({
      message: 'Subject updated successfully',
      subject: updatedSubject
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation failed',
        errors: Object.values(error.errors).map((err) => err.message)
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        message: 'Subject code already exists'
      });
    }

    res.status(500).json({
      message: 'Error updating subject',
      error: error.message
    });
  }
};

// DELETE subject
export const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid subject ID'
      });
    }

    const deletedSubject = await Subject.findByIdAndDelete(id);

    if (!deletedSubject) {
      return res.status(404).json({
        message: 'Subject not found'
      });
    }

    res.status(200).json({
      message: 'Subject deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting subject',
      error: error.message
    });
  }
};