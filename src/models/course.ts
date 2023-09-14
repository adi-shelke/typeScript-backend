import mongoose from "mongoose";
const { Schema } = mongoose;
const courseSchema = new Schema({
  course_name: {
    type: String,
  },
  instructor_name: {
    type: String,
  },
  start_date: {
    type: String,
  },
  min_employees: {
    type: Number,
  },
  max_employees: {
    type: Number,
  },
});
export default mongoose.model("courses", courseSchema);

// export default courseSchema;
