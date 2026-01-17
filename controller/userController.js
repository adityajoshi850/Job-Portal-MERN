const User = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Create a new user -> register user
const registerUser = async (req, res) => {
    try {
        // taking data from req body
        const { username, name, userEmail, userPassword, userRole } = req.body;

        if (!username || !userEmail || !userPassword) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        // Check if user already exists
        const isExistingUser = await User.findOne({ where: { userEmail } }); // returns object or null
        if (isExistingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(userPassword, 10);

        // Create user (IMPORTANT: await)
        const createdUser = await User.create({
            // if your DB requires name NOT NULL, use name or fallback to username
            name: name || username,
            username,
            userEmail,
            userPassword: hashedPassword,
            // keep role lowercase to avoid "role mismatch"
            userRole: (userRole || "jobseeker").toLowerCase(),
        });

        return res.status(201).json({
            message: "User registered successfully",
            data: createdUser,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
};

// Login User
const loginUser = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;

        if (!userEmail || !userPassword) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        // Check if user exists
        const isExistingUser = await User.findOne({ where: { userEmail } }); // returns object or null
        if (!isExistingUser) {
            return res.status(400).json({
                message: "User does not exist",
            });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(
            userPassword,
            isExistingUser.userPassword
        );

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { userId: isExistingUser.id, userRole: isExistingUser.userRole },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        return res.status(200).json({
            message: "User logged in successfully",
            data: token,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
};
