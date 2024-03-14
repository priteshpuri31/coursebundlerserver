import mongoose from "mongoose";


export const connectDB = async () => {
  const { connection } = await mongoose.connect("mongodb://localhost:27017/coursebundler");
  console.log(`MongoDB is connected with ${connection.host}`);

};