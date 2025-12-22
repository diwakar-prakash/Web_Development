import { processVideo } from "./services/processing.service.js";

console.log("Processing Service Started");

processVideo({
  videoId: "abc123",
  rawVideoUrl: "https://cloudinary.com/raw.mp4"
});
