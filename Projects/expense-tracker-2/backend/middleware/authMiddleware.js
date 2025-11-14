import jwt from 'jsonwebtoken';

const authMiddle = (req, res, next) => {
    const token = req.headers.authorization;

    if(!token) {
        return res.status(401).json({
            message : "Token doesn't exists"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch ( err ) {
        res.status(404).json({ 
            message : "Authentication Failed"
        })
    }
}

export default authMiddle;