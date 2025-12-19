import axios from 'axios'

const authMiddle = async ( req , res , next ) => {
    try {
        const token = req.headers.authorization;

        if(!token) {
            return res.status(400).json({
                message : "Token not present. Please Provide token"
            })
        }

        const getAuth = await axios.get(
            `${process.env.AUTH_SERVICE_URL}/auth/verify`,
            {
                headers : {
                    Authorization : token
                }
            }
        )

        if(!getAuth.data.valid) {
            return res.status(401).json({
                message : "Invalid token"
            })
        }

        req.user = getAuth.data;
        next();
    }
    catch ( err ) {
        return res.status(401).json({
            message : "Authentication Failed"
        })
    }
}

export default authMiddle;