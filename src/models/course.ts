import mongoose from "mongoose";
const { Schema } = mongoose;
const courseSchema = new Schema({
  course_name: {
    type: String,
  },
  instrutor_name: {
    type: String,
  },
  start_date: {
    type: Date,
  },
  min_employees: {
    type: Number,
  },
  max_employees: {
    type: Number,
  },
});
