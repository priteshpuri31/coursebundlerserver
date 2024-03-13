import express from "express";
import { getAllCourses, createCourse, getCourseLecture, addLecture, deleteCourse, deleteLecture } from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";
import { authorizeAdmin, authorizeSubscribers, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// get  all the courses without lectures
router.route("/courses").get(getAllCourses);
// create new course - Only admin
router.route("/createcourse").post(isAuthenticated, authorizeAdmin, singleUpload, createCourse);


// Add lecture,delete course,get course details 

router
  .route("/course/:id")
  .get(isAuthenticated, authorizeSubscribers, getCourseLecture)
  .post(isAuthenticated, authorizeAdmin, singleUpload, addLecture)
  .delete(isAuthenticated, authorizeAdmin, deleteCourse);


// Delete Lecture

router
  .route("/lecture")
  .delete(isAuthenticated, authorizeAdmin, deleteLecture)



export default router;