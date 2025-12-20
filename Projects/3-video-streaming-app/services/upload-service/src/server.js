import app from "./app.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
app.use(cors());

const PORT = process.env.PORT || 3004;

app.listen(PORT, () => {
  console.log(`Upload Service running on port ${PORT}`);
});
