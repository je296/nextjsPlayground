import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Database Connected");
    
  } catch (error) {
    console.log("Error Connecting Database: ", error);
  }
};
