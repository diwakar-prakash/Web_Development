import jwt from "jsonwebtoken";

const adminMiddle = async ( req , res , next ) => {
    if (!req.user) {
        return res.status(401).json({
            message : "Not Authenticated"
        })
    }

    if(req.user.role !== "admin") {
        return res.status(401).json({
            message : "You are not the admin"
        })
    }

    next();
}

export default adminMiddle;