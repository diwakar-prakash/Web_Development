import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
    destination : 'uploads/',
    filename : (req, file, cb) => {
        cb( null , `${Date.now()}-${file.originalname}` );
    }
})

const fileFilter = (req, file, cb) => {
    const allowed = /jpeg|jpg|pdf|png/;
    const ext = path.extname(file.originalname).toLowerCase();
    allowed.test(ext) ? cb(null, true) : cb(new Error("only jpg, jpeg, png, pdf allowed") ,false);
}

const upload = multer({ storage , fileFilter });

export default upload;

