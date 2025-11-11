import jwt from "jsonwebtoken";

const authMiddle = (req, res , next) => {
    const token = req.headers.authorization;

    if(!token) {
        return res.status(404).json({ message : "The token is not present. Please login again."});
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    }
    catch( err ) {
        res.status(404).json({ message : err.message });
    }
}

export default authMiddle