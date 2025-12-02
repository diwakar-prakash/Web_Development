import jwt from "jsonwebtoken";

const authMiddle = async ( req , res , next ) => {
    const token = req.headers.authorization;

    if(!token) {
        return res.status(401).json({
            message : "Token is required, Please login again"
        })
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch ( err ) {
        return res.status(401).json({
            message : "Authentication Failed"
        })
    }
}

export default authMiddle;

