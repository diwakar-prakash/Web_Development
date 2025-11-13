import multer from "multer";
import path from "path";


// store karne ki jagah
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});


// file ke extension ko check karne ke liye 
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only images (jpeg, jpg, png) are allowed"));
  }
};



const upload = multer({ storage, fileFilter });


export default upload;
