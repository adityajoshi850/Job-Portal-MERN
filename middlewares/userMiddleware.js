// middleware is a function that has access to the request and response objects.
const jwt = require('jsonwebtoken');
const { User } = require('../model');

// middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {

    // token receive
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;


    // token check
    if (!token) {
        return res.status(400).json({
            message: "Unauthorized access"
        })
    }

    // token verify
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(400).json({
                message: "Invalid token"
            })
        } else {
            const userId = decoded.userId

            // Check the user with the id from token

            const user = await User.findByPk(userId)

            if (!user) {
                return res.status(400).json({
                    message: "User not found"
                })
            }
            req.user = user

            next()
        }
    })
}

// check user role

const checkUserRole = (...roles) => {
    return (req, res, next) => {
        const userRole = String(req.user?.userRole || "").toLowerCase();
        const allowed = roles.map(r => String(r).toLowerCase());

        if (!allowed.includes(userRole)) {
            return res.status(400).json({
                message: "Unauthorized access - role mismatch",
            });
        }
        next();
    };
};



module.exports = {
    isAuthenticated,
    checkUserRole
}


// checkRole("JobProvider", "jobSeeker")
// role = ["jobProvider"]