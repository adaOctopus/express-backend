const notFoundMiddleware = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`['red']);
    res.status(404);
    next(error);
}

export default notFoundMiddleware;