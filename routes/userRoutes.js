import express from "express";
import { register, login, logout, getMyProfile, changePassword, updateProfile, updateProfilePicture, forgetPassword, resetPassword, addToPlaylist, removeFromPlaylist, getAllUsers, updateUserRole, deleteUser, deleteMyProfile } from "../controllers/userController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";
const router = express.Router();

// to register New User 

router.route("/register").post(singleUpload, register);

//login 

router.route("/login").post(login);


// Logout

router.route("/logout").get(logout);

// Get my profile

router.route("/me").get(isAuthenticated, getMyProfile);


// Delete my profile

router.route("/me").delete(isAuthenticated, deleteMyProfile);

// Change Password

router.route("/changepassword").put(isAuthenticated, changePassword);

// UpdateProfile

router.route("/updateprofile").put(isAuthenticated, updateProfile);

// UpdateProfilePicture

router.route("/updateprofilepicture").put(isAuthenticated, singleUpload, updateProfilePicture);


// ForgetPassword

router.route("/forgetpassword").post(forgetPassword);
// ResetPasword

router.route("/resetpassword/:token").put(resetPassword);
// AddtoPlaylist
router.route("/addtoplaylist").post(isAuthenticated, addToPlaylist);

// RemoveFromPlaylist

router.route("/removefromplaylist").delete(isAuthenticated, removeFromPlaylist);

// Admin Controls

router.route("/admin/users").get(isAuthenticated, authorizeAdmin, getAllUsers);

// Admin // user role update

router
  .route("/admin/users/:id")
  .put(isAuthenticated, authorizeAdmin, updateUserRole)
  .delete(isAuthenticated, authorizeAdmin, deleteUser)
  ;

export default router;