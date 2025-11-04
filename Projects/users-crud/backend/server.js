const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");

dotenv.config();
const app = express();

app.use(express.json());

app.use("/kut", userRouter);

const PORT = process.env.PORT || 5000;

const vivek = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on the Port ${PORT}`);
    });
    console.log("Hello Viveka Jii");
  } 
  catch (err) {
    console.log("Error aa gaya bahi loog", err);
  }
};

vivek();