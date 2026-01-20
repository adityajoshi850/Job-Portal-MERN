// Higher-order async wrapper for Express route handlers.
// Prevents unhandled promise rejections and forwards errors to Express.

const asyncError = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

module.exports = { asyncError };
