import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import app from "./src/app.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () =>
      console.log(`Server is running on the port ${PORT}`)
    );
  } catch (error) {
    console.log("SERVER FAILED");
  }
};

startServer();
