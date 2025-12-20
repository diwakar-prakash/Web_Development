export const validateVideoFile = (file) => {
    if(!file) {
        throw new Error("Now file uploaded");
    }

    if(!file.mimetype.startsWith('video/')) {
        throw new Error("Only video files are allowed");
    }
}