import jwt from "jsonwebtoken";

const authMiddle = (req, res, next) => {
    const token = req.headers.authorization;

    if(!token) {
        return res.this.status(401).json({
            message : "token not present. Please try to login again"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch ( err ) {
        res.status(401).json({
            message : "authentication failed"
        })
    }
}

export default authMiddle;