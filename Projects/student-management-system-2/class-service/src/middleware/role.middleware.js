const roleMiddle = (...roles) => ( req , res , next ) => {
    try {
        if(!req.user) {
            return res.status(401).json({
                message : "User not logged in"
            })
        }

        if(!roles.includes(req.user.role)) {
            return res.status(401).json({
                message : "You are not meant for this role"
            })
        }

        next();
    }
    catch ( err ) {
        res.status(401).json({
            message : "Error came in Role",
            error : err.message
        })
    }
}

export default roleMiddle;