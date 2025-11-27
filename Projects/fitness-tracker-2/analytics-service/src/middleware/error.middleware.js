const errorHandler = async ( err , req , res , next ) => {
    console.error("ERROR in Analytics-Server", err.message );

    const STATUS = err.statusCode || 500;

    res.status(STATUS).json({
        message : err.message || "ERROR OCCURED"
    })
}

export default errorHandler;