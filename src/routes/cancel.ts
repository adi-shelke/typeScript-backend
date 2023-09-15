import express from "express"
import courses from "../models/Course";
import CourseEnrollments from "../models/CourseEnrollments"

const router = express.Router()

router.post("/:user_id", async (req, res) => {
    const userId = req.params.user_id
    try {
        const courseAllotmentDetails = await CourseEnrollments.findOne({ _id: userId })
        if (!courseAllotmentDetails) {
            return res.json({
              status: 400,
              message: "INVALID_REGISTRATION_ID",
              data: {
                failure: {
                  messsage: "Registration Id is not valid",
                },
              },
            });
      }
        else {
          const courseId = courseAllotmentDetails?.course_id
          const isCourseAllotted = await courses.findOne({ _id: courseId })
          if (isCourseAllotted?.status) {
              res.json({
                status: 400,
                message: "COURSE_ALREADY_ALLOTTED",
                data: {
                  failure: {
                    registration_id: userId,
                    course_id: courseId,
                    status: "CANCEL_REJECTED",
                  },
                },
              });
          }
          await CourseEnrollments.deleteOne({ _id: userId })
          const update = await courses.updateOne(
            { _id: courseId },
            { $inc: { total_enrolled: -1 } }
          );
          res.json({
            status: 200,
            message: `Successfully cancelled registration for ${isCourseAllotted?.course_name}`,
            data: {
                    success: {
                        registration_id: userId,
                        course_id: courseId,
                        status:"CANCEL_ACCEPTED"
                  }
            },
          });
          
      }
    } catch (error) {
        console.log(error)
    }
})

export default router