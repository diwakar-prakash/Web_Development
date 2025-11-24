import jwt from "jsonwebtoken";

const authMiddle = ( req, res, next ) => {
    const token = req.headers.authorization;

    if(!token) {
        return res.status(404).json({
            message : "No Token present, Login Again"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch ( err ) {
        res.status(401).json({
            message : "Invalid Token, Please Login Again"
        })
    }
} 

export default authMiddle;