import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true
    },

    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true
    },

    studentNumber: {
      type: String,
      required: [true, 'Student number is required'],
      unique: true,
      trim: true
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },

    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: [16, 'Age must be at least 16'],
      max: [100, 'Age cannot exceed 100']
    },

    course: {
      type: String,
      required: [true, 'Course is required'],
      trim: true
    },

    yearLevel: {
      type: Number,
      required: [true, 'Year level is required'],
      min: 1,
      max: 5
    },

    isRegistered: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Student = mongoose.model('Student', studentSchema);

export default Student;