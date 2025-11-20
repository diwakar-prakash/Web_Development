import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
    destination : "uploads/",
    filename : (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const fileType = (req, file, cb) => {
    const allowed = /jpeg|png|pdf|jpg/;
    const current = path.extname(file.originalname).toLowerCase();
    if(allowed.test(current)) {
        cb(null, true);
    }
    else {
        cb(new Error("Only JPEG, JPG, PNG and PDF allowed"), false);
    }
}

const uploadMiddle = multer({ storage , fileType });

export default uploadMiddle;