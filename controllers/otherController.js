import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { sendEmail } from "../utils/sendEmail.js";
import ErrorHandler from "../utils/errorHandler.js";
import { Stats } from "../models/Stats.js";



// Conact Us

export const contact = catchAsyncError(async (req, res, next) => {


  const { name, email, message } = req.body;

  if (!name || !email || !message)

    return next(new ErrorHandler("Please add all fields", 400))

  const to = "pritesh@gmail.com";
  const subject = "Contact from CourseBundler";
  const text = `I am ${name} and my Email is ${email}./ ${message}`;


  await sendEmail(to, subject, text);

  res.status(200).json({
    success: true,
    message: "Your Message Has Been Sent "
  })
})



// Course Request

export const courseRequest = catchAsyncError(async (req, res, next) => {
  const { name, email, course } = req.body;
  if (!name || !email || !course)

    return next(new ErrorHandler("Please add all fields", 400))
  const to = "pritesh@gmail.com";
  const subject = "Requesting for a course on CourseBundler";
  const text = `I am ${name} and my Email is ${email}./ ${course}`;


  await sendEmail(to, subject, text);



  res.status(200).json({
    success: true,
    message: "Your Message Has Been Sent "
  })
})

// Get Daash Board Stats
export const getDashboardStats = catchAsyncError(async (req, res, next) => {

  const stats = await Stats.find({}).sort({ createtAt: "desc" }).limit(12);

  const statsData = [];

  for (let i = 0; i < stats.length; i++) {
    statsData.unshift(stats[i]);
  }

  const requiredSize = 12 - stats.length;


  for (let i = 0; i < requiredSize; i++) {
    statsData.unshift({
      users: 0,
      subscription: 0,
      views: 0,
    });
  }


  const usersCount = statsData[11].users;
  const subscriptionCount = statsData[11].subscription;
  const viewsCount = statsData[11].views;


  let usersPrecentage = 0,
    viewsPrecentage = 0,
    subscriptionPrecentage = 0;

  let usersProfit = true,
    viewsProfit = true,
    subscriptionProfit = true;

  if (statsData[10].users === 0) usersPrecentage = usersCount * 100;
  if (statsData[10].views === 0) viewsPrecentage = viewsCount * 100;
  if (statsData[10].subscription === 0) subscriptionPrecentage = subscriptionCount * 100;

  else {
    const difference = {
      users: statsData[11].users - statsData[10].users,
      views: statsData[11].views - statsData[10].views,
      subscription: statsData[11].subscription - statsData[10].subscription,
    };

    usersPrecentage = (difference.users / statsData[10].users) * 100;
    viewsPrecentage = (difference.views / statsData[10].views) * 100;
    subscriptionPrecentage = (difference.subscription / statsData[10].subscription) * 100;


    if (usersPrecentage < 0) usersProfit = false;
    if (viewsPrecentage < 0) viewsProfit = false;
    if (subscriptionPrecentage < 0) subscriptionProfit = false;
  }

  res.status(200).json({
    success: true,
    stats: statsData,
    usersCount,
    subscriptionCount,
    viewsCount,
    subscriptionPrecentage,
    viewsPrecentage,
    usersPrecentage,
    subscriptionProfit,
    usersProfit,
    viewsProfit
  })
})