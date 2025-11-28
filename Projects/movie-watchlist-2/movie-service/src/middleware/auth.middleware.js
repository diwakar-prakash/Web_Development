import jwt from 'jsonwebtoken';

const authMiddle = async ( req , res , next ) => {
    const token = req.headers.authorization;

    if(!token) {
        return res.status(401).json({
            message : "No token found, Login Again"
        })
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch ( err ) {
        return res.status(401).json({
            message : "Authentication failed"
        })
    }
}

export default authMiddle;