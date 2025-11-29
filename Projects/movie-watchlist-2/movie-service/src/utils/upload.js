import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
    destination : "uploads/posters/",
    filename : (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const fileFilter = (req, file, cb) => {
    const allowed = /jpg|jpeg|pdf|png/;
    const your = path.extname(file.originalname).toLowerCase();
    if(allowed.test(your)) {
        cb(null, true);
    }
    else {
        cb(new Error("ONLY JPG, JPEG, PDF, PNG allowed"), false);
    }
}

const upload = multer({ storage, fileFilter, limits : {
    fileSize : 10 * 1024 * 1024
} });

export default upload;