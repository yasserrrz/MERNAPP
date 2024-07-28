import mongoose from "mongoose";

const connection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/fullstack", {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("DB connected successfully");
  } catch (err) {
    console.error("Failed to connect with DB", err.message);
  }
};

export default connection;
