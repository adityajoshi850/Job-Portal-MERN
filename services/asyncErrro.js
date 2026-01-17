export const asyncError = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (err) {
            // ✅ if response already sent, don't try to send again
            if (res.headersSent) return next ? next(err) : null;

            return res.status(500).json({
                message: "Server Error",
                error: err.message,
            });
        }
    };
};
