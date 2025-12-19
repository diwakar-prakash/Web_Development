import cloudinary from 'cloudinary';
import streamifier from 'streamifier';

cloudinary.v2.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

const uploadToCloudinary = async (buffer, folder = "students") => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
            { folder },
            (err, result) => {
                if( err ) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            }
        );

        streamifier.createReadStream(buffer).pipe(uploadStream);
    });
};

export default uploadToCloudinary;


