import mongoose, { mongo } from "mongoose";
const { Schema } = mongoose;

const courseEnrollment = new Schema({
  employee_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

export default mongoose.model("courseEnrollments", courseEnrollment);
