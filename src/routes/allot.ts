import express from "express";
import CourseEnrollments from "../models/CourseEnrollments";
import courses from "../models/Course";
const router = express.Router();
router.post("/:course_id", async (req, res) => {
    try {
        
        const courseId = req.params.course_id;
          const isCoursePresent = await courses.findOne({
            _id: courseId,
          });
          if (!isCoursePresent) {
            res.json({
              status: 400,
              message: "COURSE_NOT_FOUND",
              data: {
                failure: {
                  messsage: "Course is not present",
                },
              },
            });
          }
          else {
                  const registeredUsers = await CourseEnrollments.find({
                    course_id: courseId,
                  }).sort({ employee_name: 1 });
                  res.json(registeredUsers);
          }
    } catch (error) {
        console.log
    }

});

export default router;
