import app from "./app.js"
import { connectDB } from "./config/database.js";
import cloudinary from "cloudinary"
import Razorpay from "razorpay";
import nodeCron from "node-cron"
import { Stats } from "./models/Stats.js";


connectDB();



cloudinary.v2.config({
  cloud_name: "dtlm9g2xd",
  api_key: "291128713959753",
  api_secret: "jjZaZ2vxfvzynT8rvtuMQMqhda0",

})

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});



nodeCron.schedule("0 0 0 1 * *", async () => {
  try {
    await Stats.create({})
  } catch (error) {
    console.log(error)
  }
})


app.listen(process.env.PORT, () => {
  console.log(`server is working on port :${process.env.PORT}`);
});