import jwt from "jsonwebtoken";

const authMiddle = (req, res, next) => {
    const token = req.headers.authorization;

    if(!token) {
        return res.status(404).json({ 
            message : "Token not attached. Please Sign in Again"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch ( err ) {
        return res.status(404).json({ message : "Authentication Failed due to some errors"});
    }

}

export default authMiddle;