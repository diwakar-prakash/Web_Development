import { uploadToCloudinary } from "../services/upload.service.js";
import { validateVideoFile } from "../utils/file.validator.js";
import axios from "axios";

export const uploadVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const file = req.file;

    if (!videoId) {
      return res.status(400).json({ message: "VideoId missing" });
    }

    validateVideoFile(file);

    await axios.get(
      `${process.env.VIDEO_SERVICE_URL}/video/videos/${videoId}`,
      {
        headers: {
          Authorization: req.headers.authorization
        }
      }
    );

    const result = await uploadToCloudinary({
      buffer: file.buffer,
      videoId
    });

    console.log("VIDEO_UPLOADED", {
      videoId,
      rawUrl: result.secure_url
    });

    res.status(201).json({
      message: "Video uploaded successfully",
      rawVideoUrl: result.secure_url
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Upload failed"
    });
  }
};
