import express from "express";
import courses from "../models/Course";
import CourseEnrollments from "../models/CourseEnrollments";
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
      total_enrolled: 0,
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
  const course = await courses.findOne({ course_id: courseId });
  const maxEmployes = course?.max_employees;
  let totalEmployees = course?.total_enrolled;
  if (totalEmployees === maxEmployes) {
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
  try {
    const enrolledCourse = await CourseEnrollments.create({
      employee_name: employee_name,
      email: email,
      course_id,
    });

    totalEmployees = totalEmployees ? totalEmployees + 1 : 0;
    //update enroll count
    // await courses.findByIdAndUpdate(
    //   { course_id: courseId },
    //   { total_enrolled :totalEmployees}
    // );
    res.json({
      status: 200,
      message: `Successfully registered for ${course?.course_name}`,
      data: {
        success: {
          registration_id: enrolledCourse._id,
          status: "ACCEPTED",
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;
