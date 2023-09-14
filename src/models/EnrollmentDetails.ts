import mongoose from "mongoose";
const { Schema } = mongoose;

const details = new Schema({
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  max_employees: {
    type: Number,
  },
  current_employees: {
    type: Number,
  },
});

export default mongoose.model("CourseDetails",details)