const express = require('express');
const app = express();

// Dotenv configuration
require('dotenv').config();

// parse json data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// Db connection
const { connectDB } = require('./database/dbConfig');

const seedAdminUser = require('./adminSeed');

// Initialize database and seed admin user
const initializeApp = async () => {
    await connectDB();
    await seedAdminUser();
}

initializeApp().catch(err => {
    console.error('Failed to initialize app:', err);
    process.exit(1);
})

// Routes
const userRoutes = require("./routes/userRoutes")
app.use("/api/users", userRoutes)



const jobRoute = require("./routes/jobRoutes");
app.use("/api/jobs", jobRoute)

const applicationRoute = require("./routes/applicationRoutes");
app.use("/api/applications", applicationRoute)

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
})