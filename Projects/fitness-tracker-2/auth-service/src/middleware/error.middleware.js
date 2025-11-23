const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;

    res.status(status).json({
        success : false,
        message : err.message || "Internal Server Error"
    });
};

export default errorHandler;

// i learnt that, this will be used like central thing for error handling 