import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';

export const uploadToCloudinary = ({ buffer, videoId }) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "videos/raw",
        public_id: videoId,
        resource_type: "video"
      },
      (error, result) => {
        if ( error ) {
          return reject(error);
        }
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  })
}