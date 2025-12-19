import axios from "axios";

const authMiddle = async ( req , res , next ) => {
    try {
        const token = req.headers.authorization;

        if(!token) {
            return res.status(400).json({
                message : "Token not present for the Upload Service"
            })
        }

        const check = await axios.get(`${process.env.AUTH_BASE_URL}/auth/verify`, 
            {
                headers : {
                    Authorization : token
                }
            }
        )

        if(!check.data.valid) {
            return res.status(401).json({
                message : "Invalid Token"
            })
        }

        req.user = check.data;
        next();
    }
    catch ( err ) {
        return res.status(500).json({
            message : "Authentication Failed in the Upload Service"
        })
    }
}

export default authMiddle;