import express from "express";
import courses from "../models/Course";
import details from "../models/EnrollmentDetails";
const router = express.Router();

router.post("/courseOffering", async (req, res) => {
  try {
    const {
      course_name,
      instructor_name,
      start_date,
      min_employees,
      max_employees,
    } = req.body;
    let isAlreadyPresent = await courses.findOne({
      course_name: course_name,
      instructor_name: instructor_name,
    });
    if (isAlreadyPresent) {
      res.json({
        status: 400,
        message: "Course already present",
        data: {
          failure: {
            messsage: "This course is already present",
          },
        },
      });
    } else {
    }
    const course = await courses.create({
      course_name,
      instructor_name,
      start_date,
      min_employees,
      max_employees,
    });
    const courseDetails = await details.create({
      course_id: course._id,
      max_employees,
      current_employees: 0,
    });
    res.json({
      status: 200,
      message: "Course added successfully",
      data: {
        success: {
          course_id: course._id,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/register/:id", async (req, res) => {
  const courseId = req.params.id;
  const { employee_name, email, course_id } = req.body;
  const courseDetails = await details.findOne({ course_id: courseId });
  const maxEmployees = courseDetails?.max_employees
  const currentEmployees = courseDetails?.current_employees
  if (currentEmployees===maxEmployees) {
    res.json({
      status: 400,
      message: "COURSE_FULL_ERROR",
      data: {
        failure: {
          messsage: "The course is full",
        },
      },
    });
  }
  
});

export default router;
