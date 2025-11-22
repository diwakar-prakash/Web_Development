import jwt from "jsonwebtoken";

const authMiddle = async (req, res, next) => {
    const token = req.headers.authorization;

    if(!token) {
        return res.status(401).json({
            message : "The token is not present, please login again"
        })
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch ( err ) {
        res.status(401).json({
            message : "Invalid Token"
        })
    }
}

export default authMiddle;