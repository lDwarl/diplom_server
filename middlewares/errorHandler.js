module.exports = async (err, req, res, next) => {
    if (err.errorType && err.errorType === 'ApiError') {
        return res.status(err.status).json({
            error: true,
            message: err.message,
            errors: err.errors
        });
    }

    console.log(err.message);
    console.log(err);

    res.status(500).json({
        error: true,
        message: 'Unhandled error!',
        fullError: err
    });
}
