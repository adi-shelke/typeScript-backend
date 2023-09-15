import express from "express"
import CourseEnrollments from "../models/CourseEnrollments";
const router = express.Router()
router.post("/:course_id", async (req, res) => {
    const courseId = req.params.course_id
    try {
        const registeredUsers = await CourseEnrollments.find({ course_id: courseId }).sort({_id:1})
        res.json(registeredUsers)
    } catch (error) {
        console.log(error)
    }
})

export default router