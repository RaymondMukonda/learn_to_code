import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    courseCode: {
      type: String,
      required: [true, 'Course code is required'],
      unique: true,
      trim: true
    },
    title: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    credits: {
      type: Number,
      required: [true, 'Credits are required'],
      min: 1,
      max: 10
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
      required: true
    }
  },
  { timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);

export default Course;
