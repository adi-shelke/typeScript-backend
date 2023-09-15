import mongoose from "mongoose";
const { Schema } = mongoose;
const courseSchema = new Schema({
  course_name: {
    type: String,
    required:true
  },
  instructor_name: {
    type: String,
  },
  start_date: {
    type: String,
  },
  min_employees: {
    type: Number,
    required:true
  },
  max_employees: {
    type: Number,
    required: true
  },
  total_enrolled:{
    type:Number
  },
  status: {
    type:Boolean
  }
});
export default mongoose.model("courses", courseSchema);

// export default courseSchema;
