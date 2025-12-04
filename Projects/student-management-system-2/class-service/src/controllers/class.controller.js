import Class from '../models/class.models.js';

export const watchAllClasses = async ( req , res  ) => {
    try {
        const getAllClasses = await Class.find();
        res.status(200).json({
            message : "The following are all the classes",
            getAllClasses
        })
    }
    catch ( err ) {
        res.status(500).json({
            message : "Some error came while getting the classes"
        })
    }
}

export const watchAParticularClass = async ( req , res  ) => {
    try {
        const classId = req.params.classId;

        if(!classId) {
            return res.status(401).json({
                message : "Bro, which class are you talking about. Please link that as well"
            })
        }

        const findTheClass = await Class.findById(classId);

        if(!findTheClass) {
            return res.status(401).json({
                message : "Class Not found"
            })
        }

        res.status(200).json({
            message : "The following is the information about your class",
            findTheClass
        })
    }
    catch ( err ) {
        res.status(500).json({
            message : "Error came while finding the particular class",
            error : err.message
        })
    }
}


export const createAClass = async ( req , res ) => {
    try {
        const { name, description, capacity } = req.body;

        if(!name || !description) {
            return res.status(401).json({
                message : "Invalid credentials to create a class"
            })
        }

        const ifClassAlreadyExists = await Class.findOne({ name : name });

        if(ifClassAlreadyExists) {
            return res.status(401).json({
                message : "Class name already exists"
            })
        }

        const createClass = await Class.create({
            name,
            description, 
            capacity
        })

        res.status(201).json({
            message : "The Class has been created. The following are the information about it",
            classinfo : createClass
        })
    }
    catch ( err ) {
        res.status(500).json({
            message : "some error came while creating the class"
        })
    }
}


export const addStudent = async ( req , res ) => {
    try {
        const { studentId } = req.body;

        if(!studentId) {
            return res.status(400).json({
                message : "Student Id not present",
            })
        }

        const findClass = await Class.findById(req.params.classId);

        if(!findClass) {
            return res.status(401).json({
                message : "Class is not present that you are trying to add student in"
            })
        }

        if(findClass.studentIds.includes(studentId)) {
            return res.status(400).json({
                message : "Student is already in the class"
            })
        }

        if(findClass.studentIds.length >= findClass.capacity) {
            return res.status(401).json({
                message : "The class is Already Full, So no more students can be added"
            })
        }

        findClass.studentIds.push(studentId);
        await findClass.save();

        res.status(201).json({
            message : "Student has been added in the class"
        })
    }

    catch ( err ) {
        res.status(500).json({
            message : "Error came while adding the student"
        })
    }
}

export const removeStudent = async ( req , res ) => {
    try {
        const { studentId } = req.body;

        if(!studentId) {
            return res.status(400).json({
                message : "Student Id not provided which needs to be deleted"
            })
        }

        const findClass = await Class.findById(req.params.classId);

        if(!findClass) {
            res.status(404).json({
                message : "Class not found"
            })
        }

        findClass.studentIds = findClass.studentIds.filter(id => id.toString() !== studentId);
        await findClass.save();

        res.status(201).json({
            message : "The Student has been removed from the class"
        })
    }
    catch ( err ) {
        res.status(500).json({
            message : "Error removing the Student"
        })
    }
}



export const updateClass = async ( req, res ) => {
    try {
        const classId = req.params.classId;

        if(!classId) {
            return res.status(401).json({
                message : "Class Id have not been provided"
            })
        }

        const updates = req.body;

        const updateStudents = await Class.findByIdAndUpdate(
            classId,
            updates,
            {
                new : true,
                runValidators : true
            }
        )

        res.status(200).json({
            message : "Class has been updated",
            class : updateStudents
        })

    }
    catch ( err ) {
        res.status(500).json({
            message : "Error updating the class"
        })
    }
}


export const assignTeacher = async ( req , res ) => {
    try {
        const { teacherId } = req.body;
        const classId = req.params.classId;

        if(!teacherId) {
            return res.status(400).json({
                message : "Teacher Id missing. So please put that"
            })
        }

        const classPresentOrNot = await Class.findById(classId);

        if(!classPresentOrNot) {
            return res.status(404).json({
                message : "Class Not Found"
            })
        }

        classPresentOrNot.teacherId = teacherId;
        await classPresentOrNot.save();

        res.status(201).json({
            message : "The Teacher has been assigned the class"
        })
    }

    catch ( err ) {
        res.status(500).json({
            message : "Error came while assigning the teacher to a class"
        })
    }
}


export const deleteClass = async ( req , res ) => {
    try {
        const classId = req.params.classId;

        if(!classId) {
            return res.status(400).json({
                message : "The Class Id is not present"
            })
        }

        const findClass = await Class.findById(classId);

        if(!findClass) {
            return res.status(404).json({
                message : "Class not found"
            })
        }

        await findClass.deleteOne();

        res.status(200).json({
            message : "The Class has been deleted"
        })
    }
    catch ( err ) {
        res.status(500).json({
            message : "some error in deleting the class"
        })
    }
}