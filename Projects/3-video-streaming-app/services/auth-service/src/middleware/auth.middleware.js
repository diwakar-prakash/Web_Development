import jwt from 'jsonwebtoken';

const authMiddle = async ( req , res, next ) => {
    try {
        const token = req.headers.authorization;

        if(!token) {
            return res.status(200).json({
                message : "Token Not Present, Please Login Again"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch ( err ) {
        return res.status(500).json({
            message : "Authentication Failed"
        })
    }
}

export default authMiddle;