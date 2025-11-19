import multer from "multer";
import path from 'path';


const storage = multer.diskStorage({
    destination : "uploads/",
    filename : (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const fileFilter = (req, file, cb) => {
    const allowed = /jpg|jpeg|png|pdf/;
    const ext = path.extname(file.originalname).toLowerCase();
    if(allowed.test(ext)) {
        cb(null, true);
    }
    else {
        cb(new Error("Only files from jpg, jpeg, png, and pdf allowed..."), false)
    }
}

const upload = multer({ storage, fileFilter, limits : {
    fileSize : 10 * 1024 * 1024
} });
export default upload;