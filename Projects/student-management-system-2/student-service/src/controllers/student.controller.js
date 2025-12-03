import Student from '../models/student.model.js';
import cloudinary from 'cloudinary';
import uploadToCloudinary from '../services/cloudinary.service.js';

export const postStudent = async (req , res) => {
    try {
        const { firstName, lastName, email, mobile, gender, dob } = req.body;


        if(!firstName || !email) {
            return res.status(401).json({
                message : "Invalid Credentials"
            })
        }

        const ifEmailExists = await Student.findOne({ email : email });

        if(ifEmailExists) {
            return res.status(401).json({
                message : "Email already exits, please try with another one"
            })
        }

        let photoUrl = null;
        let photoPublicId = null;
        
        if(req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer, "students");
            photoUrl = uploadResult.secure_url;
            photoPublicId = uploadResult.public_id;
        }

        const createStudent = await Student.create({
            firstName,
            lastName,
            email,
            mobile,
            gender,
            dob,
            photoUrl,
            photoPublicId
        })

        res.status(201).json({
            message : "Student Information Created",
            createStudent
        })
    }
    catch ( err ) {
        res.status(500).json({
            message : "Some error came",
            error : err.message
        })
    }
}


// now we are going to change the information of the user

export const changeStudent = async (req , res) => {
    try {
        const updates = req.body;

        const findIfStudentExists = await Student.findById(req.params.id);

        if(!findIfStudentExists) {
            return res.status(401).json({
                message : "Student doesn't exits in the db"
            })
        }

        if(req.file) {
            // pehle we are going to delete the existing image

            if(findIfStudentExists.photoPublicId) {
                await cloudinary.v2.uploader.destroy(findIfStudentExists.photoPublicId);
            }

            const uploadResult = await uploadToCloudinary(req.file.buffer, "students");
            findIfStudentExists.photoUrl = uploadResult.secure_url;
            findIfStudentExists.photoPublicId = uploadResult.public_id
        }

        const changeInfo = await Student.findByIdAndUpdate(
            req.params.id,
            updates,
            {
                new : true,
                runValidators : true
            }
        )

        res.status(201).json({
            message : "The user information has been changed"
        })
    }
    catch ( err ) {
        res.status(401).json({
            message : "Some error came while updating the user information"
        })
    }
}


// get all of the information 

export const getStudents = async (req, res) => {
    try {
        const getAllStudents = await Student.find().sort({ createdAt : -1 });

        res.status(200).json({
            message : "All of your data is as following ",
            getAllStudents
        })
    }
    catch ( err ) {
        res.status(401).json({
            message : "Error in getting students data"
        })
    }
}


// now to delete the student 

export const deleteStudent = async ( req , res ) => {
    try {
        const findIfStudentExists = await Student.findById(req.params.id);


        if(!findIfStudentExists) {
            return res.status(401).json({
                message : "The student doesn't exists that you are trying to delete"
            })
        }

        if(findIfStudentExists.photoPublicId) {
            await cloudinary.v2.uploader.destroy(findIfStudentExists.photoPublicId);
        }

        await findIfStudentExists.deleteOne();

        res.status(200).json({
            message : "The data of the student has been deleted successfully"
        })
    }
    catch ( err ) {
        res.status(401).json({
            message : "There has been some error in deleting the Student"
        })
    }
}