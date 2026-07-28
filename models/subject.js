import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema(
  {
    subjectCode: {
      type: String,
      required: [true, 'Subject code is required'],
      unique: true,
      uppercase: true,
      trim: true
    },

    subjectName: {
      type: String,
      required: [true, 'Subject name is required'],
      trim: true
    },

    credits: {
      type: Number,
      required: [true, 'Credits are required'],
      min: [1, 'Credits must be at least 1'],
      max: [30, 'Credits cannot exceed 30']
    },

    department: {
      type: String,
      required: [true, 'Department is required'],
      trim: true
    },

    lecturer: {
      type: String,
      required: [true, 'Lecturer is required'],
      trim: true
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Subject = mongoose.model('Subject', subjectSchema);

export default Subject;