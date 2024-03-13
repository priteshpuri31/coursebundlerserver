import express from "express";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import { buySubscription, cancelSubscription, getRazorPayKey, paymentVerification } from "../controllers/paymentController.js";

const router = express.Router();
// Buy Subscription
router.route("/subscribe").get(isAuthenticated, buySubscription)


// Get RazorPay key


router.route("/razorpaykey").get(getRazorPayKey)


// Payment Verification 
router.route("/paymentverification").post(isAuthenticated, paymentVerification)


// Subscription cancel 
router.route("/subscribe/cancel").delete(isAuthenticated, cancelSubscription)


export default router;