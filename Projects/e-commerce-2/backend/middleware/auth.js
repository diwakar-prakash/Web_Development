import jwt from 'jsonwebtoken';

const authMiddle = (req, res, next) => {
    const token = req.headers.authorization;

    if(!token) {
        return res.status(401).json({
            message : "No token found, please try to login again"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch ( err ) {
        res.status(404).json({
            message : "Authentication Failed. Provide correct token",
        })
    }
}

export default authMiddle;