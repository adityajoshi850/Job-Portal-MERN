const { Sequelize } = require('sequelize');

// Read DB connection string from .env
const DATABASE_URL = process.env.DATABASE_URL;

const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully.");

        // load relationships
        require('../model/index');
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
    // Sync all defined models to the DB
    await sequelize.sync({ alter: false });

    console.log("All models were synchronized successfully.");
};

module.exports = { sequelize, connectDB };
