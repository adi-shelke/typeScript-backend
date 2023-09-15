import express from "express"
import courses from "../models/Course";
import CourseEnrollments from "../models/CourseEnrollments"

const router = express.Router()

router.post("/:user_id", async (req, res) => {
    const userId = req.params.user_id
    try {
        
    } catch (error) {
        console.log(error)
    }
})